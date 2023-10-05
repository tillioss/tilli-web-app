import React from 'react';
import Footer from './Footer';
import Dashbord from "../Screens/Dashbord";
export default class HomeScreen extends React.Component {



    render() {
        var classNameForDevice = "mobile-responsive"
        if (window.navigator.appVersion.toLowerCase().includes("iphone")) {
            classNameForDevice = "mobile-responsive-ios"
            console.log("-->", true)
        }
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
                <div className={classNameForDevice}>
                    <div className="dashboard">
                        <Dashbord props={this.props} />
                    </div>
                    <div className="">
                        <Footer props={this.props} page={'home'} />
                    </div>
                </div>
            </div>
        )
    }
}