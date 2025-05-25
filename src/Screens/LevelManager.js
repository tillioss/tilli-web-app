import React from 'react';
import DropDown from "../Component/DropDown";
import DataTable from "../Component/DataTable";
import CloseImage from "../../src/images/close.png";
import DoubleBoxOverlapWithImage from "../Component/Themes/DoubleBoxOverlapWithImage";
import QuestionsList from "../Component/Themes/QuestionsList";
import IntroducePersons from "../Component/Themes/IntroducePersons";
import ChooseCheckboxQuestions from "../Component/Themes/ChooseCheckboxQuestions";
import CircleWithInfoAnimations from "../Component/Themes/CircleWithInfoAnimations";
import PersonWithTextAnimation from "../Component/Themes/PersonWithTextAnimation";
import AudioQuizScreen from "../Component/Themes/AudioQuizScreen";
import Success from "../Component/Themes/Success";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import {toast, ToastContainer} from "react-toastify";
import MyConstant from "../config/MyConstant";
import  downArrow  from "../../src/images/downArrow.png";
import  upArrow  from "../../src/images/upArrow.png";
import { doConnect } from '../config/Common';

const options = [
  { value: 'DoubleBoxOverlapWithImage', label: 'DoubleBoxOverlapWithImage' },
  { value: 'QuestionsList', label: 'QuestionsList' }, { value: 'ImageWithThinking', label: 'ImageWithThinking' },
  { value: 'IntroducePersons', label: 'IntroducePersons' }, { value: 'ChooseCheckboxQuestions', label: 'ChooseCheckboxQuestions' },
  { value: 'CircleWithInfoAnimations', label: 'CircleWithInfoAnimations' }, { value: 'PersonWithTextAnimation', label: 'PersonWithTextAnimation' },
  { value: 'AudioQuizScreen', label: 'AudioQuizScreen' }, { value: 'DropToSelection', label: 'DropToSelection' }, { value: 'Success', label: 'Success' }
];



const dummyOption = [
  { value: 'https://picsum.photos/200', label: 'Image_1' },
  { value: 'https://picsum.photos/id/237/200/300', label: 'Image_2' },
  { value: 'https://picsum.photos/seed/picsum/200/300', label: 'Image_3' },
  { value: 'https://picsum.photos/200/300/?blur=2', label: 'Image_4' }
]

