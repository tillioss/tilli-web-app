import React from 'react';
import { connect } from 'react-redux';
import { doConnect } from '../config/Common';
import MyConstant from '../config/MyConstant';



class DemoUserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
      getResponce: true,
      number: 1,
      errorLogin: ""
    }
  }
  async componentDidMount() {

    let { number } = this.state


    if (number === 1) {
      //let postJson = { loginId: data.split(":::")[0], password: data.split(":::")[1], sessionId: '1223' };
      let postJson = { sessionId: '1223' };
      console.log("postJson", postJson)
      let responseData = await doConnect("createDemoUser", "POST", postJson);
      var json = responseData;
      var response1 = json.response;
      console.log(responseData)
      if (response1 === 'Success') {
        if (json.id !== '') {
          this.setState({ getResponce: false })
          localStorage.setItem("nameOfChild", json.name);
          localStorage.setItem("loggedUserId", json.id);
          this.props.history.push('/' + MyConstant.keyList.projectUrl + '/lego/home/')
        }
      } else {
        this.setState({ errorLogin: 'Invalid Login Credential!' });
      }
    }

    this.setState({
      number: number + 1
    })





  }

  render() {
    let { getResponce } = this.state;
    return (
      <div>
        {getResponce ? <>

          <div className="row">
            <div className="col-sm-4 col-4"></div>
            <div className="col-sm-4 col-4 col-xs-12 ">
              <div class="loader"></div>
            </div>
            <div className="col-sm-4 col-4 "></div>
          </div>
        </> : ""}


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
export default connect(mapStateToProps, mapDispatchToProps)(DemoUserLogin);



