import React from 'react';
import LillyImg from '../images/Lilly1.png';
import atomImg from '../images/noun_atom.png';
import heartImg from '../images/noun_Heart.png';
import winImg from '../images/noun_win.png';
import MyConstant from "../config/MyConstant";
import { doConnect } from '../config/Common';


class Dashbord_1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bodydata: [], progressingLevel: 0
    }
  }


  componentDidMount() {
    this.getLevels();
    this.getGameStatus()
  }


  async getGameStatus() {


    let postJson = { sessionId: '1223', userId: localStorage.getItem("loggedUserId")  };
    let responseData = await doConnect("getUserGameStatus", "POST", postJson);
        let json = responseData;
        if (json.response == null) {
          this.setState({ progressingLevel: 0 })
        }
        else {
          this.setState({ progressingLevel: JSON.parse(responseData.response).level })
        }

  }

  getLevels() {
    let postJson = { sessionId: '1223', levelId: '' };
    let that = this;
    let responseData = await doConnect("getGameLevels", "POST", postJson);
        let json = responseData;
        if (
          Object.keys(json).length > 0 &&
          json.levelsMap != null &&
          json.levelsMap != undefined
        ) {
          let levelsMap = json.levelsMap;
          let levelsDataList = [];
          if (Object.keys(levelsMap).length > 0) {
            Object.keys(levelsMap).forEach((keys) => {
              levelsDataList.push(levelsMap[keys]);
            });
          }
          levelsDataList.sort((a, b) =>
            a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0,
          );
          that.setState({ bodydata: levelsDataList });
        }
  }


  render() {


    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8"> </div>
          <div className="col-2"></div>
        </div>


        <div className="row" >

          <div className="col-6">
            <span style={{
              position: 'absolute',
              width: 238,
              height: 227,
              backgroundColor: '#00C6AE',
              borderRadius: 118,

            }}>
              <img src={LillyImg} style={{ width: '100%' }} />
            </span>
          </div>
          <div className="col-6"></div>
        </div>


        <div className="row">
          <div className="col-12" style={{
            position: 'absolute',
            width: '100%',
            height: 120,
            left: 0,
            top: 324,
            backgroundColor: '#18191F',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <p style={{ color: "white", marginTop: 25 }}> <h4> Hi there ! </h4> </p>
            <p style={{ color: "white" }}> @nima </p>

          </div>

        </div>


        <div className="row" style={{ marginTop: 450 }} >
          <div className="col-12" style={{

            background: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#000000',
            borderRadius: 20,
            marginHorizontal: 15,
            borderStyle: 'solid',marginLeft:15

          }}>

            <span className="row">

              <span className="col-2" style={{ marginTop: 15 }}> <img src={atomImg} /> </span>
              <span className="col-1" style={{
                color: '#18191F', fontSize: 27, fontFamily: 'montserrat-bold', fontWeight: '800',
                justifyContent: 'center',
                alignSelf: 'center',
              }}> 276 <p style={{ fontSize: 15 }}> Points </p> </span>

              <span className="col-2" style={{ marginTop: 15, marginLeft: 25 }} > <img src={heartImg} /> </span>

              <span className="col-1" style={{
                color: '#18191F', fontSize: 27, fontFamily: 'montserrat-bold', fontWeight: '800',
                justifyContent: 'center',
                alignSelf: 'center',
              }}> 35 <p style={{ fontSize: 15 }}> Fellings Tool </p> </span>


              <span className="col-2" style={{ marginTop: 15, marginLeft: 25 }} > <img src={winImg} /> </span>

              <span className="col-1" style={{
                color: '#18191F', fontSize: 27, fontFamily: 'montserrat-bold', fontWeight: '800',

              }}>  {this.state.progressingLevel + 1} <p style={{ fontSize: 15 }}>Level </p> </span>

            </span>

          </div>


        </div>


        <div className="row" style={{ marginTop: 30 }} >
          <div className="col-1"> </div>
          <div className="col-10" style={{
            flexDirection: 'row',
            marginTop: 0,
            marginBottom: 20,
            height: "100%",
            backgroundColor: '#FFFFFF',
            borderWidth: 4,
            borderColor: '#000000',
            borderRadius: 26,
            marginHorizontal: 15,
            borderStyle: 'solid',
          }}>
            <div className="row">


              {this.state.bodydata.map((ival, index) => {

                if (index == this.state.progressingLevel) {
                  return (<div className="col-3" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    backgroundColor: '#00C6AE',
                    borderWidth: 2,
                    borderColor: '#00C6AE', paddingTop: 6, width: '100%', whiteSpace: 'nowrap'
                  }} > level{index + 1}</div>)
                }
                else {

                  return (<div className="col-3" style={{ paddingTop: 6, width: '100%' }} > level{index + 1}</div>)
                }

              })}

            </div>

          </div>
          <div className="col-1"> </div>

        </div>

        <div className="row">


          {Object.keys(this.state.bodydata).map((val, index) => {
            let image = this.state.bodydata[val].image
            return (
              <React.Fragment>
                <div className="col-1"> </div>
                <div className="col-4" style={{
                  backgroundColor: this.state.bodydata[val].color,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: '#18191F',
                  width: 150,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center', borderStyle: 'solid',
                  margin: '10px 0px  30px 0px', paddingTop: 27, position: "sticky"
                }} onClick={() => {

                  this.props.props.history.push('/' + MyConstant.keyList.projectUrl + '/module/' + this.state.bodydata[val].id + '/' + index+'/'+this.state.progressingLevel)
                }} >

                  {index > this.state.progressingLevel ?
                    <React.Fragment>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        opacity: 0.8,
                        backgroundColor: 'black',
                        width: 150,
                        height: 150,
                        zIndex: 2,
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center', width: '100%'
                      }}> <i class="fa fa-lock" style={{ fontSize: 60, marginTop: 43 }} aria-hidden="true"></i>
                      </div>
                    </React.Fragment>
                    : null}

                  <img src={MyConstant.keyList.apiURL +
                    'vp?action=module&key=' +
                    image.fileName +
                    '&id=' +
                    image.fileType} />


                  <div style={{ marginTop: 60 }}> {this.state.bodydata[val].name}</div>

                </div>
                <div className="col-1"> </div>

              </React.Fragment>
            )

          })}


        </div>



      </React.Fragment>

    );

  }

}

export default Dashbord_1;
