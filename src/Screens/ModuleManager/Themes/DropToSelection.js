import React, { } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../../images/outlineBackIcon.png';
import nextImage from '../../../images/outlineRightIcon.png';
import MyConstant from '../../../config/MyConstant';
import drag_drop from '../../../images/drag_drop.png';
import Awesome_JobImg from '../../../images/Awesome_Job.gif';
import Rocket_Launch from '../../../images/Rocket_Launch.gif';
import { Link } from 'react-router-dom';



class CircleWithInfoAnimations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: [], selectColor_1: "", selectColor_2: "", selectColor_3: "",
            modelView: false, display_view: 'none', show_con: "", imageBackground_color: "",
            modelContent: "", anotherChoice: 1,
            true_header: "", true_body: "",
            true_button: "", change_Content: false,
            false_header: '', false_body: "", false_button: "", boderView: true,
            imageDraged: false,
            appendData: document.createElement('p'),
            imageBgColor: this.props.data.content.imageBgColor ? this.props.data.content.imageBgColor : "#61E4C5",
            deviceHeight: window.innerHeight,
            bgclass: "bg1", succesMsgCount: 0,


        };
    }


    async componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        var btn = document.querySelector('#drag1');

        // attaching each event listener
        var activeEvent = '';
        var originalX = '';
        var originalY = '';
        var that = this
        btn.addEventListener('touchstart', function (e) {
            e.preventDefault();
            //console.log('btn touched');
            //console.log(btn)
            e.target.getAttribute('id');
            originalX = (e.target.offsetLeft - 10) + "px";
            originalY = (e.target.offsetTop - 10) + "px";
            activeEvent = 'start';
            that.setState({ boderView: true, imageDraged: true, imageBackground_color: that.state.imageBgColor, })

        })
        btn.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (activeEvent === 'move') {

                e.target.style.position = "initial";
                var changedTouch = e.changedTouches[0];
                var element = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
                var parentDiv = element.parentNode;
                if (element && element.id) {
                    document.getElementById(element.id).appendChild(e.target);
                    that.checkAnswer(element.id)
                } else if (parentDiv && parentDiv.id) {
                    document.getElementById(parentDiv.id).appendChild(e.target);
                    that.checkAnswer(parentDiv.id)
                } else {
                    // e.target.style.left = originalX;
                    // e.target.style.top = originalY;   
                }
            }
            if (element) {
                that.setState({ imageBackground_color: that.state.imageBgColor, originalX, originalY, appendData: e.target, check: element.id })
            }


            //console.log('btn leaved',e);
        })


        btn.addEventListener('touchmove', function (e) {
            let Orientation = false
            if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
            }
            else {

                Orientation = true
            }

            if (Orientation) {
                window.scrollTo(window.innerHeight / 2, window.innerHeight / 2);
            }
            let height = btn.offsetHeight;
            var touchLocation = e.targetTouches[0];
            let x = window.innerWidth > 768 ? 0 : 60;
            let y = window.innerWidth > 768 ? 0 : 70;

            var pageX = (touchLocation.pageX - x) + "px";
            var pageY = (touchLocation.pageY - y - (height / 2)) + "px";
            e.target.style.position = "absolute";
            e.target.style.left = pageX;
            e.target.style.top = pageY;
            activeEvent = 'move';
        })

        btn.addEventListener('dragstart', function (e) {

            console.log('btn dragstart');
            e.target.getAttribute('id');
            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.setData("text", e.target.getAttribute('id'));

        })

        btn.addEventListener('touchleave', function () {
            //console.log('btn moving end');

        })
        btn.addEventListener('touchcancel', function () {
            //console.log('btn moving cancel');
        })

        if (window.matchMedia('screen and (max-width: 768px)').matches) {
            console.log("if==> responsive")
        }
        else {
            console.log("else browser")
            this.setState({ boderView: false })
            let checkWidth = window.innerWidth > 700 ? true : false
            let UWPview = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")

            let circleWidth = [];
            circleWidth.push(document.getElementById('Red').clientWidth);
            circleWidth.push(document.getElementById('Blue').parentNode.clientWidth);
            circleWidth.push(document.getElementById('Yellow').clientWidth);

            let maxWidth = Math.min(...circleWidth);
            document.getElementById('Red').style.marginTop = "37%"
            document.getElementById('Red').style.width = UWPview ? "130px" : checkWidth ? maxWidth + "px" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Red').style.height = UWPview ? "130px" : checkWidth ? maxWidth + "px" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Red').style.borderRadius = checkWidth ? "50%" : window.innerWidth * 0.9 / (4.2) / 2 + "px"
            document.getElementById('Red').style.border = "2px dotted white"

            // document.getElementById('Blue').style.marginTop = "30%"
            document.getElementById('Blue').style.width = UWPview ? "130px" : maxWidth + "px"
            document.getElementById('Blue').style.height = UWPview ? "130px" : checkWidth ? maxWidth + "px" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Blue').style.borderRadius = checkWidth ? "50%" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Blue').style.border = "2px dotted white"
            if (UWPview) {
                document.getElementById('Blue').style.marginLeft = "50px"
            }

            // document.getElementById('Yellow').style.marginTop = "15%"
            document.getElementById('Yellow').style.marginTop = "20%"
            document.getElementById('Yellow').style.width = UWPview ? "130px" : checkWidth ? maxWidth + "px" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Yellow').style.height = UWPview ? "130px" : checkWidth ? maxWidth + "px" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Yellow').style.borderRadius = checkWidth ? "50%" : window.innerWidth * 0.9 / (4.2) + "px"
            document.getElementById('Yellow').style.border = "2px dotted white"

            document.getElementById('Yellow').style.top = "150px"
            if (UWPview) {
                document.getElementById('Yellow').style.marginLeft = "30px"
            }

        }

    }



    allowDrop(ev) {
        //alert(JSON.stringify(ev.target.id))
        ev.preventDefault();
    }


    drag(ev) {



    }


    drop(ev) {
        // const { data } = this.props;
        // let content = data.content;

        if (ev && ev.target && ev.target.id) {
            console.log('div', JSON.stringify(ev.target.id).length, JSON.stringify(ev.target.id))
            ev.preventDefault();
            this.setState({ check: ev.target.id })

            if (ev.target.id === "Yellow" || ev.target.id === "Blue" || ev.target.id === "Red") {

                var datas = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(datas))
                this.checkAnswer(ev.target.id)
            }
        }

    }
    checkAnswer(choose) {
        const { data } = this.props;
        let { anotherChoice } = this.state;
        let content = data.content;
        //console.log("content",content.circles)
        let check_value = false
        let trustvalue = "";

        if (choose === "Yellow") {
            //trustvalue = "NO TRUST"
            trustvalue = content.circles[2].name
        }
        else if (choose === "Blue") {
            //trustvalue = "LOW TRUST"
            trustvalue = content.circles[1].name
        }
        else if (choose === "Red") {
            //trustvalue = "HIGH TRUST"
            trustvalue = content.circles[0].name
        }

        content.circles.map((iva, index) => {

            if (content.circles[index].isCorrectanswer === true && content.circles[index].name === trustvalue) {
                check_value = true
            }
            return true
        })
        
        data.content.chooseAnswer = check_value ? "Correct" : "Wrong"
        data.content.circleSelect = choose

        // let totalPoints = parseInt(localStorage.getItem("totalPoints")) ? parseInt(localStorage.getItem("totalPoints")) : 0;

        if (check_value) {
            let levelPoints = parseInt(localStorage.getItem("levelPoints")) ? parseInt(localStorage.getItem("levelPoints")) : 0;
            localStorage.setItem("levelPoints", (levelPoints + 1).toString())

            this.setState({ modelView: true, show_con: "show", display_view: "block", imageBackground_color: this.state.imageBgColor, modelContent: true, })
        }
        else {

            this.setState({ modelView: true, show_con: "show", display_view: "block", imageBackground_color: this.state.imageBgColor, modelContent: false, })
        }



        if (anotherChoice === 1) {

            if (check_value) {

                this.props.storyPoints(this.props.parentindex, 200)
            }

            this.setState({
                true_header: <div dangerouslySetInnerHTML={{ __html: data.content.message.success_header_1 }} />,
                true_body: <div dangerouslySetInnerHTML={{ __html: data.content.message.success_body_1 }} />,
                true_button: <div style={{ marginBottom: '-1rem' }} dangerouslySetInnerHTML={{ __html: data.content.message.success_button_1 }} />,
                change_Content: false,
                false_header: <div dangerouslySetInnerHTML={{ __html: data.content.message.failure_header_1 }} />,
                false_body: <div dangerouslySetInnerHTML={{ __html: data.content.message.failure_body_1 }} />,
                false_button: <div style={{ marginBottom: '-1rem' }} dangerouslySetInnerHTML={{ __html: data.content.message.failure_button_1 }} />
            })
        }
        else if (anotherChoice === 2) {

            if (check_value) {
                // localStorage.setItem("totalPoints", (totalPoints + 100).toString())
                this.props.storyPoints(this.props.parentindex, 100)
            }
            else {

                // localStorage.setItem("totalPoints", (totalPoints + 0).toString())
                this.props.storyPoints(this.props.parentindex, 0)
            }

            this.setState({
                false_header: <div dangerouslySetInnerHTML={{ __html: data.content.message.failure_header_2 }} />,
                false_body: <div dangerouslySetInnerHTML={{ __html: data.content.message.failure_body_2 }} />,
                false_button: <div style={{ marginBottom: '-1rem' }} dangerouslySetInnerHTML={{ __html: data.content.message.failure_button_2 }} />,
            })
        }

    }

    IncreaseUserPoint() {
        var levelPoints = localStorage.getItem("levelPoints")
        var newPoint = parseInt(levelPoints) + 1
        localStorage.setItem("userPoints", newPoint);
        localStorage.setItem("levelPoints", newPoint);
    }


    handleResize = () => this.setState({
        deviceHeight: window.innerHeight,
    });


    return_content(index) {
        var pageIndex = 1
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

        const { stage, data, parentindex } = this.props;
        const { true_body, true_header, true_button, change_Content, false_body, false_header, false_button,
            modelContent } = this.state;
        let { deviceHeight, imageDraged, } = this.state
        let content = data.content;
        let innerWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
        let UWPview = window.navigator && window.navigator.appVersion.toLowerCase().includes("webview")



        // console.log(this.state.succesMsgCount)

        let imagestyle = {};
        if (content.imagestyle)
            var imgstyle = content.imagestyle.split(',')
        if (imgstyle && imgstyle.length > 1) {
            imgstyle.map(ival => {
                let i = ival.split(':');
                if (i.length > 1) {
                    imagestyle[i[0]] = JSON.parse(i[1]);
                }
                return true
            })
        }

        let Orientation = false
        if (window.innerHeight > window.innerWidth || window.innerHeight > 768) {
        }
        else {
            deviceHeight = 680
            innerWidth = 375
            Orientation = true
        }

        let { trustPointText, totalPoint, PercentageTotal, moduleJson } = this.props

        var currentJson = moduleJson.stages[parentindex - 1]

        return (<React.Fragment>
            <Style>
                {`
                    #Yellow>img{
                      margin-top:20px !Important;
                      width:80px !Important;
                    }
                    #Red>img{
                        margin-top:40px !Important;
                        margin-left:-20px !Important;
                        width:80px !Important;                     
                      }

                      #Blue>img
                      {
                        // margin-top:75px !Important;
                        // margin-left:-20px !Important;
                        width:80px !Important;
                      }
                      `}
            </Style>


            {this.state.show_con ?
                <div className="modal-backdrop fade show" style={{
                    display: this.state.show_con,
                    background: "rgba(196, 196, 196, 0.72)",
                }}>  </div> : null}


            <div style={{ width: '100%', backgroundColor: modelContent ? "#d5d5d5" : "", height: modelContent ? "100vh" : "" }}>
                <div className="col-12" style={{ margin: 0, padding: 0 }}>
                    <div className={"row mt-4 ml-0"} >
                        <div className="col-2">
                            <Link onClick={() => {
                                if (this.props.themeType === "StoryCard") {
                                    this.props.changeindex('Previous', stage)
                                }
                                else {
                                    this.props.changeStage('Previous', stage)
                                }

                            }}>
                                <img style={{ width: 48, height: 48 }} src={backImage} alt={""} />
                            </Link>
                        </div>
                        <div className="col-8">
                            <p style={{

                                alignSelf: 'center',
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: data.title }} />
                            </p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                    </div>
                </div>


                <div className="row" style={{}}>
                    <div id={"drag2"} className={"col-4 p-0 " + content.imageclassname} style={{
                        backgroundColor: this.state.imageBgColor,
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        marginLeft: 50, position: 'absolute',
                        ...imagestyle
                    }}
                    >

                        <img id="drag1" draggable="true"
                            onDragStart={(e) => {

                                this.drag(e)
                            }} onDragEnd={(e) => {
                                this.setState({ imageBackground_color: this.state.imageBgColor, appendData: e.target, })

                            }} src={MyConstant.keyList.apiURL + 'vp?action=module&key=' + data.content.image.fileName + '&id=' + data.content.image.fileType}
                            style={{ zIndex: 1, width: 90, backgroundColor: this.state.imageBackground_color, borderRadius: 90, }} alt={""} />
                        {/* </Draggable> */}

                    </div>
                    <div className="col-8 boder_radius" style={{
                        height: "auto", width: 250, paddingLeft: '8%',
                        backgroundColor: content.changeColorStoryBox ? content.changeColorStoryBox : '#53dce294',
                        marginLeft: 104, borderRadius: 20
                    }}>  <p style={{
                        textAlign: 'center',
                        paddingTop: 15, paddingLeft: 15,
                    }} >
                            {/* {data.content.text1} */}
                            <div className="drag-text_1" dangerouslySetInnerHTML={{ __html: data.content.text1 }} />
                        </p>
                    </div>
                </div>
                <br />
                <div className="row ">
                    <div className="col-2"> </div>
                    <div className="col-9 row" style={{
                        fontSize: 14, fontWeight: 'bold', paddingTop: 6,
                        backgroundColor: content.ChangeColorQuestionBox ? content.ChangeColorQuestionBox : "#FFC737",
                        border: " 1px solid rgba(35, 31, 32, 0.46)",
                        boxSizing: "border-box", boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10,
                    }}>
                        <div className="col-2 p-0 py-3">
                            <img src={drag_drop} style={{ width: 34, height: 30 }} alt={""} />
                        </div>
                        {/* {data.content.text2} */}
                        <div className={deviceHeight < 750 ? "col-10 p-0 pt-2 drag-text_2" : "col-10 p-0 pt-1"} dangerouslySetInnerHTML={{ __html: data.content.text2 }} />
                    </div>
                    <div className="col-1"> </div>
                </div>

                <div class={"modal fade bd-example-modal-lg " + this.state.show_con} style={{ display: this.state.display_view, top: deviceHeight < 700 ? "20%" : modelContent ? "30%" : "30%" }} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">

                        {modelContent ? <img src={Awesome_JobImg} style={{
                            width: 250, height: 100, left: 0, top: 35, zIndex: 1000,
                            position: "inherit"
                        }} alt={""} /> : null}

                        <div class={"modal-content box-bgcolor "} style={Orientation ? { top: 0 } : {}} >
                            {this.state.modelContent === true ?
                                <React.Fragment>

                                    <div className="row col-12" style={{ marginTop: 30 }}>
                                        <div className="col-sm-2"> </div>
                                        <div className="col-sm-8">
                                            <p style={{}}>{true_header}</p>
                                            <p style={{ lineHeight: 1.1 }}> {true_body}</p>
                                        </div>
                                        <div className="col-sm-2"> </div>
                                    </div>


                                    <div className="row col-12">
                                        <div className="col-sm-2" > </div>
                                        <div className="col-sm-8" onClick={() => {
                                            if (change_Content) {
                                                // this.IncreaseUserPoint()
                                                if (this.props.themeType === "StoryCard") {
                                                    //this.props.changeStage('Next', this.props.parentindex)
                                                    this.props.changeScreen('Next', this.props.parentindex)
                                                }
                                                else {
                                                    //this.props.changeStage('Next', stage)
                                                    this.props.changeScreen('Next', stage)
                                                }

                                                this.setState({ show_con: "", display_view: "none", })
                                            }
                                            this.setState({
                                                change_Content: true,
                                                true_header: <div dangerouslySetInnerHTML={{ __html: data.content.message.success_header_2 }} />,
                                                true_body: <div dangerouslySetInnerHTML={{ __html: data.content.message.success_body_2 }} />,
                                                true_button: <div style={{ marginBottom: '-1rem' }} dangerouslySetInnerHTML={{ __html: data.content.message.success_button_2 }} />,
                                                bgclass: "bg2", succesMsgCount: this.state.succesMsgCount + 1
                                            })

                                        }} >
                                            {localStorage.getItem("loggedUserId") || localStorage.getItem("demoUserId") ? <button style={{ color: "inherit" }} className={"lego-box-btnbg"}
                                                type="button" data-dismiss="modal" aria-label="Close" class="btn btn-warning">{true_button}</button> : <button type="button" class="lego-box-btnbg"
                                                    data-toggle={this.state.succesMsgCount > 1 ? "modal" : ""} data-target="#myModal"> {false_button}</button>}

                                        </div>
                                        <div className="col-sm-2"> </div>
                                    </div>

                                </React.Fragment>

                                :


                                <React.Fragment>

                                    <div className="row col-12" style={{ marginTop: 40 }}>
                                        <div className="col-2"> </div>
                                        <div className="col-8">
                                            <p style={{}}>{false_header} </p>
                                            <p style={{}}> {false_body}</p>

                                        </div>
                                        <div className="col-2"> </div>
                                    </div>



                                    <div className="row col-12">
                                        <div className="col-2" > </div>
                                        <div className="col-8" onClick={(ev) => {
                                            const { anotherChoice, appendData } = this.state;

                                            this.setState({ show_con: "", display_view: "none", anotherChoice: anotherChoice + 1, imageBackground_color: "" })
                                            document.getElementById("drag2").appendChild(appendData);

                                            if (anotherChoice >= 2) {
                                                this.setState({ show_con: "", display_view: "none", anotherChoice: anotherChoice + 1, imageBackground_color: "" })
                                                document.getElementById("drag2").appendChild(appendData);

                                                this.props.changeindex('Next', stage);

                                            }
                                            this.setState({ anotherChoice: anotherChoice + 1, imageDraged: false })
                                            window.scroll(10, 10)
                                        }} >

                                            {localStorage.getItem("loggedUserId") ? <button className={"lego-box-btnbg "}
                                                type="button" data-dismiss="modal" aria-label="Close" class="btn btn-warning">{false_button} </button> : <button type="button" class="lego-box-btnbg"
                                                    data-toggle={this.state.anotherChoice > 2 ? "modal" : ""} data-target="#myModal"> {false_button}</button>}

                                        </div>
                                        <div className="col-2" > </div>
                                    </div>
                                </React.Fragment>
                            }
                            <div className="col-1" > </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title text-center">Show Message</h4>
                            </div>
                            <div class="modal-body">
                                <p>SuccessFully Submited.</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="modal fade" id="DragErrorImage" role="dialog" style={{ top: "40%" }}>
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div className="row">
                                    <div className="col-sm-10 col-10">
                                        <h4 class="modal-title text-center"> {this.return_content(8)}</h4>
                                    </div>
                                    <div className="col-sm-2 col-2">
                                        <span class="close" data-dismiss="modal" aria-label="Close" style={{ cursor: "pointer" }}>
                                            <span aria-hidden="true">&times;</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-body">
                                <p>{this.return_content(9)}</p>
                            </div>

                        </div>
                    </div>
                </div>


                <div id="drop_zone" ondragover="return false" onDrop={(event) => { this.drop(event) }} onDragOver={(event) => { this.allowDrop(event) }} style={{
                    backgroundColor: content.circles[2].color,
                    height: UWPview ? innerWidth * 0.7 : innerWidth * 0.8,
                    width: UWPview ? "70%" : Orientation ? innerWidth * 0.8 : "80%", marginLeft: UWPview ? "17%" : Orientation ? "20%" : "5%", marginTop: Orientation ? "1%" : "3%", borderRadius: 100000,
                }}>

                    <div className="row drag-margin" style={{ height: innerWidth * 0.8, margin: 0 }}>
                        <div className="col-9" style={{
                            display: 'inline-grid',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{ marginTop: UWPview ? "-70px" : '1%', backgroundColor: content.circles[1].color, height: UWPview ? innerWidth * 0.9 / (1.7) : innerWidth * 0.9 / (1.5), width: UWPview ? innerWidth * 0.9 / (1.7) : innerWidth * 0.9 / (1.5), borderRadius: 100000, }}>

                                <div className="row" style={{ height: '100%', margin: 0 }}>

                                    <div className="col-5" style={{
                                        display: 'contents',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 0,
                                        padding: 0
                                    }}>


                                        {/*div1 yellow*/}
                                        <div id={(window.navigator.userAgentData && window.navigator.userAgentData.mobile) || window.navigator.userAgent.toLowerCase().includes("mobile") ? "Yellow" : ""} style={{
                                            marginTop: UWPview ? "95px" : '21%', backgroundColor: content.circles[0].color,
                                            height: UWPview ? innerWidth * 0.9 / (1.9 * 1.9) : innerWidth * 0.9 / (1.6 * 1.6), width: UWPview ? innerWidth * 0.9 / (1.9 * 1.9) : innerWidth * 0.9 / (1.6 * 1.6), borderRadius: 100000, paddingTop: UWPview ? "5px" : ""
                                        }}>

                                            {!window.navigator.userAgent.toLowerCase().includes("mobile") ? <>
                                                {UWPview ? <div id="Yellow"  >  </div> : <div id={window.navigator.userAgentData && !window.navigator.userAgentData.mobile ? "Yellow" : "Yellow"} >  </div>}
                                                <div id={window.navigator.userAgentData && !window.navigator.userAgentData.mobile ? "Yellow" : ""} >  </div>
                                            </> : null}

                                            {this.state.boderView ? <div style={{ border: "2px dotted white", position: "absolute", marginLeft: 10, marginTop: "10%", width: 92, height: 92, borderRadius: 92 / 2 }}> </div> : null}
                                        </div>
                                        {/*div1 yellow*/}

                                    </div>
                                    {/*div2 Blue*/}
                                    <div className="col-4" >
                                        <div id="Blue" style={{ position: "absolute", marginLeft: -15, marginTop: "100%", width: 90, height: 90 }}>
                                            {this.state.boderView ? <div style={{ border: "2px dotted white", position: "absolute", width: 85, height: 85, borderRadius: 85 / 2 }}> </div>
                                                : null}
                                        </div>
                                    </div>
                                    {/*div2 Blue*/}

                                </div>
                            </div>
                        </div>
                        {/*div3 Red*/}
                        <div id="Red" onDrop={(event) => { this.drop(event) }} onDragOver={(event) => { this.allowDrop(event) }} style={{ margin: '30% 0' }} className="col-3">
                            {this.state.boderView ?
                                <div style={{ border: "2px dotted white", position: "absolute", marginLeft: -15, marginTop: "45%", width: 72, height: 72, borderRadius: 72 / 2 }}> </div>
                                : null}
                            <div className="col-12" > </div>
                        </div>
                        {/*div3 Red*/}
                    </div>


                </div>
            </div>
            <div className="bottom-style" style={{ background: "inherit", position: deviceHeight < 720 ? "unset" : "" }}>
                <div style={{ textAlign: "right" }}>
                    {imageDraged ? <Link data-toggle="modal" data-target="#DragErrorImage" onClick={() => {
                        this.setState({ modelView: true, show_con: "show", display_view: "block", })
                        this.props.changeindex();
                        console.log("img was not drageed ")
                    }} >
                        <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                    </Link> :
                        <Link data-toggle="modal" data-target="#DragErrorImage" onClick={() => {
                            console.log("img was not drageed ")
                        }} >
                            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
                        </Link>}
                </div>
                <div className="progress-div">
                    <div style={{ flex: 1 }} >
                        {totalPoint && totalPoint > 0 && currentJson && currentJson.storyPoints > 0 ?
                            <span>
                                <img className="rocket-image" src={Rocket_Launch} style={{
                                    width: 80, height: 60,
                                }} alt={""} />
                            </span>
                            : null}
                        {trustPointText} {totalPoint}
                    </div>

                </div>
                <div>
                    <div class="progress  barDesign">
                        <div class="progress-bar"
                            role="progressbar" style={{
                                width: PercentageTotal + "%", backgroundColor: "#FFBD12",
                                border: totalPoint ? "1px solid #18191F" : ""
                            }} aria-valuenow={PercentageTotal} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>




        </React.Fragment >)
    }
}
export default CircleWithInfoAnimations