class LevelManager extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      levelsJson: {},
      fileData:{},
      stagesObject: {}, stagesArray: [], selectedOption: null,
      datavalue: [{ "id": "62d9e896-a8a7-494a-a2d0-aa1925b7bf0a", "title": "df", "theme": "theme", "image": "" }],
      Contentdata: [{title:'',theme:'',content:{} }], Contentdatacount: [],
      SelectedValue: [], inputValue: [], ContentTextSelect: [], questions_List: [],
      levelSelect: null, levelContent: [{ "id": "bca97131-7802-406b-8ebd-b23ebf2cca5c", "name": "trust", "color": "red", "image": "", structure: {} }],
      dummyOptionSelect: [],levelSelectError:"" ,titleValidate:[],ThemeValidate:[],ImageValidate:[],
      contentText:[],contentTextValidate:[],options:[],imageView:[],displayImage:'none',enableLoader:false,
      LevelStage: [
        {
          title: 'What is trust',
          theme: 'DoubleBoxOverlapWithImage',
          content: {
            text:
              'Trust is a feeling you experience towards someone or something\n' +
              'that makes you feel safe, happy and comfortable.',
            image: '',
          },
        },
        {
          title: 'What is trust',
          theme: 'ImageWithThinking',
          content: {
            text:
              'This is Raji, she feels safe when her father lifts her into the air, that is because Raji TRUSTS her father not to let her go. .',
            image: '',
          },
        },
        {
          title: 'What is trust',
          theme: 'QuestionsList',
          content: {
            questionTitle:
              'Four questions you can ask yourself, when figuring out who you can trust:',
            questionList: [
              {
                question: 'Is this person dependable?',
                color: '#FFC737',
              },
              {
                question: 'Does this person always say the truth?',
                color: '#C4D63E',
              },
              {
                question:
                  'Will you trust this person with a secret? Are you sure they will not tell it to someone else?',
                color: '#A9F2F9',
              },
              {
                question:
                  "Are you sure this person won't do something that will make you feel sad, unsafe or angry?",
                color: '#FF5C5C',
              },
            ],
          },
        },
        {
          title: 'Trust',
          theme: 'IntroducePersons',
          content: {
            persons: [
              {
                name: 'Tilly',
                image: '',
                imageBg: '#8AC381',
                bg: '#30DEC9',
                says:
                  'She is eight years old and today you will be help her make some smart choices about who she can trust and can not trust in her life.',
              },
              {
                name: 'Sameera',
                image: '',
                imageBg: '#FFBD12',
                bg: '#FFC737',
                says:
                  "He is Tilly's best friend. They have known each other since Grade 1. Sameera often goes to Tilly to get advice or to tell a secret. Sameera is always helpful and kind to those around him.",
              },
            ],
          },
        },
        {
          title: 'Trust',
          theme: 'ChooseCheckboxQuestions',
          content: {
            questionTitle:
              'How do you think Tilly will answer these questions about Sameera?',
            checkBoxesOption: [
              'Does he change his mind often?',
              'Does he always tell the truth?',
              'Will you trust this person with a secret?',
              "Are you sure this person won't do something to make you feel sad, angry or unsafe?",
            ],
            colors: {
              checked: '#FF89BB',
              unChecked: '#FFBD12',
              text: '#000',
              box: '#00C6AE',
            },
          },
        },
        {
          title: 'TRUST CIRCLE',
          theme: 'CircleWithInfoAnimations',
          content: {
            text: [
              {
                value: 'THIS IS THE',
                style: { color: '#474A57' },
              },
              {
                value: 'TRUST CIRCLE',
                style: { color: '#E35B77' },
              },
            ],
            circles: [
              {
                name: 'HIGH TRUST',
                color: '#F4ED31',
              },
              {
                name: 'LOW TRUST',
                color: '#527FC7',
              },
              {
                name: 'NO TRUST',
                color: '#F75A5B',
              },
            ],
            image: '',
          },
        },
        {
          title: 'Tilly',
          theme: 'PersonWithTextAnimation',
          content: {
            image: '',
            text: [
              {
                value: 'How much does Tilly trust herself?',
                style: { color: '#474A57' },
              },
              {
                value: 'Test text1',
                style: {color: '#474A57', paddingTop: 10},
              },
              {
                value: 'Test text2',
                style: {color: '#474A57', paddingTop: 10},
              },
            ],
          },
        },
        {
          title: 'Tilly',
          theme: 'AudioQuizScreen',
          content: {
            feelingsDataList: [
              {
                questions: 'Can Tilli trust herself?',
                results: [],
              },
              {
                questions: 'Why do you think so?',
                results: [],
              },
              {
                questions: 'What about you? Can you trust yourself?',
                results: [],
              },
            ],
          },
        },
        {
          title: 'TRUST CIRCLE',
          theme: 'DropToSelection',
          content: {
            text: [
              {
                value: 'THIS IS THE',
                style: { color: '#474A57' },
              },
              {
                value: 'TRUST CIRCLE',
                style: { color: '#E35B77' },
              },
            ],
            circles: [
              {
                name: 'HIGH TRUST',
                color: '#F4ED31',
              },
              {
                name: 'LOW TRUST',
                color: '#527FC7',
              },
              {
                name: 'NO TRUST',
                color: '#F75A5B',
              },
            ],
            image: '',
          },
        },
        {
          title: 'Success',
          theme: 'Success',
          content: {
            title: {
              value: 'LEVEL PASSED',
              style: [{ color: '#fddc24' }],
              bColor: '#93c884',
            },
            message: {
              value:
                'The person you can trust most in the world is you! You have the power to decide who you trust and don’t trust',
              style: [{ color: '#8dbaaf' }],
              bColor: '#2b4850',
            },
          },
        },

      ]


    }
  }


  componentDidMount()
{
  this.getThemes()
  this.getLevels();
  this.getImages();
 

}
async getImages() {
    let postJson = { fileType:'image', sessionId: '1223' };
    let responseData = await doConnect("getGameFilesList", "POST", postJson);
    let json = responseData;
        this.setState({ fileData:json.filesMap })
  }

  async getLevels() {
    let postJson = {sessionId: '1223', levelId: ''};
    let that = this;
    let responseData = await doConnect("getGameLevels", "POST", postJson);
    let json = responseData;
    if (Object.keys(json).length > 0 && json['levelsMap'] != null && json['levelsMap'] != undefined) {
      let levelsMap = json['levelsMap'];
      let level_Id = this.props.match.params.levelid
      let select_Level={}
      select_Level.value=level_Id;
      select_Level.label=levelsMap[level_Id]?.name || "";
      that.setState({levelsJson: levelsMap,levelSelect:select_Level })
       this.getLevelMappingData(level_Id)

    }
  }


  async getThemes() {
    let postJson = {sessionId: '1223', themeId: ''};
    let that = this;
    let responseData = await doConnect("getThemes", "POST", postJson);
    let json = responseData;
    if (Object.keys(json).length > 0 && json['themesMap'] != null && json['themesMap'] != undefined) {
        let themesMap = json['themesMap'];
      let options=[]
        Object.keys(themesMap).forEach(value=>{
          options.push({label:themesMap[value].name, value :themesMap[value].name,json:themesMap[value] })
        })
        that.setState({options: options})
    }
    
}


