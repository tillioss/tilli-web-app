import React from "react";
import nextPng from '../../../images/next.png';

class Success extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        console.log(this.props.data.content)


    }

    render() {

        const {stage}=this.props;
        let data = this.props.data.content



        return (<React.Fragment>

            <div className="row ml-0" style={{
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: data.title.bColor,height:180
            }}
            >
                <div className="col-2" > </div>
                <div className="col-8" style={{ marginTop: 20, marginBottom: 20 }} >
                    <h4 style={data.title.style[0]}> {data.title.value}</h4>
                </div>
                <div className="col-2" > </div>
            </div>

            <div className="row ml-0" style={{
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: data.message.bColor,
                fontFamily: 'montserrat-extrabold',height:300
            }}
            >
                <div className="col-2" > </div>
                <div className="col-8" style={{ marginTop: 20 }} >
                    <h4 style={data.message.style[0]}> {data.message.value}</h4>
                </div>
                <div className="col-2" > </div>
            </div>


            <div className="row ml-0"  onClick={()=>{
                 this.props.changeStage('Next', stage)
                 //this.props.history.push('/'+MyConstant.keyList.projectUrl+'/home/')
            }}>
               
                <img   src={nextPng}  style={{width: '100%', height: '100%'}} />
                 
            </div>



        </React.Fragment>)

    }

}



export default Success
