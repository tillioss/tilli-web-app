import React, { Component } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../images/outlineBackIcon.png';
import nextImage from '../../images/outlineRightIcon.png';
import MyConstant from '../../config/MyConstant';
import people_set from '../../images/people_set.png';
import heart from '../../images/heart.png';
import { connect } from 'react-redux';





class MeetSinglePerson extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            commonPageData: false
        };
    }

    componentDidMount() {



    }

    return_content(pageIndex, index) {

        const { commonPageData } = this.state;

        const { commonGroupLanguageMappingData, commonGroupLanguageBaseData } = this.props

        if (commonGroupLanguageMappingData && commonGroupLanguageMappingData[pageIndex] && commonGroupLanguageMappingData[pageIndex].fieldData[index]) {
            return commonGroupLanguageMappingData[pageIndex].fieldData[index].value

        }

        else if (commonGroupLanguageBaseData && commonGroupLanguageBaseData[pageIndex] && commonGroupLanguageBaseData[pageIndex].fieldData[index]) {
            return commonGroupLanguageBaseData[pageIndex].fieldData[index].value

        }

        else
            return ""



    }


    render() {


        let { stage, data, themeType } = this.props;
        const { commonPageData } = this.state;
        let content = data.content;
        //console.log('content',content)
        return (<React.Fragment>

            <Style>
                {`

.row
{
    margin-left:0px !important
}
`}
            </Style>
            <div className="row" style={{  }}>

                <div className="col-12" style={{ margin: 0, padding: 0 }}>
                    <div className="row mt-4">

                        <div className="col-2">
                            <a onClick={() => {
                                if (themeType == "StoryCard") {

                                    this.props.changeStage('Previous', this.props.parentindex)
                                }
                                else {
                                    this.props.changeStage('Previous', stage)
                                }
                            }}>
                                <img style={{ width: 48, height: 48 }} src={backImage} />
                            </a>
                        </div>
                        <div className="col-8" style={{ alignSelf: 'center' }}>
                            <p style={{ color: "black", fontFamily: 'montserrat-extrabold',
                                    fontWeight: '800', fontSize: 27 }}> {data.title} </p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <div style={{ backgroundColor: content.color_2, borderRadius: 230 / 2, width: 230, height: 230 }}>
                            <img src={MyConstant.keyList.apiURL +
                                'vp?action=module&key=' +
                                data.content.image.fileName +
                                '&id=' +
                                data.content.image.fileType} style={{ width: 140, height: 250 }} />



                        </div>
                    </div>
                    <div className="col-1" />

                </div>
            </div>

            <div className="row" style={{ paddingTop: 25 }}>
                <div className="col-1" />
                <div className="col-10" >
                    <p style={{ color: '#00C6AE',fontSize: 27,fontFamily: 'montserrat-bold',
                                    fontWeight: '800',  }}> {this.return_content(1, 1)}  {content.personName}   </p>
                </div>
                <div className="row" >
                    <div className="col-2" />
                    <div className="col-8" >
                        <p style={{ textAlign: 'center', fontWeight: 500, fontSize: 18, fontFamily: "montserrat-medium" }}>
                            {content.body}
                        </p>
                    </div>
                    <div className="col-2" />

                    <div className="row" style={{ marginTop: -13 }}>
                        <div className="col-1" />
                        <div className="col-10" >
                            <p style={{ fontSize: 18, fontWeight: "700", fontFamily: "montserrat-medium", color: '#474A57' }}> {content.question}  </p>

                        </div>
                        <div className="col-1" />
                    </div>

                    <div className="row" >
                        <div className="col-1" />
                        <div className="col-10" style={{ border: '2px solid #18191F', borderRadius: 16 }} >

                            <p style={{ fontSize: 20, fontWeight: "500", fontFamily: "montserrat-medium", paddingTop: 10 }}>

                                <span style={{ marginRight: 10 }}>  <img style={{ width: 22, height: 20 }} src={heart} /> </span>


                                {content.bottomText}


                                <span style={{ marginLeft: 20 }} onClick={() => {


                                    if (themeType == "StoryCard") {

                                        this.props.changeindex('Next', stage)
                                    }
                                    else {
                                        this.props.changeStage('Next', stage)
                                    }

                                }}>  <img style={{ width: 31, height: 31 }} src={nextImage} /> </span>
                            </p>
                        </div>
                        <div className="col-1" />
                    </div>

                </div>

                <div className="col-2" />
            </div>



        </React.Fragment>)
    }


}


const mapStateToProps = (state) => {
    return {

        commonGroupLanguageMappingData: state.languageReducer.commonGroupLanguageMappingData,
        commonGroupLanguageBaseData: state.languageReducer.commonGroupLanguageBaseData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MeetSinglePerson);

