import React from "react";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from '../../../config/MyConstant';

class PersonWithTextAnimation extends React.Component {

    constructor(props) {
        super(props)
        {

            this.state = {};

        }
    }


    componentDidMount()
    {

        setTimeout(() => {
            this.setState({viewState:true})
        }, 4000)
        
    }
    render() {
        const { data, stage } = this.props;
        console.log('data-->', data)

        return (<React.Fragment>
            <div className="row mt-3">
                <div className="col-1"></div>
                <div className="col-2">
                    <a onClick={() => this.props.changeStage('Previous', stage)}>
                        <img style={{ width: window.innerHeight / 10 }} src={backImage} />
                    </a>
                </div>
                <div className="col-8 ">
                    <p style={{
                        color: '#474A57',
                        fontSize: 27,
                        fontFamily: 'montserrat-bold',
                        fontWeight: '800',
                        alignSelf: 'center',
                    }}>
                        {data.title}
                    </p>
                </div>
            </div>

            <div className="row mt-3 ">
                <div className="col-2"></div>
                <div className="col-8 center">
                    <img data-testid="image" src={MyConstant.keyList.apiURL +
                        'vp?action=module&key=' +
                        data.content.image.fileName +
                        '&id=' +
                        data.content.image.fileType} style={{ width: '65%', height: '100%' }} />
                </div>
                <div className="col-2"></div>

            </div>


            <div className="row scrolldiv">
                <div className="col-12"> 
                <p style={{...data.content.text[0].style,marginLeft:10,fontWeight:"bold"}}>{data.content.text[0].value}</p> </div>
            </div>


            

            {this.state.viewState ?
            <div style={{ position: 'absolute', bottom: window.innerHeight / 15, right: '5%', zIndex: 3 }} >
            <a onClick={() => this.props.changeStage('Next', stage)}>
                <img data-testid="next" style={{ width: window.innerHeight / 15 }} src={nextImage} />
            </a>
            </div>
            : null}


        </React.Fragment>)

    }

}

export default PersonWithTextAnimation