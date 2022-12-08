import React from 'react';
import { withRouter } from 'react-router-dom';
import Boy from "../../images/tilli-game-web/Boy_1.png"
import Girl from "../../images/tilli-game-web/Girl_1.png"

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        let { path } = this.props
        setTimeout(() => {
            this.props.history.push(path + "/language")
        }, 2000)
    }
    render() {
        return <React.Fragment>
            <div className='background-splash'>
                <div className='logo-setup'>
                    <div className='tilli-header-text'>tilli</div>
                    <div className='tilli-sub-text'>Playful Social-Emotional Learning</div>
                </div>
                <div className='splash-loader'>
                    <div className="stage">
                        <div className="dot-typing"></div>
                    </div>
                </div>
            </div>
            <div className='img-box-width'>
                <div className='boy-image pl-5'>
                    <img src={Girl} alt={"GirlImg"} />
                </div>
                <div className='girl-image pr-5'>
                    <img src={Boy} alt={"BoyImg"} />
                </div>
            </div>
        </React.Fragment>
    }
}

export default withRouter(SplashScreen)