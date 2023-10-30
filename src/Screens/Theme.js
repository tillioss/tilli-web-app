import React from 'react';
import DataTable from 'react-data-table-component';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import DropDown from "../Component/DropDown";
import MyConstant from "../config/MyConstant";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import { doConnect } from '../config/Common';

class Theme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {},
            imageList: [],
            themeValue: [],
            data: [],
            typeSelect: "",
            themeName: '',
            themesList: {},
            displayImage:'none',submitButtton:'Submit'
        }
    }

    componentDidMount() {
       
        this.getThemes();
        this.getImages();
    }

    async getImages() {
        let postJson = { fileType:'image', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        this.setState({ imageList:json.filesMap })
        
    }

    async deleteThemes(themeId) {
        let postJson = {sessionId: '1223', themeId: themeId};
        let that = this;
        let responseData = await doConnect("deleteThemes", "POST", postJson);
        if (responseData.response == 'Success') {
            toast.success(' Data deleted !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            this.getThemes();

        } else {
            alert(responseData.response);
        }
        
    }

    async getThemes() {
        let postJson = {sessionId: '1223', themeId: ''};
        let that = this;
        let responseData = await doConnect("getThemes", "POST", postJson);
        let json = responseData;
        if (Object.keys(json).length > 0 && json['themesMap'] != null && json['themesMap'] != undefined) {
            let themesMap = json['themesMap'];
            that.setState({themesList: themesMap})
        }
    }

    async submitFunction() {
        const {themeName,selectedOption} = this.state;

        if (themeName.length == 0) {
            this.setState({themeNameValidate: 'Please Enter Value'})
            return false
        } else {
            this.setState({themeNameValidate: ''})
        }
        if(!selectedOption.label)
        {
            this.setState({levelImageValidate:'Please Choose Image'})
            return false
        }
        else
        {
            this.setState({levelImageValidate: ''})
        }

        if (themeName && themeName.length != 0) {
            let postJson = { name: themeName, sessionId: '1223', image: this.state.selectedOption.json };
            let responseData = await doConnect("addTheme", "POST", postJson);
            if (responseData.response == 'Success') {
                toast.success('Added data !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                this.getThemes();

            } else {
                alert(responseData.response);
            }
        }
    }

    async UpdateFunction() {
        const {themeName} = this.state;

        if (themeName.length == 0) {
            this.setState({themeNameValidate: 'Please Enter Value'})
            return false
        } else {

            this.setState({themeNameValidate: ''})
        }
        let found = this.state.themeValue.findIndex((a) =>
            a.id === this.state.idvalue
        );

        console.log('Previous data=>',this.state.selectedOption)
        let postJson = { themeId: this.state.idvalue,name: themeName , image: this.state.selectedOption.json,sessionId: '1223' };
        console.log('postJson==>',postJson)
        let responseData = await doConnect("updateTheme", "POST", postJson);
        if (responseData.response == 'Success') {
            toast.success('Updated data !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.getThemes();
        } else {
            alert(responseData.response);
        }

    }

    render() {

        const {displayImage,submitButtton}=this.state;

        const columns = [
            {
                name: 'name',
                selector: 'name',
                sortable: true,
            },

            {
                name: 'Image',
                selector: 'Button',
                sortable: true,
                cell: (row, index, column, id) =>
                {
                    let image = row.image;
                    return <div style={{padding: 10}}><img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType} width="75" height="75" onClick={async()=>{
                        
                    await this.setState({imageView:{json:row.image},displayImage:"block"})
                       
                    }}/></div>
                },

            },
            {
                name: 'Edit',
                selector: 'Edit',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id}                       >
                        <div style={{fontWeight: 700}}></div>
                        <button  id={row.id} class="btn btn-info"  onClick={(e) => {
                             console.log('e', e.target.id)
                             var found = Object.keys(this.state.themesList).findIndex((a) =>
                             this.state.themesList[e.target.id] === e.target.id
                             )

                            let object={};
                            object.value=this.state.themesList[e.target.id].id;
                            object.label=this.state.themesList[e.target.id].image.title;
                            object.json=this.state.themesList[e.target.id].image

                             let themeName = this.state.themesList[e.target.id].name

                             this.setState({selectedOption:object,typeSelect: 'Edit', idvalue: e.target.id, themeName,submitButtton:'Update'})
                         }}>Edit</button> 
                          </div>,
            },
            {
                name: 'Delete',
                selector: 'Delete',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id} >
                        <div style={{fontWeight: 700}}></div>
                        <button  id={row.id} class="btn btn-danger"  onClick={(e) => {
                            this.deleteThemes(e.target.id)
                         }}>Delete</button>
                        </div>,
            }

        ];

        let data = [];
        Object.keys(this.state.themesList).map((ival, index) => {
            data.push(this.state.themesList[ival])
        });

        let options = [];
        Object.keys(this.state.imageList).map((ival, index) => {
            let image = this.state.imageList[ival];
            options.push({ value: image.id, label: image.title, json: image })
        });

        return (
            <React.Fragment>

<div class="container body">
  <div class="main_container">

        <SideMenu/>

      <TopMenu/>
    <div class="right_col" role="main">
      <div class="">

        <div class="clearfix"></div>

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

                  <div className="row item form-group" style={{marginTop: 20}}>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5"><h4> Theme </h4></div>
                    <div className="col-sm-4">

                    </div>
                </div>

                <ToastContainer/>

                <div className="row " style={{marginTop: 20}}>
                    <div className="col-sm-5">


                        <div className="row item form-group" style={{marginTop: 20}}>

                            <div className="col-sm-3"> Theme Name</div>
                            <div className="col-sm-9">
                                <input type={'text'} placeholder={'Enter Theme'} className={'form-control'}
                                       value={this.state.themeName} onChange={(e) => {
                                    this.setState({themeName: e.target.value})
                                }}/>
                                <span style={{color: 'red', fontSize: 12,float:'inherit',marginTop:5}}> {this.state.themeNameValidate} </span>
                            </div>
                        </div>
                        <br/>
                        <div className="row item form-group">
                            <div className="col-sm-3 text-ali-left"> Transparent image</div>
                            <div className="col-sm-9">
                                <DropDown
                                    selectedOption={this.state.selectedOption.label ? this.state.selectedOption : {label:"Select",value:"Select"}}
                                    onChange={(e) => {
                                        this.setState({ selectedOption: e,imageView:e })
                                    }}
                                    options={options}
                                />
                                   <span style={{color: 'red', fontSize: 12,float:'inherit',marginTop:5}}> {this.state.levelImageValidate} </span>
                            </div>
                        </div>
                        <br/>
                        <div className="row item form-group">
                            <div className="col-sm-4"> </div>
                            <div className="col-sm-4">
                                {this.state.selectedOption.json ? <React.Fragment>

                                <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.selectedOption.json.fileName + "&id=" + this.state.selectedOption.json.fileType} width="100%" height="100%" alt="loading..."
                                onClick={()=>{
                                    this.setState({displayImage:"block"})
                                }}/>

                                     </React.Fragment>:null}
                            </div>
                            <div className="col-sm-4"> </div>
                        </div>
                        <br/>
                        <div className="row item form-group">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-7">
                              {submitButtton =='Submit' ?
                              <button type="button" class={ 'btn btn-primary btn-block'}  onClick={() => {
                                this.submitFunction()
                            }}>{submitButtton}
                            </button>
                              :
<span>
                              <button type="button" class={'btn btn-danger '}  onClick={() => {
                                this.UpdateFunction()
                            }}>{submitButtton}
                            </button>
    <button type="button" className={'btn btn-info '} onClick={() => {
        this.setState({selectedOption:{},typeSelect: '', idvalue:"", themeName:'',submitButtton:'Submit'})
    }}>Add new
    </button>
</span>
                             }

                            </div>
                            <div className="col-sm-1"></div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="row">
                            <div className="col-sm-12">
                            { data.length !=0 ? 
                                <DataTable
                                title=""
                                columns={columns}
                                data={data}
                            />
                              :   
                              <React.Fragment>
                                 <div className="row">
                                <div className="col-sm-4"> </div>
                                <div className="col-sm-4"> 
                                    <div class="loader"></div> 
                                </div>
                                <div className="col-sm-4"> </div>
                                </div>
                              </React.Fragment> }
                            </div>
                        </div>
                    </div>
                </div>



<div id="myModal" class="modal_image" style={{display:displayImage }} >
  <span class="close" onClick={()=>{
      this.setState({displayImage:"none"})
  }}  >&times;</span>
  {this.state.imageView  ?

  <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView.json.fileName + "&id=" + this.state.imageView.json.fileType} class="modal-content_image" id="img01"/>

  : null}

  <div id="caption">  </div>
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

export default Theme;
