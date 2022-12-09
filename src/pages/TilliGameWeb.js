import {
    BrowserRouter as Router,
    Switch,
    Route, useRouteMatch
} from "react-router-dom";
import Login from "./tilli-game-web/Login";
// import NoMatch from "./tilli-game-web/NoMatch";
import GameRoute from "./tilli-game-web/GameRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../tilligameweb.css';

function TilliGameWeb(pageProps) {
    let { path} = useRouteMatch();
    return (
        <div className="main-container tilligw">
            <ToastContainer />
            <Router>
                <Switch>
                    <Route exact path={path + "/login"} render={(props) =>
                        <Login history={props.history} path={path} />
                    } />
                    <Route path={path} render={(props) =>
                        <GameRoute history={props.history} path={path} />
                    } />
                </Switch>
            </Router>
        </div>
    );
}

export default TilliGameWeb;
