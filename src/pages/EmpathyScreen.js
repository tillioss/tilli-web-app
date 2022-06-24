import React from "react";
import LeftIcon from '../images/outlineBackIcon.png';
import MyConstant from '../config/MyConstant';
import graph from '../images/graph.png';

import bg_1 from '../images/bg_1.png';
import bg_2 from '../images/bg_2.png';
import bg_3 from '../images/bg_3.png';
import sidearrow from '../images/sidearrow.png';
import {connect} from 'react-redux';










  class EmpathyScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            innerPageData:false
        }

    }
    async componentDidMount()
    {
      
       

    }

return_content(pageIndex,index)
{
    const {innerPageData}=this.state;

    const {innerGroupLanguageMappingData,innnerGroupLanguageBaseData} =this.props
    if(innerGroupLanguageMappingData  && innerGroupLanguageMappingData[pageIndex]  && innerGroupLanguageMappingData[pageIndex].fieldData[index] )
    {
        return innerGroupLanguageMappingData[pageIndex].fieldData[index].value
    
    }
    
    else if(innnerGroupLanguageBaseData &&  innnerGroupLanguageBaseData[pageIndex] && innnerGroupLanguageBaseData[pageIndex].fieldData[index])
    {
        return innnerGroupLanguageBaseData[pageIndex].fieldData[index].value
    
    }
    
    else
        return ""
    

}


    render() {

const {innerPageData} =this.state
return(<React.Fragment>
    
         <div className="row mt-4 ml-0">
                <div className="col-2" onClick={() => {
if(window.location.href.match(/lego/))
{
    this.props.history.push('/'+MyConstant.keyList.projectUrl+'/lego/Parenthome')
}
else{
    this.props.history.push('/'+MyConstant.keyList.projectUrl+'/Parenthome')
}
                }}> <img src={LeftIcon} style={{ height: 50, width: 50 }} /> </div>
                <div className="col-8"> <p style={{ fontSize:27,fontFamily: 'montserrat-bold', }}>
                {this.return_content(5,1)}  </p> </div>
                <div className="col-2"> </div>
            </div>   

            <div className="row ml-0 mt-4 ">
                <div className="col-sm-1" >  </div>
                <div className="col-sm-10"> <img src={graph} style={{width :327,height:156 }} />
              <p  style={{color:"#9FA4B4",fontFamily: 'montserrat-bold', fontSize:15,marginTop:10 }}>  
              {this.return_content(5,2)  }    </p>
                 </div>
                <div className="col-sm-1"> </div>
            </div>   


            <div className="row  ml-0 mt-4">
                <div className="col-1"> 
                <img src={bg_1} style={{ width: 48, height: 48 }} />
                 </div>
                <div className="col-9" style={{paddingLeft:30}}> 
                <p style={{ fontSize: 14, fontWeight: '800', fontFamily: 'montserrat-bold',color:'#18191F',marginLeft:10,textAlign:'justify',lineHeight:1.3, }}>
                {this.return_content(5,3) }  </p>
                <p style={{ fontSize: 15, fontWeight: '500', fontFamily: 'montserrat-medium',color:'#474A57',marginLeft:10,textAlign:'justify',lineHeight:1.3,color:"#474A57"}}> 
                { this.return_content(5,4) }</p>
                 </div>
                <div className="col-1">
                <div style={{ fontSize: 11, fontWeight: '700', fontFamily: 'montserrat-medium',color:'#9FA4B4',}}> 5/10</div>    
                 </div>
                 <div className="col-1"></div>
            </div>


            <div className="row  ml-0 mt-4">
                <div className="col-1"> 
                <img src={bg_2} style={{ width: 48, height: 48 }} />
                 </div>
                <div className="col-9" style={{paddingLeft:30}}> 
                <p style={{ fontSize: 14, fontWeight: '800', fontFamily: 'montserrat-bold',color:'#18191F',marginLeft:10,textAlign:'justify',lineHeight:1.3 }}>
                {  this.return_content(5,5)}  </p>
                <p style={{ fontSize: 15, fontWeight: '500', fontFamily: 'montserrat-medium',color:'#474A57',marginLeft:10,textAlign:'justify',lineHeight:1.3,color:"#474A57"}}> 
                {  this.return_content(5,6)  }</p>
                 </div>
                <div className="col-1">
                <div style={{ fontSize: 11, fontWeight: '700', fontFamily: 'montserrat-medium',color:'#9FA4B4',}}> 6/10</div>    
                 </div>
                 <div className="col-1"></div>
            </div>


            <div className="row  ml-0 mt-4">
                <div className="col-1"> 
                <img src={bg_3} style={{ width: 48, height: 48 }} />
                 </div>
                <div className="col-9" style={{paddingLeft:30 ,}}> 
                <p style={{ fontSize: 14, fontWeight: '800', fontFamily: 'montserrat-bold',color:'#18191F',marginLeft:10,textAlign:'justify',lineHeight:1.3 }}> 
                {  this.return_content(5,7)  }  </p>
                <p style={{ fontSize: 15, fontWeight: '500', fontFamily: 'montserrat-medium',color:'#474A57',marginLeft:10,textAlign:'justify',lineHeight:1.3,color:"#474A57"}}>
                {  this.return_content(5,8)   } </p>
                 </div>
                <div className="col-1">
                <div style={{ fontSize: 11, fontWeight: '700', fontFamily: 'montserrat-medium',color:'#9FA4B4',}}> 3/10</div>    
                 </div>
                 <div className="col-1"></div>
            </div>



            <div className="row">
                    <div className="col-1"> </div>
                    <div className="col-10">
                        <button style={{ fontFamily: 'montserrat-bold',borderColor: '#FFFFF', borderRadius: 16 ,fontSize:21}} type="submit" onClick={() => {
                          
                        }} >  { this.return_content(5,9)   }   <img src={sidearrow} style={{width:6,height:12}} /> </button>
                    </div>
                    <div className="col-1"> </div>
                </div>

     
     </React.Fragment>
    )


    }


}



const mapStateToProps = (state) => {
    return {
    
      innnerGroupLanguageBaseData: state.languageReducer.innnerGroupLanguageBaseData,
      innerGroupLanguageMappingData: state.languageReducer.innerGroupLanguageMappingData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
     
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EmpathyScreen);