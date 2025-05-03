 # Deployment Guide

 This document outlines the steps to deploy the application on a Google Cloud Platform (GCP) Compute Engine VM instance.

 ## Prerequisites
 - A GCP project with billing enabled.
 - `gcloud` CLI installed and authenticated.
 - IAM permissions to create and manage VM instances and firewall rules.
 - SSH key configured for the VM.

 ## 1. Provision the VM Instance

 1. Create a VM in your preferred zone:
    ```sh
    gcloud compute instances create my-app-vm \
      --zone=us-central1-a \
      --machine-type=e2-medium \
      --tags=http-server,https-server \
      --image-family=debian-11 \
      --image-project=debian-cloud
    ```
 2. Allow HTTP/HTTPS traffic:
    ```sh
    gcloud compute firewall-rules create allow-http  --network default --action allow --rules tcp:80 --source-ranges=0.0.0.0/0
    gcloud compute firewall-rules create allow-https --network default --action allow --rules tcp:443 --source-ranges=0.0.0.0/0
    ```

 ## 2. Prepare the VM

 SSH into the instance:
 ```sh
 gcloud compute ssh my-app-vm --zone=us-central1-a
 ```

 ### 2.1 Install Docker
 ```sh
 sudo apt update && sudo apt install -y docker.io git
 sudo usermod -aG docker $USER
 newgrp docker
 ```

 ### 2.2 Clone the Repository
 ```sh
 git clone https://github.com/<your-org>/<your-repo>.git ~/app
 cd ~/app
 ```

 ### 2.3 Configure Environment Variables
 Create a `.env` file in the project root with production settings:
 ```ini
 NODE_ENV=production
 PORT=3000
 DATABASE_URL=<your_database_url>
 # Add other secrets here
 ```

 ## 3. Build and Run the Docker Container

 1. Build the image:
    ```sh
    docker build -t my-app:latest .
    ```
 2. Run the container:
    ```sh
    docker run -d \
      --name my-app \
      -p 3000:3000 \
      --env-file .env \
      my-app:latest
    ```

 If you want the app accessible on port 80:
 ```sh
 docker run -d --name my-app -p 80:3000 --env-file .env my-app:latest
 ```

 ## 4. Auto-Start with Systemd

 Create `/etc/systemd/system/my-app.service`:
 ```ini
 [Unit]
 Description=My App (Docker Container)
 After=network.target docker.service
 Requires=docker.service

 [Service]
 Restart=always
 ExecStart=/usr/bin/docker run --rm --name my-app -p 80:3000 --env-file /home/$USER/app/.env my-app:latest
 ExecStop=/usr/bin/docker stop my-app

 [Install]
 WantedBy=multi-user.target
 ```
 Enable and start:
 ```sh
 sudo systemctl daemon-reload
 sudo systemctl enable my-app
 sudo systemctl start my-app
 ```

 ## 5. (Optional) Reverse Proxy & SSL

 1. Install Nginx and Certbot:
    ```sh
    sudo apt install -y nginx certbot python3-certbot-nginx
    ```
 2. Configure Nginx:
    ```nginx
    server {
      listen 80;
      server_name example.com;
      location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
      }
    }
    ```
    Enable the config, test, and reload:
    ```sh
    sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```
 3. Obtain SSL cert:
    ```sh
    sudo certbot --nginx -d example.com
    ```

 ## 6. Updating the Application

 On the VM:
 ```sh
 cd ~/app
 git pull origin main
 docker build -t my-app:latest .
 docker stop my-app && docker rm my-app
 docker run -d --name my-app -p 80:3000 --env-file .env my-app:latest
 ```

 ## 7. Logs & Troubleshooting

 - View Docker logs:
   ```sh
   docker logs my-app -f
   ```
 - If using systemd:
   ```sh
   sudo journalctl -u my-app -f
   ```

 ## 8. Cleanup

 ```sh
 docker stop my-app && docker rm my-app
 docker rmi my-app:latest
 gcloud compute instances delete my-app-vm --zone=us-central1-a
 ```