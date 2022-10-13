import React from 'react';
import {
    useRouteMatch, withRouter, BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import SplashScreen from "./SplashScreen";
import LanguageScreen from "./LanguageScreen";
import RegisterScreen from "./RegisterScreen";
import ParentPasswordSetup from "./ParentPasswordSetup";
import CreateProfile from "./CreateProfile";
import GamePlay from './GamePlay';
import { useEffect } from 'react';
import MyConstant from '../../config/MyConstant';

function GameRoute(props) {
    let { path, url } = useRouteMatch();
    useEffect(() => {
        let loggedIn = localStorage.getItem("TilliGameLoggedIn");
        if (!loggedIn) {
            props.history.push(path + "/login")
        }
    }, [])
    return <Switch>
        <Route exact path={path + "/"}>
            <SplashScreen history={props.history} path={path} />
        </Route>
        <Route exact path={path + "/language"}>
            <LanguageScreen history={props.history} path={path} />
        </Route>
        <Route exact path={path + "/create-account"}>
            <RegisterScreen history={props.history} path={path} />
        </Route>
        <Route exact path={path + "/parent-password-setup"}>
            <ParentPasswordSetup history={props.history} path={path} />
        </Route>
        <Route exact path={path + "/createprofile"}>
            <CreateProfile history={props.history} path={path} />
        </Route>
        <Route exact path={path + "/start-game"}>
            <GamePlay history={props.history} path={path} />
        </Route>
    </Switch>
}


export default withRouter(GameRoute)