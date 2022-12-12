import React from "react";
import backImage from '../../images/outlineBackIcon.png';
import nextImage from '../../images/outlineRightIcon.png';
import MyConstant from "../../config/MyConstant";
import { Style } from "react-style-tag";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";



class IntroducePersons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commonPageData: false
        }

    }

    componentDidMount() {

    }

    return_content(pageIndex, index) {

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

        let { stage, data } = this.props;
        let content = data.content;
        console.log(content.persons[0])

        return (<React.Fragment>
            <Style>
                {`
                    .font-family{
                        font-family: 'Montserrat', sans-serif;
                    }
                      `}
            </Style>

            <div className="row mt-3 ml-0">
                <div className="col-2">
                    <Link onClick={() => this.props.changeStage('Previous', stage)}>
                        <img style={{ width: 48, height: 48 }} src={backImage} alt={""}/>
                    </Link>
                </div>
                <div className="col-10">
                    <p style={{
                        // color: '#474A57',
                        fontSize: 27,
                        fontFamily: 'montserrat-extrabold',
                        fontWeight: '800',
                        alignSelf: 'center',
                    }}>
                        {data.title}
                    </p>
                </div>
            </div>




            {content.persons.map((ival, index) => {

                return (<React.Fragment>



                    <div className="row" style={{ marginTop: window.innerHeight / 20, }}>



                        <div className="col-4 " style={{
                            backgroundColor: ival.imageBg,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            marginLeft: 50, position: 'absolute'
                        }}>

                            <img src={MyConstant.keyList.apiURL +
                                'vp?action=module&key=' +
                                ival.image.fileName +
                                '&id=' +
                                ival.image.fileType} style={index === 0 ? { width: 100, height: "auto", marginLeft: -15, marginTop: -10 } : { width: 100, height: 90, marginLeft: -15 }} alt={""}/>

                        </div>
                        <div className="col-8" style={{
                            paddingLeft: '8%', backgroundColor: ival.bg, marginLeft: 104, borderRadius: 20
                            , paddingBottom: 20, paddingTop: 15
                        }}>
                            <p style={{
                                color: '#000000',
                                fontSize: 18,
                                fontFamily: 'montserrat-medium',
                                fontWeight: '700',
                                textAlign: 'center',
                                //paddingTop: 15

                            }} >  {this.return_content(1, 1)}  {ival.name}</p>

                            <p style={{
                                // color: '#000000',
                                fontSize: 16,
                                fontFamily: 'montserrat-regular',
                                fontWeight: '400',
                                textAlign: 'center',
                                padding: 15, color: "#030303", lineHeight: 1.2,
                                marginTop: -20
                            }}> {ival.says}  </p>

                        </div>
                    </div>




                </React.Fragment>
                )

            })}



            <div className="forward-step">
                <Link onClick={() => this.props.changeStage('Next', stage)}>
                    <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                </Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(IntroducePersons);

