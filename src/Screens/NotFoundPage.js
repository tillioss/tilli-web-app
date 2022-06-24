import React from 'react';
import '../error.css'
import tilli from '../images/logos.png';
import teqbahn from '../images/teqbahn.png';

const NotFoundPage = () => {
  return (
    <div className="four-not-four-page">
      <div className="wrapper">
        <div className="landing-page">
          <div className="content">
            <div className="row mx-0">
              <div className="col-12">
                <img className="img-fluid tilli" src={tilli} />
              </div>
            </div>
            <h1> 404 - Page Not Found.</h1>
            <p> The Page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            {/* <button>Back to home</button> */}
          </div>
          <div className="footer" style={{ borderTop: '1px dashed #7a7d7f', width: '100%', padding: '20px 0' }}>
            <div className="row mx-0 my-2">
              <div className="col-12">
                <a href="http://teqbahn.com/" target="_blank">
                  <img className="img-fluid teqbahn" src={teqbahn} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage;