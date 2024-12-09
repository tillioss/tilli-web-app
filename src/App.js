import { createBrowserHistory } from "history";
import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AudioRecognize from "./Component/AudioRecognize";
import MyConstant from "./config/MyConstant";
import EmpathyScreen from "./pages/EmpathyScreen";
import Footer from "./pages/Footer";
import HomeScreen from "./pages/HomeScreen";
import LevelScreen from "./pages/LevelScreen";
import ModuleScreen from "./pages/ModuleScreen";
import NewParentsScreen from "./pages/NewParentsScreen";
import ParentOnboardingScreen from "./pages/ParentOnboardingScreen";
import ParentScreen from "./pages/ParentScreen";
import ParentsHomeScreen from "./pages/ParentsHomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import TrackProgressScreen from "./pages/TrackProgressScreen";
import Dashbord from "./Screens/Dashbord";
import DemoUserLoginTwo from "./Screens/DemoUserLogin_2";
import ForgotPassword from "./Screens/ForgotPassword";
import ForgotResetPassword from "./Screens/ForgotResetPassword";
import Login from "./Screens/Login";
import Manage from "./Screens/Manage";
import GodotPlay from "./Screens/ModuleManager/GodotPlay";
import GodotRedirect from "./Screens/ModuleManager/GodotRedirect";
import ModuleScreenTwo from "./Screens/ModuleManager/ModuleScreen_2";
import ModuleScreenMange from "./Screens/ModuleManager/ModuleScreenMange";
import NotFoundPage from "./Screens/NotFoundPage";
import QrCode from "./Screens/QrCode";
import SignUp from "./Screens/SignUp";
import UserManage from "./Screens/UserManage";
import WinningPage2 from "./TilliYourWinning/WinningPage2";

import "./App.css";

const history = createBrowserHistory();

function App() {
  var classNameForDevice = "mobile-responsive";
  if (window.navigator.appVersion.toLowerCase().includes("iphone")) {
    classNameForDevice = "mobile-responsive-ios";
    console.log("-->", true);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <Login {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/audiotest"}
            history={history}
            render={(props) => <AudioRecognize {...props} />}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/signup"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <SignUp {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/Dashbord"}
            history={history}
            render={(props) => <Dashbord {...props} />}
          />
          <Route
            exact
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/oldmodule/:id?/:levelIndex?/:progressingLevel?"
            }
            render={(props) => <ModuleScreen {...props} />}
          />
          <Route
            exact
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/module/:id?/:levelIndex?/:progressingLevel?"
            }
            render={(props) => <ModuleScreenTwo {...props} />}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/Parent"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ParentScreen {...props} />
                  <Footer page={"Parent"} props={props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/home/:loggedUserId?"}
            history={history}
            render={(props) => <HomeScreen {...props} />}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/levels"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <LevelScreen {...props} />
                  <Footer page={"levels"} props={props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/profile"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ProfileScreen {...props} />
                  <Footer page={"profile"} props={props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/Parenthome"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <ParentsHomeScreen {...props} />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/ParentOnboarding"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ParentOnboardingScreen {...props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/Empathy"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <EmpathyScreen {...props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/ForgotPassword"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ForgotPassword {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/updatepassword/:userId?/:id?"
            }
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ForgotResetPassword {...props} />
                </div>
              </React.Fragment>
            )}
          />
          {/* lego */}

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/lego"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <Login {...props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={
              "/" + MyConstant.keyList.projectUrl + "/lego/home/:loggedUserId?"
            }
            history={history}
            render={(props) => <HomeScreen {...props} />}
          />

          <Route
            exact
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/lego/module/:id?/:levelIndex?/:progressingLevel?"
            }
            render={(props) => <ModuleScreenTwo {...props} />}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/lego/levels"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <LevelScreen {...props} />
                  <Footer page={"levels"} props={props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/lego/Parent"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ParentScreen {...props} />
                  <Footer page={"Parent"} props={props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/lego/profile"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ProfileScreen {...props} />
                  <Footer page={"profile"} props={props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/lego/Parenthome"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <ParentsHomeScreen {...props} />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={
              "/" + MyConstant.keyList.projectUrl + "/lego/ParentOnboarding"
            }
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <ParentOnboardingScreen {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/lego/Empathy"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <EmpathyScreen {...props} />
                </div>
              </React.Fragment>
            )}
          />

          {/* lego */}

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/qrcode"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <QrCode {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/demoflow/:gender?/:age?/:demoUserId?/:language?"
            }
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <DemoUserLoginTwo {...props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/demo"}
            search="?gender=male&age=7&language=english&userType=normal"
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <DemoUserLoginTwo {...props} landingFrom={"nenesa"} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/redirect-demo"}
            search="?gender=male&age=7&language=english&userType=normal"
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <DemoUserLoginTwo {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/internal-demo"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <UserManage {...props} landingFrom="demo" />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/winningPage2"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <WinningPage2 {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/manage"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <Manage {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/general-demo"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <Manage {...props} />
                </div>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/module-manage/:id?/:levelIndex?/:progressingLevel?/:gameIndex?"
            }
            render={(props) => <ModuleScreenMange {...props} />}
          />
          {/* godot */}
          <Route
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/godotplay/:gameId/:themeId/:gameIndex?"
            }
            history={history}
            render={(props) => (
              <React.Fragment>
                <GodotPlay {...props} />
              </React.Fragment>
            )}
          />
          <Route
            path={
              "/" +
              MyConstant.keyList.projectUrl +
              "/godot-redirect/:gameIndex?"
            }
            history={history}
            render={(props) => (
              <React.Fragment>
                <GodotRedirect {...props} />
              </React.Fragment>
            )}
          />

          {/* godot */}
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/newparentsscreen"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <NewParentsScreen {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path={"/" + MyConstant.keyList.projectUrl + "/trackprogressscreen"}
            history={history}
            render={(props) => (
              <React.Fragment>
                <div className={classNameForDevice}>
                  <TrackProgressScreen {...props} />
                </div>
              </React.Fragment>
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