async getLevelMappingData(levelId)
  {
    const {imageView}=this.state;
    console.log('levelId',levelId)
    let postJson = {levelId: levelId,sessionId: '1223'};
    let that = this;
    let responseData = await doConnect("getLevelMappingData", "POST", postJson);
    let json = responseData;
       let contentdata=responseData.response;
      if(contentdata)
      {
        JSON.parse(contentdata).map((ival,index)=>{
        
      var found_index = this.state.options.findIndex((a) =>
      a.label === ival.theme)
      imageView[index] = { json: this.state.options[found_index]?.json };
      
        })
       console.log('image data ',imageView)

        that.setState({Contentdata:JSON.parse(contentdata),imageView })
        
      }

  }


  async submit() {

    const { stagesArray, LevelStage, levelContent, levelSelect, SelectedValue,inputValue,Contentdata,
      dummyOptionSelect,titleValidate,ThemeValidate,ImageValidate,contentText,contentTextValidate } = this.state;


if(!levelSelect)
{

  this.setState({levelSelectError:"Enter Select Level" })
return false
}
else{
  this.setState({levelSelectError:"" })
}


Contentdata.map((ival,index)=>{
if(!ival.title)
{
  titleValidate[index]="Please Select Title";
  return false
}
else
{
  titleValidate[index]=""
}

if(!ival.theme)
{
  ThemeValidate[index]="Please Select Theme";
  return false
}
else
{
  ThemeValidate[index]="";
}

if(!dummyOptionSelect[index])
{

  ImageValidate[index]="Please Select Image";

}else
{
  ImageValidate[index]="";

}

// istanbul ignore file

if(ival.theme =="DoubleBoxOverlapWithImage"  || ival.theme == "ImageWithThinking" )
{

  if(ival.content.text.trim() === '')
  {
  contentTextValidate[index]="Please Enter Text";
  }else
  {
    contentTextValidate[index]="";
  }


}

if(ival.theme =="QuestionsList")
{

ival.content.questionList.map((value,index_1)=>{


  if(value.question.trim() === '')
  {
    value.qustionlist_error="Please Enter Text";
  }else
  {
     delete value.qustionlist_error
  }

  if(value.color.trim() === '')
  {
    value.qustion_color_error="Please Enter Text";
  }else
  {
     delete value.qustion_color_error
  }

})

  }



})



     levelContent[0].name = levelSelect.value
    levelContent[0].structure = Contentdata
   this.setState({enableLoader:true})
    let postJson = {levelId: levelSelect.value, stagesData: JSON.stringify(Contentdata), sessionId: '1223'};
    let responseData = await doConnect("updateLevelMapping", "POST", postJson);
    var json = responseData;
    var response = json.response;
    if (response == 'Success') {
      toast.success('', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        render: () => <div data-testid="submit-success-toast">Added data !</div>
      });
this.setState({enableLoader:false})

    } else {
      alert(response);
    }



  }

  handleChange = (e, index) => {
    const { SelectedValue, inputValue, LevelStage,Contentdata,imageView } = this.state;

    SelectedValue[index] = e;
    imageView[index]=e
    

    var found_index = LevelStage.findIndex((a) =>
      a.theme === e?.label
    )
console.log(e, index)

    if (inputValue[index])
    {
      LevelStage[found_index].title = inputValue[index]
    }

if(found_index !='-1')
{
  
  Contentdata[index].theme=e.label
  Contentdata[index].content={...LevelStage[found_index].content}

}
else
{
  Contentdata[index].theme=e?.label || ""

}

    this.setState({ selectedOption: e, SelectedValue, LevelStage,Contentdata});

  };


  titleOnchange = (e, index) => {
    const { inputValue, SelectedValue,Contentdata } = this.state;
    inputValue[index] = e;
    Contentdata[index].title=inputValue[index]
    this.setState({ inputValue,Contentdata });


  }

  addMoreContent() {

    const { Contentdatacount, Contentdata, selectedOption } = this.state;
    Contentdata.push({title:'',theme:'',content:{}})
    this.setState({ Contentdatacount, Contentdata })

  }


  removeIndex(index) {
    const { Contentdata, SelectedValue, inputValue } = this.state;

    SelectedValue[index] = '';
    inputValue[index] = ''

    let Contentdata_array = [...this.state.Contentdata]
    delete Contentdata_array[index];
    Contentdata_array = [...Contentdata_array]
    Contentdata_array = Contentdata_array.filter(function (el) {
      return el != null;
    });

    let Selected_Value = SelectedValue.filter(function (el) {
      return el != "";
    });

    let input_Value = inputValue.filter(function (el) {
      return el != "";
    });


    this.setState({ SelectedValue: Selected_Value, inputValue: input_Value, Contentdata: Contentdata_array })


  }

  getImageOption()
  {
    let imageOptions = [];
    Object.keys(this.state.fileData).map((ival, index) => {
      let image = this.state.fileData[ival];
      imageOptions.push({ value: MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType, label: image.title, json: image })
    });
    return imageOptions
  }

  return_Content_doublebox(Select, index_1) {
    const { Contentdata,LevelStage, dummyOptionSelect,ImageValidate,contentText,contentTextValidate } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === Select
    )


    let imageOptions = this.getImageOption()


 let checkindex = imageOptions.findIndex(x => x.json.id ==Contentdata[index_1].content.image.id);   
 if(checkindex && imageOptions[checkindex])
 {
  dummyOptionSelect[index_1]=imageOptions[checkindex]
 }

    return <DoubleBoxOverlapWithImage
    OptionSelect={dummyOptionSelect}
    index_1={index_1}
     Option={imageOptions}
    LevelStage={LevelStage}
    found_index={found_index}
    ImageValidate={ImageValidate}
    contentText={contentText}
    Contentdata ={Contentdata}
    contentTextValidate={contentTextValidate}
    />

  }


  return_qustioncontent(value,index_1) {
    let arrayvalue = [];

    const { LevelStage,Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let remove_undef = Contentdata[index_1].content.questionList.filter(function( element ) {
      return element !== null;
    });
    Contentdata[index_1].content.questionList=remove_undef

    return <QuestionsList
    LevelStage={LevelStage}
    found_index={found_index}
    Contentdata ={Contentdata}
    index_1={index_1}


    />

  }

  return_Content_introduce(value,index_1) {

    let arrayvalue = [];

    const { LevelStage,Contentdata,dummyOptionSelect,OptionSelect } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

 let imageOptions = this.getImageOption()



    let remove_undef = Contentdata[index_1].content.persons.filter(function( element ) {
      return element !== null;
    });
    Contentdata[index_1].content.persons=remove_undef

    return <IntroducePersons
    LevelStage={LevelStage}
    found_index={found_index}
    Contentdata={Contentdata}
    index_1={index_1}
    OptionSelect={dummyOptionSelect}
    option={imageOptions}
    />;

  }

  return_Content_choose_checkbox(value,index_1) {


    const { LevelStage,Contentdata} = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let remove_undef = Contentdata[index_1].content.checkBoxesOption.filter(function( element ) {
      return element !== null;
    });
    Contentdata[index_1].content.checkBoxesOption=remove_undef

    return <ChooseCheckboxQuestions
    found_index={found_index}
    LevelStage={LevelStage}
    index_1={index_1}
    Contentdata={Contentdata}


    />
  }


  return_content_circle(value, index_1) {

    const { LevelStage, dummyOptionSelect,Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )


    let arrayvalue = []
    let imageOptions = this.getImageOption()


 let checkindex = imageOptions.findIndex(x => x.json.id ==Contentdata[index_1].content.image.id);   
 if(checkindex && imageOptions[checkindex])
 {
  dummyOptionSelect[index_1]=imageOptions[checkindex]
 }
 let remove_undef = Contentdata[index_1].content.text.filter(function( element ) {
  return element !== null;
});
Contentdata[index_1].content.text=remove_undef


    return <CircleWithInfoAnimations
    LevelStage={LevelStage}
    optionSelect={dummyOptionSelect}
    option={imageOptions}
    index_1={index_1}
    found_index={found_index}
    Contentdata={Contentdata}
    

    />

  }

  return_content_person(value, index_1) {

    const { LevelStage, dummyOptionSelect,Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let imageOptions = this.getImageOption();



    return  <PersonWithTextAnimation
    LevelStage={LevelStage}
    found_index={found_index}
    dummyOptionSelect={dummyOptionSelect}
    option={imageOptions}
    index_1={index_1}
    Contentdata={Contentdata}
    />


  }


  return_content_audioscreen(Value,index_1) {

    const { LevelStage,Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === Value
    )


 let remove_undef = Contentdata[index_1].content.feelingsDataList.filter(function( element ) {
  return element !== null;
});
Contentdata[index_1].content.feelingsDataList=remove_undef

    return <AudioQuizScreen
    LevelStage={LevelStage}
    found_index={found_index}
    index_1={index_1}
    Contentdata={Contentdata}
    />

  }


  return_content_Success(value,index_1) {

    const { LevelStage,Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )



    return <Success
    LevelStage={LevelStage}
    found_index={found_index}
    index_1={index_1}
    Contentdata={Contentdata}

    />

  }

  indexChange(index,type) 
  {
    const {Contentdata} =this.state;

alert(type)

if(type=="Down")
{
  
  let value=[...Contentdata]

  console.log('index',index)
  console.log('Move index',index+1)
  console.log(index,"--",Contentdata[index])
  console.log(index+1,"--",Contentdata[index+1])

  value[index]=Contentdata[index+1]
  value[index+1]=Contentdata[index]
this.setState({Contentdata:value})

}

if(type=="Up")
{

  let value=[...Contentdata]

  console.log('index',index)
  console.log('Move index',index-1)
 
  value[index]=Contentdata[index-1]
  value[index-1]=Contentdata[index]
  this.setState({Contentdata:value})


}

  }


  render() {

    const { selectedOption, Contentdata, levelSelect, SelectedValue, inputValue } = this.state;

    let levelOption = [];
    Object.keys(this.state.levelsJson).map((ival, index) => {
      let levelData = this.state.levelsJson[ival];
      levelOption.push({ value: levelData.id, label: levelData.name,})
    });

    return (<React.Fragment>

<div class="container body">
  <div class="main_container">

        <SideMenu/>
      <TopMenu/>
    <div class="right_col" role="main">
      <div class="">

        <div class="clearfix"></div>
        <ToastContainer/>
        <div class="row">
          <div class="col-md-12 col-sm-12  ">
            <div class="x_panel">
              <div class="x_title">
                <h2>Plain Page</h2>
                <ul class="nav navbar-right panel_toolbox">
                  <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                  </li>
                  <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Settings 1</a>
                        <a class="dropdown-item" href="#">Settings 2</a>
                      </div>
                  </li>
                  <li><a class="close-link"><i class="fa fa-close"></i></a>
                  </li>
                </ul>
                <div class="clearfix"></div>
              </div>
              <div class="x_content">

                  <div className="row item form-group" style={{ marginTop: 20 }}>
        <div className="col-sm-1">Level</div>
        <div className="col-sm-5">
          <DropDown
            selectedOption={{...levelSelect, testid: "level-dropdown"}}
            onChange={(e) => {
              this.setState({ levelSelect: e })
              this.getLevelMappingData(e?.value || "")
            }}
            options={levelOption}
          />

          <span style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}> {this.state.levelSelectError}</span>
        </div>
        <div className="col-sm-6"> </div>
      </div>



      <br />
      {Contentdata.map((val, index) => {

        return (<React.Fragment>

          <div class="container">
            <div class="card">
              <div class="card-body">

                <div className="row item form-group" style={{ marginBottom: 10 }}>
                  <div className="col-sm-1 text-ali-left">  <h4> Stage {index + 1} </h4>  </div>
                  <div className="col-sm-6"></div>
                  <div className="col-sm-3"> </div>
                   
                  <div className="col-sm-2">
                    
                                 
{ index == '0' && Contentdata.length-1 != 0 ? 
<React.Fragment>
<span onClick={()=>{ this.indexChange(index,"Down") }} > <img src={downArrow} style={{width:30,height:30}}/>  </span>
</React.Fragment>
: Contentdata.length-1 !=0 && Contentdata.length-1==index ?
<React.Fragment>
<span onClick={()=>{ this.indexChange(index,"Up") }}> <img src={upArrow} style={{width:30,height:30}}/>  </span>
</React.Fragment>
: Contentdata.length-1 != 0 ? <React.Fragment>
<span onClick={()=>{ this.indexChange(index,"Up") }}> <img src={upArrow} style={{width:30,height:30}}/>   </span>
<span onClick={()=>{ this.indexChange(index,"Down") }}> <img src={downArrow} style={{width:30,height:30}}/>  </span>
</React.Fragment> 
: null

}
                  <span> <img src={CloseImage} style={{ width: 30, height: 30 }} onClick={() => {
                    this.removeIndex(index)
                  }} /> </span> </div>
                </div>

                <div className="row item form-group">
                  <div className="col-sm-1 text-ali-left"> Title </div>
                  <div className="col-sm-5"> 
                  <input type={'text'}  className={'form-control'} value={Contentdata[index].title}  placeholder={'Enter Title'} style={{ width: '100%' }} 
                    onChange={(e) => { this.titleOnchange(e.target.value, index) }} />
                      <span data-testid={`validation-title-${index}`} style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{this.state.titleValidate[index]}</span>
                     </div>

                  <div className="col-sm-6"> </div>
                </div>

                <br />

                <div className="row item form-group">
                  <div className="col-sm-1 text-ali-left">Theme </div>
                  <div className="col-sm-5">
                    <DropDown
                      selectedOption={{...(Contentdata[index].theme == Contentdata[index].theme ?  {label:Contentdata[index].theme,value:Contentdata[index].theme}  :  !SelectedValue[index] ? {label:"Select",value:"Select"}  :  SelectedValue[index]), testid: `theme-dropdown-${index}`}}
                      onChange={(e) => this.handleChange(e, index)}
                      options={this.state.options}
                    />
                    <span data-testid={`validation-theme-${index}`} style={{color:'red',fontSize:12,float:'inherit',marginTop:10}}>{this.state.ThemeValidate[index]}</span>
                  </div>
                  <div className="col-sm-2">

{this.state.imageView[index] ?
<img data-testid={`thumbnail-image-${index}`} style={{ width: '100%', height: 100 }} 
src={MyConstant.keyList.apiURL + "vp?action=module&key=" + (this.state.imageView[index].json?.image.fileName || "") + "&id=" + (this.state.imageView[index].json?.image.fileType || "")} 

alt={'No Image'} class="img-responsive" onClick={()=>{
  this.setState({imageBigView:this.state.imageView[index],displayImage:'block' })
}} />
: null}

                   </div>
                  <div className="col-sm-4"> </div>
                </div>

                {Contentdata[index].theme  ?

                  <div className="row item form-group" style={{ marginTop: 30, marginBottom: 0 }}>

                    <div className="col-sm-2"></div>
                    <div className="col-sm-5">
                      <h4 data-testid="form-generator">Form Generator</h4>
                    </div>

                    <div className="col-sm-6"></div>


                  </div>
                  : null}

                {Contentdata[index] && Contentdata[index].theme  == "DoubleBoxOverlapWithImage" ?
                  this.return_Content_doublebox(Contentdata[index].theme, index)
                  : null}

                {Contentdata[index] && Contentdata[index].theme == "ImageWithThinking" ?
                  this.return_Content_doublebox(Contentdata[index].theme,index)
                  :
                  null}


                {Contentdata[index] && Contentdata[index].theme == "QuestionsList" ?

                  <div className="row item form-group">
                    <div className="col-sm-10">
                      <div className="row item form-group" style={{ marginTop: 20 }}> 
                      {this.return_qustioncontent(Contentdata[index].theme,index)}  </div>
                    </div>

                    <div className="col-sm-1">
                       <div className="row">
                       <button type="button" class="btn btn-primary active" onClick={() => {
                        const { LevelStage,Contentdata } = this.state;
                         
                        Contentdata[index].content.questionList.push({ question: '', color: '' })
                        this.setState({ LevelStage })
                        console.log(LevelStage)

                      }} >Add Qustion</button>
                         </div>

                    </div>

                  </div>
                  : null}


                {Contentdata[index] && Contentdata[index].theme == "IntroducePersons" ?
                  <div className="row item form-group">
                    <div className="col-sm-10">
                      <div className="row item form-group">

                        {this.return_Content_introduce(Contentdata[index].theme,index)}

                      </div>

                    </div>

                    <div className="col-sm-2">
                      <button type="button" class="btn btn-primary active" onClick={() => {
                        const { LevelStage } = this.state;
                       
                        Contentdata[index].content.persons.push({ bg: "", imageBg: '', name: '', says: "", image: '', })
                        this.setState({ LevelStage,Contentdata })
                      }} >Add</button>


                    </div>

                  </div>
                  :
                  null}

                {Contentdata[index] && Contentdata[index].theme == "ChooseCheckboxQuestions" ?

                  <div className="row" style={{marginTop:15}}>
                    <div className="col-sm-1"><h4>Setting</h4></div>
                    <div className="col-sm-10">
                    {this.return_Content_choose_checkbox(Contentdata[index].theme,index)}
                    </div>

                  </div>

                  : null
                }


                {Contentdata[index] && Contentdata[index].theme == "CircleWithInfoAnimations" ?
                  <div className="row ">
                    {this.return_content_circle(Contentdata[index].theme, index)}
                  </div>
                  : null
                }


                {Contentdata[index] && Contentdata[index].theme == "PersonWithTextAnimation" ?
                  <div className="row item form-group">
                    {this.return_content_person(Contentdata[index].theme, index)}
                  </div>
                  : null
                }

                {Contentdata[index] && Contentdata[index].theme == "AudioQuizScreen" ?
                  <div className="row item form-group">
                    {this.return_content_audioscreen(Contentdata[index].theme,index)}
                  </div>
                  : null
                }


                {Contentdata[index] && Contentdata[index].theme == "DropToSelection" ?
                  <div className="row item form-group">
                    {this.return_content_circle(Contentdata[index].theme, index)}
                  </div>
                  : null
                }



                {Contentdata[index] && Contentdata[index].theme == "Success" ?
                  <div className="row item form-group">
                    {this.return_content_Success(Contentdata[index].theme,index)}
                  </div>
                  : null
                }


              </div>
            </div>
          </div>



          <br />

        </React.Fragment>)
      })}

      <br />



      <div className="row item form-group">
        <div className="col-sm-2">  </div>

        <div className="col-sm-3">
          <button type="button" class="btn btn-primary active" disabled={this.state.enableLoader} onClick={(e) => { this.submit() }} >
          {this.state.enableLoader ? <i class="fa fa-spinner fa-spin"></i> : null} Submit</button>
        </div>

        <div className="col-sm-3">
          <button type="button" class="btn btn-primary active" style={{ backgroundColor: '#FF4500', borderColor: '#FF4500' }} onClick={(e) => { this.addMoreContent() }} >Add New Stage </button>
        </div>

        <div className="col-sm-4"> </div>
      </div>


 <div id="myModal" class="modal_image" style={{display:this.state.displayImage }} >
  <span class="close" onClick={()=>{
      this.setState({displayImage:"none"})
  }}  >&times;</span>
  {this.state.imageBigView  ?

  <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + (this.state.imageBigView.json?.image.fileName || "") + "&id=" + (this.state.imageBigView.json?.image.fileType || "")} class="modal-content_image" id="img01"/>

  : null}

  <div id="caption"></div>
</div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="pull-right">
      </div>
      <div class="clearfix"></div>
    </footer>
  </div>
</div>



    </React.Fragment>
    )


  }


}

export default LevelManager;
