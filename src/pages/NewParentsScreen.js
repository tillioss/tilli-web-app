import React, { Component } from 'react';
import MyConstant from '../config/MyConstant';
import { connect } from 'react-redux';
import Back_Button from '../images/Back_Button.png'
import trackProgress from '../images/Group2720.png'
import tipandtricks from '../images/Group2718.png'

class NewParentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
    render() {

        return (
            <React.Fragment>
                <div className='newParentsBody'>
                    <div className='headers mt-2'>
                        <div className='d-flex justify-content-start backbtn ml-3' style={{ width: '10%' }}>
                            <img src={Back_Button} style={{ width: '50px' }} onClick={() => { this.props.history.push('/' + MyConstant.keyList.projectUrl + '/Parent') }} alt=""/>
                        </div>
                        <div className='d-flex justify-content-center mt-2 mx-4 headtext' style={{ width: '68%' }}>
                            <h3 className='headerStr'>Parent's Corner</h3>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='trackProgress mt-4'>
                        <img src={trackProgress} style={{ width: "35%" }} onClick={() => { this.props.history.push('/' + MyConstant.keyList.projectUrl + '/trackprogressscreen') }} alt=""/>
                    </div>
                    <div className='trackProgress mt-2'>
                        <p className='trackProgressTxt'>Track Progress</p>
                    </div>
                    <div className='trackProgress' style={{ height: "15px" }}>
                        <p className='trackProgressLineTxt p-4 mt-1'>Get a snapshot of your child’s emotions and strategies they use to feel better</p>
                    </div>
                    <a href="https://www.tillikids.com/blog" target="_blank" rel="noreferrer">
                    <div className='trackProgress mt-5' >
                        <img src={tipandtricks} style={{ width: "32%" }} alt="" />
                    </div>
                    </a>
                    <div className='trackProgress mt-2'>
                        <p className='trackProgressTxt'>Tips and Tricks</p>
                    </div>
                    <div className='trackProgress' style={{ height: "15px" }}>
                        <p className='trackProgressLineTxt p-4 mt-1'>Access easy and well curated guide of learning tools in our Blog</p>
                    </div>
                </div>
            </React.Fragment>
        )

    }

}



const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewParentScreen);

