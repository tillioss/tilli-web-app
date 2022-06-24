import React, { Component } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../images/outlineBackIcon.png';
import spashes1 from '../../images/spashes1.png';
import PeopleIcons4 from '../../images/PeopleIcons4.png';
import nextImage from '../../images/outlineRightIcon.png';
import MyConstant from '../../config/MyConstant';

class ImageWithThinking extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { stage, data } = this.props;
        let content = data.content;
        let innerWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
        return (
            <React.Fragment>
                <Style>
                    {`
                      `}
                </Style>
                <div className="module-content">
                    <div className="col-12" style={{ margin: 0, padding: 0 }}>
                        <div className="row mt-4 ml-0">
                            <div className="col-2">
                                <a onClick={() => this.props.changeStage('Previous', stage)}>
                                    <img style={{ width: 48,height:48 }} src={backImage} />
                                </a>
                            </div>
                            <div className="col-10"  style={{alignSelf:'center'}}>
                                <p style={{
                                  //  color: '#474A57',
                                    fontSize: 27,
                                    fontFamily: 'montserrat-extrabold',
                                    fontWeight: '800',
                                    alignSelf: 'center',
                                }}>
                                    {data.title}
                                </p>
                            </div>
                        </div>
                        <div className="row mt-4 mx-0">
                            <div className="offset-2 col-10 font-17-14" style={{ backgroundImage: `url(${spashes1})`, minHeight: 200, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
                                <div style={{fontFamily: 'schoolbell-regular',fontWeight:400, padding: '14% 12% 24%'}}>
                                    {content.text}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mx-0">
                            <div style={{backgroundColor:'#FFC7DE',borderRadius: innerWidth/1.6,width: innerWidth/1.6 ,height: innerWidth/1.6,borderStyle:'solid', marginLeft: '5%'}}>
                                <img style={{ width: innerWidth/1.3,marginTop:20,marginLeft:20 }} src={PeopleIcons4} />
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="forward-step" >
                    <a onClick={() => this.props.changeStage('Next', stage)}>
                        <img style={{ width: 44,height:44}} src={nextImage} />
                    </a>
                </div>
            </React.Fragment>
        )
    }
}
export default ImageWithThinking
