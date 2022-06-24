import React from 'react';
import { connect } from 'react-redux';
import QrReader from 'react-qr-reader'
import MyConstant from '../config/MyConstant';



class QrCodeScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
      scan: true,
      number:0,
      errorLogin:""
    }
  }

  handleScan = data => {
    let {number}=this.state
    if (data) {

      this.setState({
        result: data,number:number+1,scan:false
      })
    }

  }
  handleError = err => {
    console.error(err)
  }

  toggleScan() {
    this.setState({
      scan: !this.state.scan,
    })
  }
  render() {
    let { scan } = this.state;
    return (
      <div>
        {/* <button className="btn btn-success" onClick={ () => this.toggleScan() } >Scan</button> */}
        { scan ?
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ height: '100%', width: '100%' }}
          /> : null
        }
       <p> <a href={this.state.result}  > {this.state.result} </a> </p>
        <p>{this.state.errorLogin}</p>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScan);



