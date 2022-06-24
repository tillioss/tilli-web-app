import React, { Component } from 'react';
import { Style } from "react-style-tag";
import MyConstant from "../config/MyConstant";
class Footer_2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentPage:'home'
        }
    }

    

    componentDidMount()
    {
       if(this.props.page)
       {
        this.setState({ currentPage :this.props.page })
       }
      

    }
    render() {
        return (
            <React.Fragment>
                <Style>
                    {`
                    .fa {
                        color: #EEEFF4;
                    }
                    .checked {
                        color: red;
                    }
               `}
                </Style>
                <div className="col-12" style={{ position: 'fixed', bottom: 0, left: 0, backgroundColor: '#FFFFFF' }}>
                    <div className="row" style={{ minHeight: 100 }}>
                        <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ flexDirection: 'column' }} onClick={()=>{
                                this.setState({currentPage:'home'})
                                this.props.props.history.push('/'+MyConstant.keyList.projectUrl+'/home')
                            }}>
                                <div>
                                    <i className={`fa fa-circle fa-3x ${this.state.currentPage==='home' ? 'checked' : ''}`}></i>
                                </div>
                                <div className="mt-1">
                                    Home
                                </div>
                            </div>
                        </div>
                        <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ flexDirection: 'column' }} onClick={()=>{
                                this.setState({currentPage:'levels'})
                                this.props.props.history.push('/'+MyConstant.keyList.projectUrl+'/levels')
                            }}>
                                <div>
                                    <span className={`fa fa-star fa-3x ${this.state.currentPage==='levels' ? 'checked': ''}`} ></span>
                                </div>
                                <div className="mt-1">
                                    Levels
                                </div>
                            </div>
                        </div>
                        <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ flexDirection: 'column' }} onClick={()=>{
                                this.setState({currentPage:'parents'})
                                //keyList.projectUrl
                                this.props.props.history.push('/'+MyConstant.keyList.projectUrl+'/Parent')
                            }}>
                                <div>
                                    <span className={`fa fa-square fa-3x ${this.state.currentPage==='parents' ? 'checked': ''}`}></span>
                                </div>
                                <div className="mt-1">
                                    Parents
                                </div>
                            </div>
                        </div>
                        <div className="col-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ flexDirection: 'column' }} onClick={()=>{
                               
                                this.setState({currentPage:'profile'})
                                this.props.props.history.push('/'+MyConstant.keyList.projectUrl+'/profile')
                            }}>
                                <div>
                                    <span className={`fa fa-circle fa-3x ${this.state.currentPage==='profile' ? 'checked': ''}`}></span>
                                </div>
                                <div className="mt-1">
                                    Profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Footer_2;