import React from 'react';
import DataTable from "../Component/DataTable";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
import DropDown from "../Component/DropDown";
import MyConstant from "../config/MyConstant";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import { doConnect } from '../config/Common';


class Level extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {},
            levelArray: [],
            imageList: [],
            data: [], gamingArray: {}, typeSelect: "", levelColor: '', levelName: '',
            buttonName:"Submit",
            sortOrder:''
        }
    }

    componentDidMount() {

        this.getLevels();
        this.getImages();
    }

    async getImages() {
        let postJson = { fileType:'image', sessionId: '1223' };
        let that = this;
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        this.setState({ imageList:json.filesMap })
        
    }

    async getLevels() {
        let postJson = {sessionId: '1223', levelId: ''};
        let that = this;
        let responseData = await doConnect("getGameLevels", "POST", postJson);
        let json = responseData;
        if (Object.keys(json).length > 0 && json['levelsMap'] != null && json['levelsMap'] != undefined) {
            let levelsMap = json['levelsMap'];
            that.setState({gamingArray: levelsMap})
        }
    }

    async deleteLevels(levelId) {
        let postJson = {sessionId: '1223', levelId: levelId};
        let that = this;
        let responseData = await doConnect("deleteGameLevels", "POST", postJson);
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

            this.getLevels();

        } else {
            alert(responseData.response);
        }
    }


    async createLevel() {
        const {levelName, levelColor,selectedOption,sortOrder} = this.state;
        var validLength = levelColor ? levelColor.search("#") : 0;
        if (levelName.length == 0) {
            this.setState({levelNameValidate: 'Please Enter Value'})
            return false
        } else if (validLength && (levelColor.length != 7 || levelColor.length != 4)) {
            this.setState({levelColorValidate: 'Please Enter six digit color cod with # '})
            return false
        } else {
            this.setState({levelNameValidate: ''})
        }

        if (levelColor.length == 0) {
            this.setState({levelColorValidate: 'Please Enter value'})
            return false
        } else if (validLength == 0 && levelColor.length < 4) {
            this.setState({levelColorValidate: 'Please Enter 4 Number'})
            return false
        } else {
            this.setState({levelColorValidate: ''})
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
        if(!Number(sortOrder))
        {
            this.setState({sortOrderValidate:'Please Sort Order'})
            return false
        }
        else
        {
            this.setState({sortOrderValidate: ''})
        }

        if (levelName && levelName.length != 0 && levelColor.length != 0) {
            let postJson = {name: levelName, color: levelColor, sessionId: '1223', image: this.state.selectedOption.json,sortOrder:Number(sortOrder)};
            let responseData = await doConnect("addGameLevel", "POST", postJson);

            var json = responseData;
                    var response = json.response;
                    if (response == 'Success') {
                        toast.success('Added data !', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({buttonName:'Submit',selectedOption:{},typeSelect: '', idvalue: "", levelColor:"", levelName:""})
                        this.getLevels();
                    } else {
                        alert(response);
                    }
        }
    }

    async updateLevels() {
        const {levelName, levelColor,sortOrder} = this.state;
        let validLength = levelColor ? levelColor.search("#") : 0;
        if (levelName.length == 0) {
            this.setState({levelNameValidate: 'Please Enter Value'})
            return false
        } else {
            this.setState({levelNameValidate: ''})
        }
        if (levelColor.length == 0) {
            this.setState({levelColorValidate: 'Please Enter value'})
            return false
        }
        else if (validLength && (levelColor.length != 7 || levelColor.length != 4)) {
            this.setState({levelColorValidate: 'Please Enter six digit color cod with # '})
            return false
        }else {
            this.setState({levelColorValidate: ''})
        }
        let found = this.state.levelArray.findIndex((a) =>
            a.id === this.state.idvalue
        )


        if (levelName && levelName.length != 0 && levelColor.length != 0) {

            let postJson = {levelId:this.state.idvalue,name: levelName, color: levelColor, sessionId: '1223', image: this.state.selectedOption.json,sortOrder:Number(sortOrder)};
            let responseData = await doConnect("updateGameLevel", "POST", postJson);
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
                this.setState({buttonName:'Submit',selectedOption:{},typeSelect: '', idvalue: "", levelColor:"", levelName:""})

                this.getLevels();
            } else {
                alert(responseData.response);
            }
        }


    }

    render() {

        const {buttonName}=this.state;

        const columns = [            
            {
                name: 'Order',
                selector: 'sortOrder',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Color',
                selector: 'color',
                sortable: true,
            },     
            {
                name: 'Image',
                selector: 'Button',
                sortable: true,
                cell: (row, index, column, id) => {
                    let image = row.image;
                    return <div style={{padding: 10}}><img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType} width="75" height="75"/></div>
                },

            },
            {
                name: 'Manage',
                sortable: true,
                cell: (row, index, column, id) => {
                    let image = row.image;
                    return <div style={{padding: 10}}>
                        
<button  id={row.id} class="btn btn-info"  onClick={()=>{
                             this.props.history.push('/'+MyConstant.keyList.projectUrl+'/LevelManager/'+row.id )
                          }}>Manage</button>

                          </div>
                },
            },
            {
                name: 'Edit',
                selector: 'Edit',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id}>
                        <div style={{fontWeight: 700}}></div>
                        <button data-testid={`edit-${row.id}`}  id={row.id} class="btn btn-info" onClick={(e) => {
                            console.log(this.state.gamingArray)

                             let object={};
                            object.value=this.state.gamingArray[e.target.id].id;
                            object.label=this.state.gamingArray[e.target.id].image.title;
                            object.json=this.state.gamingArray[e.target.id].image

                             let levelName = this.state.gamingArray[e.target.id].name
                             let levelColor = this.state.gamingArray[e.target.id].color
                             this.setState({buttonName:'Update',selectedOption:object,typeSelect: 'Edit', idvalue: e.target.id, levelColor, levelName})
                         }}>Edit</button>
                         </div>,
            },
            {
                name: 'Delete',
                selector: 'Delete',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id}
                        >
                        <div style={{fontWeight: 700}}></div>
                         <button  id={row.id} class="btn btn-danger"  onClick={(e) => {
                            this.deleteLevels(e.target.id)
                         }}>Delete</button>  </div>,
            }
        ];

        let data = [];
        Object.keys(this.state.gamingArray).map((ival, index) => {
            data.push(this.state.gamingArray[ival])
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
              <div className="row" style={{marginTop: 20}}>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5"><h4> Level </h4></div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <ToastContainer/>
                <div className="row" >
                    <div className="col-sm-5">
                        <div className="row item form-group" style={{marginTop: 20}}>
                            <div className="col-sm-3 text-ali-left"> Level Name</div>
                            <div className="col-sm-9">
                                <input type={'text'} placeholder={'Enter Level Name'} className={'form-control'}
                                       value={this.state.levelName} onChange={(e) => {
                                    this.setState({levelName: e.target.value})
                                }}/>
                                <span style={{color: 'red', fontSize: 12,float:"inherit",marginTop:5}}> {this.state.levelNameValidate} </span>
                            </div>
                        </div>
                        <br/>
                        <div className="row item form-group">
                            <div className="col-sm-3 text-ali-left"> Color</div>
                            <div className="col-sm-9">
                                <input type={'text'} placeholder={'Enter Color'} className={'form-control'}
                                       value={this.state.levelColor} onChange={(e) => {
                                    this.setState({levelColor: e.target.value})
                                }}/>
                                <span style={{color: 'red', fontSize: 12,float:"inherit",marginTop:5}}> {this.state.levelColorValidate} </span>
                            </div>
                        </div>
                        <br/>
                        <div className="row item form-group" style={{marginTop: 20}}>
                            <div className="col-sm-3 text-ali-left"> Sort Order</div>
                            <div className="col-sm-9">
                                <input type={'text'} placeholder={'Enter Sort Order'} className={'form-control'}
                                       value={this.state.sortOrder} onChange={(e) => {
                                    this.setState({sortOrder: e.target.value})
                                }}/>
                                <span style={{color: 'red', fontSize: 12,float:"inherit",marginTop:5}}> {this.state.sortOrderValidate} </span>
                            </div>
                        </div>
                        <br/>
                        <div className="row item form-group">
                            <div className="col-sm-3 text-ali-left"> Transparent image</div>
                            <div className="col-sm-9">
                                <DropDown
                                    selectedOption={this.state.selectedOption?.label ? this.state.selectedOption  :  {label:'Select',value:'Select' } }
                                    onChange={(e) => {
                                        this.setState({ selectedOption: e })
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

                                <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.selectedOption.json.fileName + "&id=" + this.state.selectedOption.json.fileType} width="100%" height="100%" alt="loading..."/>

                                     </React.Fragment>:null}
                            </div>
                            <div className="col-sm-4"> </div>
                        </div>
                        <br/>

                        <div className="row">
                            <div className="col-sm-5"></div>
                            <div className="col-sm-5">
                                {buttonName == 'Submit' ?
                                    <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                        this.createLevel()
                                    }}>{buttonName}
                                    </button> :
                                    <span>
                              <button type="button" className={'btn btn-danger '} onClick={() => {
                                  this.updateLevels()
                              }}>{buttonName}
                            </button>
    <button type="button" className={'btn btn-info '} onClick={() => {
        this.setState({buttonName:'Submit',selectedOption:{},typeSelect: '', idvalue: "", levelColor:"", levelName:""})

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
                            <div className="col-sm-12" style={{verticalAlign: 'center'}}>
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

export default Level;
