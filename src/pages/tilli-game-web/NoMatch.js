import React from 'react';
import { Link } from 'react-router-dom';
import MyConstant from '../config/MyConstant';

export default class NoMatch extends React.Component {
    render() {
        return <div className="page-404"><div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            <Link to={MyConstant.keyList.projectUrl + "/"} className="btn btn-primary btn-lg">
                                <span className="glyphicon glyphicon-home"></span>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    }
}
