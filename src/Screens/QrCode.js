import React from 'react';
import { connect } from 'react-redux';
import logos from "../../src/images/logos.png";


var QRCode = require('qrcode.react');

class QrCode extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      deviceWidth: window.innerWidth
    }
  }

  componentDidMount() {

    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => this.setState({
    deviceWidth: window.innerWidth,
  });

  render() {
    let { deviceWidth } = this.state
    
    // var baseUrl = "http://192.168.43.110:3001"
    // let detailsUser = baseUrl+"/" + MyConstant.keyList.projectUrl+ "/demouserlogin?sessionId="+uid
    let detailsUser="https://bit.ly/tilli-play-manage"

    return (
      <div>

        <div className={deviceWidth > 500 ? "row mx-0 pt-3 mb-2 mt-5" : "row mx-0 pt-3 mb-2 mt-3"} >
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <img style={{ width: 150, height: 150 }} src={logos} alt={""}/>
          </div>
          <div className="col-sm-2"> </div>
        </div>

        <div className="row mx-0 mt-4 mb-3 ">
          <div className="col-sm-3 "> </div>
          <div className="col-sm-6 col-12 col-xs-12">
            <QRCode value={detailsUser} size={310} bgColor={"rgb(0, 198, 174)"} />
          </div>
          <div className="col-sm-3"> </div>
        </div>


        <div className="row mx-0 mt-2" >
          <div className="col-sm-3 col-1"> </div>
          <div className="col-sm-7 col-10 col-xs-12">
            <p className="mt-3" style={{ textAlign: "start", }} >
              1.Open QR Code Scanner on your phone
                  </p>
            <p className="mt-3" style={{ textAlign: "start", }} >
              2.Point your phone to this screen to capture the code
                    </p>
          </div>
          <div className="col-sm-2"> </div>
        </div>

      </div>);
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
export default connect(mapStateToProps, mapDispatchToProps)(QrCode);



