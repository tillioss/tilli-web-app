import React, { Component, useRef, useEffect, useState } from 'react';
import { Style } from "react-style-tag";
import backImage from '../../images/outlineBackIcon.png';
import nextImage from '../../images/outlineRightIcon.png';
import MyConstant from '../../config/MyConstant';
//import Draggable from 'react-draggable'; // The default
import people_set from '../../images/people_set.png';
import { Draggable, Droppable } from 'react-drag-and-drop'

class DropToSelectionNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData: [], selectColor_1: "", selectColor_2: "", selectColor_3: "",
            modelView: false, display_view: 'none', show_con: "", imageBackground_color: ""
        };
    }

    componentDidMount() {

        const { data, match } = this.props;
        const { selectColor_1, selectColor_2, selectColor_3 } = this.state;

        let levelIndex = match.params.levelIndex;
        let datacontent = localStorage.getItem(levelIndex + '_selectedCircle');

        if (datacontent) {

            if (datacontent == 0) {
                this.setState({ selectColor_1: 'white' })
            } else if (datacontent == 1) {
                this.setState({ selectColor_2: 'white' })

            } else if (datacontent == 2) {
                this.setState({ selectColor_3: 'white' })

            }


        }


    }

    onDrop(data) {
        alert(JSON.stringify(data))
        console.log(data)
        // => banana 
    }

    selectedView() {

        const { selectColor_1, selectColor_2, selectColor_3 } = this.state;

        const { match } = this.props;

        let levelIndex = match.params.levelIndex;

        let value = '';
        let color = 'white'
        if (selectColor_1.length != 0) {
            value = 0

        } else if (selectColor_2.length != 0) {
            value = 1
        }
        else if (selectColor_3.length != 0) {
            value = 2
        }

        if (value.length != 0) {
            localStorage.removeItem(levelIndex + "_selectedCircle");
        }


        if (!localStorage.getItem(levelIndex + '_selectedCircle')) {


            if (value.length != 0) {
                console.log('color', color, value)

                localStorage.setItem(levelIndex + "_selectedCircle", value);
                console.log(localStorage.getItem(levelIndex + '_selectedCircle'))
            }

        }


    }
    render() {
        const { stage, data } = this.props;
        let content = data.content;



        // let textList = content.text.map((text, index) => {
        //     return (
        //         <div
        //             key={index}
        //             style={
        //                 {
        //                     color: '#474A57',
        //                     fontSize: 27,
        //                     fontFamily: 'montserrat-bold',
        //                     fontWeight: '800',
        //                     textAlign: 'left',
        //                     marginLeft: 10,
        //                     ...text.style,
        //                 }}>
        //             {text.value}
        //         </div>
        //     );
        // });
        return (<React.Fragment>
            <Style>
                {`
                    
                      `}
            </Style>


            <div style={{ width: '100%' }}>

                <div className="col-12" style={{ margin: 0, padding: 0 }}>
                    <div className="row mt-3">
                        <div className="col-2">
                            <a onClick={() => {
                                this.selectedView()
                                this.props.changeStage('Previous', stage)

                            }}>
                                <img style={{ width: window.innerHeight / 10 }} src={backImage} />
                            </a>
                        </div>
                        <div className="col-8">
                            <p style={{
                                //color: '#474A57',
                                fontSize: 27,
                                fontFamily: 'montserrat-bold',
                                fontWeight: '800',
                                alignSelf: 'center',
                            }}>
                                {data.title}
                            </p>
                        </div>
                    </div>
                    {/* {textList} */}

                    <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                        {/* <Draggable>   
                        <img
                            src={MyConstant.keyList.apiURL + 'vp?action=module&key=' + content.image.fileName + '&id=' + content.image.fileType}
                            style={{ width: 133, height: 127 }}
                        />
                     </Draggable> */}
                    </div>

                </div>


                <div className="row" style={{  }}>

                    <div className="col-4" style={{
                        backgroundColor: '#00C6AE',
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        marginLeft: 50, position: 'absolute'
                    }}>
                        <Draggable  type="fruit" data="banana" onStop={() => {
                            this.setState({ imageBackground_color: "#61E4C5" })
                            // setTimeout(() => {
                            //    this.setState({modelView:true ,show_con:"show" ,display_view:"block",imageBackground_color:"#61E4C5" })
                            //  }, 1000);
                        }} >
                            <img src={people_set} style={{ width: 70, height: 70, marginTop: 10, marginBottom: 10, marginLeft: -10, backgroundColor: this.state.imageBackground_color, borderRadius: 40 }} />
                        </Draggable>

                    </div>
                    <div className="col-8 boder_radius" style={{ height: 145,width:300, paddingLeft: '8%', backgroundColor: '#53dce294', marginLeft: 104, borderRadius: 20 }}>  <p style={{
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: '400',
                        textAlign: 'center',
                        paddingTop: 15, paddingLeft: 10
                    }} > Aunty Nita always hugs Tilly but she doesn’t like it. The hugs are too long and don’t make her feel happy.</p>
                    </div>

                </div>
                <br />
                <div className="row">

                    <div className="col-2"> </div>
                    <div className="col-9" style={{
                        fontSize: 14, fontWeight: 'bold', paddingTop: 6, height: 60, backgroundColor: "#FFC737", border: " 1px solid rgba(35, 31, 32, 0.46)",
                        boxSizing: "border-box", boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10
                    }}>
                        Where should Tilly place Aunty Nita on her Trust Circle?
                 </div>
                    <div className="col-1"> </div>

                </div>



                <div class={"modal fade bd-example-modal-lg " + this.state.show_con} style={{ display: this.state.display_view }} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content" style={{ backgroundColor: "rgb(247, 90, 91)", top: 200 }}>

                            <div className="row">
                                <div className="col-sm-2"> </div>
                                <div className="col-sm-10">
                                    <h4 style={{ fontWeight: 800, fontSize: 17 }}> Awesome Job! </h4>
                        You just helped Tilly learn how to listen to her inner voice. You have also added a new tool to your saefty toolbox.
                            </div>
                                <div className="col-sm-2"> </div>
                            </div>



                            <div className="row">
                                <div className="col-1" > </div>
                                <div className="col-10" onClick={() => {
                                    this.setState({ show_con: "", display_view: "none" })
                                    this.props.changeStage('Next', stage)
                                }} >
                                    <button style={{ border: '2px solid #FFFFFF', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 12 }}
                                        type="button" data-dismiss="modal" aria-label="Close" class="btn btn-warning">Get Learning Point!</button>
                                </div>
                            </div>

                            <div className="col-1" > </div>


                        </div>
                    </div>
                </div>


                <div style={{ backgroundColor: content.circles[2].color, height: window.innerWidth * 0.9, width: '90%', margin: '5%', borderRadius: 100000 }}>
                    <div className="row" style={{ height: window.innerWidth * 0.9, margin: 0 }}>
                        <div className="col-9" style={{
                            display: 'inline-grid',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                             <Droppable
                types={['fruit']}
                onDrop={this.onDrop.bind(this)} style={{zIndex:2}} >
                            <div style={{ marginTop: '1%', backgroundColor: content.circles[1].color, height: window.innerWidth * 0.9 / (1.3), width: window.innerWidth * 0.9 / (1.3), borderRadius: 100000 }}>
                                <div className="row" style={{ height: window.innerWidth * 0.9, margin: 0 }}>
                                    <div className="col-5" style={{
                                        display: 'contents',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 0,
                                        padding: 0
                                    }}>
                                          <Droppable
                types={['fruit']}
                onDrop={this.onDrop.bind(this)} style={{zIndex:3}}>
                        <ul className="Smoothie"></ul>
                                        <div style={{ marginTop: '21%', backgroundColor: content.circles[0].color, height: window.innerWidth * 0.9 / (1.5 * 1.5), width: window.innerWidth * 0.9 / (1.5 * 1.5), borderRadius: 100000 }}>
                                            <div style={{ paddingTop: '45%' }} >
                                                <div style={{ margin: "0px 10px 0px 10px" }}
                                                    onClick={() => {
                                                        //  this.setState({selectColor_1:'white',selectColor_2:"",selectColor_3:''})
                                                    }}>
                                                    {/* <span  style={{}}> {content.circles[0].name}</span> */}

                                                </div>
                                                {/* {this.state.selectColor_1.length !=0 ?  <span style={{fontSize:10,color:'white',whiteSpace:'nowrap',marginLeft:20}}> Selected {content.circles[0].name}  </span> : null } */}

                                            </div>
                                        </div>
                                        </Droppable>
                                    </div>
                                    <div className="col-1"></div>

                                    <div className="col-5" style={{ fontSize: 8, display: 'inline', marginBottom: '60%', marginLeft: "48%", marginTop: '-48%' }}>
                                        <div className="row col-12" style={{ margin: "0px 10px 4% 25px", paddingLeft: 10, whiteSpace: 'nowrap' }}
                                            onClick={() => {
                                                //this.setState({ selectColor_2 :'white',selectColor_1:'',selectColor_3:"" })
                                            }}>
                                            {/* <span style={{}}>  {content.circles[1].name}  </span> */}

                                        </div>

                                        {/* {this.state.selectColor_2.length !=0 ?  <span style={{color:'white',whiteSpace:'nowrap',marginLeft:20}}> Selected {content.circles[1].name}  </span> : null } */}


                                    </div>
                                </div>
                            </div>
                            </Droppable>
                            
                        </div>
                        <div style={{ marginTop: '47%' }} className="col-3">
                            <div style={{ width: '100%', whiteSpace: 'nowrap' }} onClick={() => {
                                //  this.setState({ selectColor_3 :'white',selectColor_1:'' ,selectColor_2:""})
                            }}>
                                {/* <span style={{}}>  {content.circles[2].name}  </span> */}
                            </div>
                            {/* {this.state.selectColor_3.length !=0 ?  <span style={{fontSize:10,color:'white'}}> Selected {content.circles[2].name}  </span> : null } */}
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-9" />
                    <div className="col-3">
                        <a onClick={() => {
                            // this.selectedView()  
                            // this.props.changeStage('Next', stage)
                            this.setState({ modelView: true, show_con: "show", display_view: "block", })

                        }} >
                            <img style={{ width: window.innerHeight / 15 }} src={nextImage} />
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}
export default DropToSelectionNew
