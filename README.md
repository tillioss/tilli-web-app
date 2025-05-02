[![CI](https://github.com/tillioss/tilli-web-app/actions/workflows/ci.yml/badge.svg)](https://github.com/tillioss/tilli-web-app/actions/workflows/ci.yml)

# Tilli Web App:

Tilli Safety Tool Box comprises of 3 modules:

## Module 1: Feelings and Emotions

- Learn to identify, label and express emotions and feelings
- Develop healthy coping strategies to manage big feelings

## Module 2: Trust

- At the core of staying safe is knowing who and what to trust
- Understand what trust means, looks, and feels like
- Practice tools like the trust circle to make safer choices

You can play/test our game here: https://web.tillikids.com/tilli-web/

---

## Joining the Tilli Community

We are a community of learning designers, game designers, developers and educators with an interest in designing game-based, social emotional learning experience for kids. We create an environment where our community can effectively explore, create innovative and open aid distribution technology services that are inclusive, accountable, and accessible for everyone.

### Contribution Guidelines

We would love your input! We want to make contributing to this project as easy and transparent as possible so kindly go through our contribution guidelines here: [Contribution Guidelines](https://tillioss.github.io/docs/Contribution-Guidelines)

### Code of Conduct

<br>Please note that Tilli’s open-source projects are governed by our [Code of conduct](https://tillioss.github.io/docs/code-of-conduct).

## Getting started

To get started, please have a look at our [User and Developer Documentation](https://tillioss.github.io/docs/getting-started-developer).

---

## Developer Setup

### Prerequisites

- Node.js v20.x or higher
- npm v6.x or higher (or yarn)
- Git
- A running Tilli backend API (defaults to http://localhost:8093/tilli-api/)

### Local Setup

1. Clone the repository:

   git clone https://github.com/tillioss/tilli-web-app.git
   cd tilli-web-app

2. Configure the API endpoint:

   Edit `src/config/MyConstant.js` and set `keyList.apiURL` to your backend URL. Example:

   ```js
   module.exports = {
     keyList: {
       projectName: "Tilli",
       projectUrl: "tilli-web",
       apiURL: "http://localhost:8093/tilli-api/",
       predictUrl: "http://localhost:8093/",
     },
   };
   ```

3. Install dependencies:

   npm install

4. Start the development server:

   npm start

   The app will be available at http://localhost:3023/tilli-web/

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Runs tests with coverage

---

If you wish to work on the IDE to create or modify modules kindly refer the Tilli IDE Repository here: https://github.com/tillioss/tilli-ide

## Get in Touch

Learn more about what we are doing at our official website [tillikids.com/opensource](www.tillikids.com/opensource) <br>For more technical information, visit our documentation website [tillioss.github.io](https://tillioss.github.io/docs/project-charter) or write to any of our team members at support@tillikids.org for any doubts or queries.
To know more about our [team members](https://www.tillikids.com/team)

---

### Join our Slack Community

Join our Slack community to connect with other members, ask questions, and collaborate on projects. [Slack Invite Link](https://join.slack.com/t/tilliopensour-wyp9205/shared_invite/zt-206f4f11s-HoII8Kob45f6WK3GPIIi6g)
