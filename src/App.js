import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from 'history'
import Login from './Screens/Login';
import ForgotPassword from './Screens/ForgotPassword';
import ForgotResetPassword from './Screens/ForgotResetPassword';
import Dashbord from './Screens/Dashbord';
import HomeScreen from './pages/HomeScreen';
import ParentScreen from './pages/ParentScreen';
import Footer from './pages/Footer';
import ModuleScreen from './pages/ModuleScreen';

import LevelScreen from "./pages/LevelScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ParentsHomeScreen from "./pages/ParentsHomeScreen";
import ParentOnboardingScreen from "./pages/ParentOnboardingScreen";
import AudioRecognize from "./Component/AudioRecognize";
import EmpathyScreen from "./pages/EmpathyScreen";

import './App.css';
import MyConstant from './config/MyConstant';
import SignUp from "./Screens/SignUp";
import ModuleScreen_2 from './Screens/ModuleManager/ModuleScreen_2';
import SignUpWithZip from './Screens/SignUpWithZip';
import QrCode from './Screens/QrCode';
import QrCodeScan from './Screens/QrCodeScan';
import DemoUserLogin from './Screens/DemoUserLogin';
import DemoUserLogin_2 from './Screens/DemoUserLogin_2';

import StartingDashBord from './Screens/EndScreen/StartingDashBord';
import WinningPage2 from './TilliYourWinning/WinningPage2';

import NotFoundPage from './Screens/NotFoundPage';
import Manage from './Screens/Manage';
import UserManage from './Screens/UserManage';

import TilliGameWeb from './pages/TilliGameWeb';



const history = createBrowserHistory();

function App() {


    var classNameForDevice = "mobile-responsive"
    if (window.navigator.appVersion.toLowerCase().includes("iphone")) {
        classNameForDevice = "mobile-responsive-ios"
        console.log("-->", true)
    }



    return (
        <div className="App">

            <Router>
                <Switch>
                    <Route exact path={"/" + MyConstant.keyList.projectUrl} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <Login {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/audiotest"} history={history} render={(props) =>
                        <AudioRecognize {...props} />
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/signup"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <SignUp {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/signup-with-zip"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <SignUpWithZip {...props} />
                            </div>
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Dashbord"} history={history} render={(props) =>
                        <Dashbord {...props} />
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/oldmodule/:id?/:levelIndex?/:progressingLevel?"} render={(props) =>
                        <ModuleScreen {...props} />
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/module/:id?/:levelIndex?/:progressingLevel?"} render={(props) =>
                        <ModuleScreen_2 {...props} />
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Parent"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ParentScreen {...props} />
                                <Footer page={'Parent'} props={props} />
                            </div>
                        </React.Fragment>
                    } />


                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/home/:loggedUserId?"} history={history} render={(props) =>
                        <HomeScreen {...props} />
                    } />


                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/levels"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <LevelScreen {...props} />
                                <Footer page={'levels'} props={props} />
                            </div>
                        </React.Fragment>
                    } />


                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/profile"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ProfileScreen {...props} />
                                <Footer page={'profile'} props={props} />
                            </div>
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Parenthome"} history={history} render={(props) =>
                        <React.Fragment>
                            <ParentsHomeScreen {...props} />
                        </React.Fragment>
                    } />


                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/ParentOnboarding"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ParentOnboardingScreen {...props} />
                            </div>
                        </React.Fragment>
                    } />


                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/Empathy"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <EmpathyScreen {...props} />
                            </div>
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/ForgotPassword"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ForgotPassword {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/updatepassword/:userId?/:id?"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ForgotResetPassword {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    {/* lego */}

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <Login {...props} />
                            </div>
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/home/:loggedUserId?"} history={history} render={(props) =>
                        <HomeScreen {...props} />
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/module/:id?/:levelIndex?/:progressingLevel?"} render={(props) =>
                        <ModuleScreen_2 {...props} />
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/levels"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <LevelScreen {...props} />
                                <Footer page={'levels'} props={props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/Parent"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ParentScreen {...props} />
                                <Footer page={'Parent'} props={props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/profile"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ProfileScreen {...props} />
                                <Footer page={'profile'} props={props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/Parenthome"} history={history} render={(props) =>
                        <React.Fragment>
                            <ParentsHomeScreen {...props} />
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/ParentOnboarding"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <ParentOnboardingScreen {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/lego/Empathy"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <EmpathyScreen {...props} />
                            </div>
                        </React.Fragment>
                    } />

                    {/* lego */}


                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/qrcode"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <QrCode {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/qrcode-scan"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <QrCodeScan {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/demouserlogin"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <DemoUserLogin {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/demoflow/:gender?/:age?/:demoUserId?/:language?"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <DemoUserLogin_2 {...props} />
                            </div>
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/demo"} search='?gender=male&age=7&language=english&userType=normal' history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <DemoUserLogin_2 {...props} landingFrom={"nenesa"}/>
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/redirect-demo"} search='?gender=male&age=7&language=english&userType=normal' history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <DemoUserLogin_2 {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/test"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <UserManage {...props} landingFrom="test"/>
                                {/* <DemoUserLogin_2 {...props} landingFrom="test"/> */}
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/internal-demo"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <UserManage {...props} landingFrom="demo"/>
                                {/* <DemoUserLogin_2 {...props} landingFrom="demo"/> */}
                            </div>
                        </React.Fragment>
                    } />

                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/edash"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <StartingDashBord {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/winningPage2"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <WinningPage2 {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/manage"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <Manage {...props} />
                            </div>
                        </React.Fragment>
                    } />
                    <Route exact path={"/" + MyConstant.keyList.projectUrl + "/general-demo"} history={history} render={(props) =>
                        <React.Fragment>
                            <div className={classNameForDevice}>
                                <Manage {...props} />
                            </div>
                        </React.Fragment>
                    } />
                     {/* tilli-game-web */}
                     <Route path={"/" + MyConstant.keyList.projectUrl + "/games"} history={history} render={(props) =>
                        <React.Fragment>
                            <TilliGameWeb />
                        </React.Fragment>
                    } />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
