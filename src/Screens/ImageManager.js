import React from 'react';
import DropDown from "../Component/DropDown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import {
    doConnect,
    doFileConnect
} from '../config/Common';
import DataTable from "../Component/DataTable";
import MyConstant from "../config/MyConstant";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';


const fileTypeOption = [{ value: 'image', label: 'Image' }, {
    value: 'video',
    label: 'Video'
}, { value: 'audio', label: 'Audio' },
{ value: 'gif', label: 'Gif' },

]

class ImageManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            fileData: {},
            actionType: 'add',
            editId: '',
            editTitle: '',
            title: '', enableLoader: false,displayImage:'none'
        }
    }
    componentDidMount() {


        this.getImages()
    }
    async getImages() {
        let postJson = { fileType: '', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        var json = responseData;

        this.setState({ fileData: json.filesMap })
    }

    async submitFunction() {

        const { selectedOption, title } = this.state;
        //console.log(selectedOption ,title,this.state.fileObj )

        if (title.trim() == "") {
            this.setState({ titleValidatation: 'Please Enter Title ' })
            return false

        }
        else {
            this.setState({ titleValidatation: '' })
        }


        if (!selectedOption) {
            this.setState({ selectValidatation: 'Please Select Option ' })
            return false

        }
        else {
            this.setState({ selectValidatation: '' })
        }

        if (!this.state.fileObj) {
            this.setState({ imageValidatation: 'Please Chose Image ' })
            return false
        }
        else {
            this.setState({ imageValidatation: '' })
        }

        var filename = this.state.fileObj.fileName

        var Extension = filename.split(".").pop();

        let extension_Type_Image = ['png', 'jpg', 'jpeg', 'bmp']
        //  console.log('checking',extension_Type_Image.includes(Extension))


        if (this.state.selectedOption.value == "image") {
            if (!extension_Type_Image.includes(Extension)) {

                this.setState({ imageValidatation: 'Please Choose Image Format ' })
                return false
            }

        }

        let extension_Type_Video = ['mp4'];

        if (this.state.selectedOption.value == 'video') {
            if (!extension_Type_Video.includes(Extension)) {

                this.setState({ imageValidatation: 'Please Choose Video Format ' })
                return false
            }

        }

        let extension_Type_Gif = ["gif"];

        if (this.state.selectedOption.value == 'gif') {
            if (!extension_Type_Gif.includes(Extension)) {

                this.setState({ imageValidatation: 'Please Choose Gif Format ' })
                return false
            }

        }

        let extension_Type_Audio = ['mp3'];

        if (this.state.selectedOption.value == 'audio') {
            if (!extension_Type_Audio.includes(Extension)) {

                this.setState({ imageValidatation: 'Please Choose audio Format ' })
                return false
            }

        }


        doFileConnect(this.state.fileObj)


        let postJson = { title: this.state.title, fileName: this.state.fileObj.fileName, fileType: this.state.selectedOption.value, sessionId: '1223' };

        var that = this;
        this.setState({ enableLoader: true })
        let responseData = await doConnect("addGameFile", "POST", postJson);

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
                    that.setState({ title: '', fileObj: {}, fileType: "", enableLoader: false })

                    that.getImages()

                } else {
                    alert(response);
                }




        /*
                let ImageFieldPost={
                    levelid:this.state.selectedOption.value,
                    docsid:this.state.selectedOption.value,
                    fileName:this.state.FileName,
                    fileType:this.state.fileType
                }
                console.log(ImageFieldPost)
        
                this.setState({ImageFieldPost})*/
        //alert(1)
    }
    async editFunction() {

        let postJson = { fileId: this.state.editId, title: this.state.editTitle, fileName: "", fileType: "", sessionId: '1223' };

        var that = this;
        let responseData = await doConnect("updateGameFile", "POST", postJson);
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
                    that.setState({ editTitle: '', actionType: 'add' })

                    that.getImages()

                } else {
                    alert(response);
                }


    }
    async deleteGameFile(fileId) {
        let postJson = { sessionId: '1223', fileId: fileId };
        let responseData = await doConnect("deleteGameFile", "POST", postJson);
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

            this.getImages();

        } else {
            alert(responseData.response);
        }

    }

    render() {
        const { selectedOption } = this.state


        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'type',
                selector: 'fileType',
                sortable: true,
            },
            {
                name: 'file',
                selector: 'file',
                sortable: true,
                cell: (row, index, column, id) =>

                    <React.Fragment>
                        <div id={row.id}>
                            {row.fileType == "image" || row.fileType == "gif" ?
                                <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + row.fileName + "&id=" + row.fileType} width="75" height="75" alt="loading..." 
                                onClick={async()=>{
                                   
                                   await this.setState({imageView:row,displayImage:"block" })
                                  
                                }}/>
                                :
                                row.fileType == "video" ?
                                    <React.Fragment>
                                        <video width="100" height="100" controls>
                                            <source src={MyConstant.keyList.apiURL + "vp?action=module&key=" + row.fileName + "&id=" + row.fileType} type="video/mp4" />
                                            <source src={MyConstant.keyList.apiURL + "vp?action=module&key=" + row.fileName + "&id=" + row.fileType} type="video/ogg" />
                    Your browser does not support the video tag.
                    </video>
                                    </React.Fragment>

                                    :
                                    <React.Fragment>
                                        <audio width="100" height="100" controls>
                                            <source src={MyConstant.keyList.apiURL + "vp?action=module&key=" + row.fileName + "&id=" + row.fileType} type="audio/ogg" />
                                            <source src={MyConstant.keyList.apiURL + "vp?action=module&key=" + row.fileName + "&id=" + row.fileType} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                                    </React.Fragment>

                            }

                        </div>

                    </React.Fragment>
                ,
            },
            {
                name: 'Edit',
                selector: 'Edit',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id} data-toggle="modal" data-target="#myModal">
                        <button id={row.id} class="btn btn-danger" onClick={(e) => {
                            this.setState({ editId: row.id, editTitle: row.title, actionType: 'edit' })
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
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={row.id} class="btn btn-danger" onClick={(e) => {
                            if (window.confirm('Delete the item?')) { this.deleteGameFile(row.id) }
                        }
                        }>Delete</button>  </div>,
            }
        ];

        let data = [];
        Object.keys(this.state.fileData).map((ival, index) => {
            data.push(this.state.fileData[ival])
        })

        return (
            <React.Fragment>

                <div class="container body">
                    <div class="main_container">

                        {/* <!-- Side Menu--> */}
                        <SideMenu />
                        {/* <!-- Side Menu --> */}
                        {/* <!-- top navigation --> */}
                        <TopMenu />
                        {/* <!-- top navigation --> */}

                        {/* <!-- page content --> */}
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
                                                {/* content*/}


                                                <ToastContainer />


                                                {this.state.actionType == "add" ?
                                                    <div>
                                                        <div className="row item form-group" style={{ marginTop: 20 }}>
                                                            <div className="col-sm-1">Title </div>
                                                            <div className="col-sm-4">
                                                                <input type={'text'} placeholder={'Enter Title'} className={'form-control'} value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {this.state.titleValidatation} </span>
                                                            </div>
                                                            <div className="col-sm-7"> </div>

                                                        </div>
                                                        <div className="row item form-group" style={{ marginTop: 20 }}>
                                                            <div className="col-sm-1 ">Level </div>
                                                            <div className="col-sm-4">
                                                                <DropDown
                                                                    selectedOption={selectedOption}
                                                                    onChange={(e) => {
                                                                        this.setState({ selectedOption: e })
                                                                    }}
                                                                    options={fileTypeOption}
                                                                />
                                                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {this.state.selectValidatation} </span>
                                                            </div>
                                                            <div className="col-sm-7"> </div>

                                                        </div>




                                                        <div className="row item form-group" style={{ marginTop: 10 }}>
                                                            <div className="col-sm-1">Image </div>
                                                            <div className="col-sm-4">
                                                                <input type="file" onChange={async (event) => {
                                                                    var files = event.target.files;
                                                                    var length = files.length;
                                                                    var urlfile = ''
                                                                    if (length > 0) {
                                                                        for (var i = 0; i < length; i++) {
                                                                            var fileUrl = URL.createObjectURL(files[i]);
                                                                            var file = files[i];
                                                                            var filename = file.name;
                                                                            var ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
                                                                            // if(file.type == "image/jpeg"){
                                                                            //     ext = "jpeg";
                                                                            // }
                                                                            urlfile = fileUrl
                                                                            var uid = uuidv4();
                                                                            var fileObj = {
                                                                                file: file,
                                                                                fileUrl: fileUrl,
                                                                                fileName: uid + "." + ext,
                                                                                docsId: uid,
                                                                                processType: "module",
                                                                                fileType: this.state.selectedOption.value
                                                                            };

                                                                            this.setState({ fileObj, fileType: ext })

                                                                        }

                                                                    }
                                                                }
                                                                }
                                                                />
                                                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {this.state.imageValidatation} </span>
                                                            </div>
                                                            <div className="col-sm-7"> </div>
                                                        </div>




                                                        <div className="row item form-group" style={{ marginTop: 20 }}>
                                                            <div className="col-sm-1"> </div>
                                                            <div className="col-sm-3">
                                                                <button class="buttonload" type="button" class="btn btn-primary" disabled={this.state.enableLoader} onClick={() => this.submitFunction()} >
                                                                    {this.state.enableLoader ? <i class="fa fa-spinner fa-spin"></i> : null} Submit</button>
                                                            </div>
                                                            <div className="col-sm-8"> </div>

                                                        </div>
                                                    </div> : <div>


                                                        <div className="row item form-group" style={{ marginTop: 20 }}>
                                                            <div className="col-sm-1">Title </div>
                                                            <div className="col-sm-4">
                                                                <input type={'text'} placeholder={'Enter Title'} className={'form-control'} value={this.state.editTitle} onChange={(e) => { this.setState({ editTitle: e.target.value }) }} />
                                                            </div>
                                                            <div className="col-sm-7"> </div>

                                                        </div>
                                                        <div className="row item form-group" style={{ marginTop: 20 }}>
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-sm-3">
                                                                <button type="button" className="btn btn-primary"
                                                                    onClick={() => this.editFunction()}>Edit
                                                                 </button>
                                                                <button type="button" className="btn btn-info"
                                                                    onClick={() => this.setState({ actionType: 'add' })}>Add new
                                                                </button>
                                                            </div>
                                                            <div className="col-sm-8"> </div>

                                                        </div>
                                                    </div>
                                                }


                                                <div className="row">

                                                    {data.length != 0 ?
                                                        <DataTable
                                                            title=""
                                                            columns={columns}
                                                            data={data}
                                                        />
                                                        :
                                                        <React.Fragment>
                                                        
                                                                <div className="col-sm-4"> </div>
                                                                <div className="col-sm-4">
                                                                    <div class="loader"></div>
                                                                </div>
                                                                <div className="col-sm-4"> </div>
                                                          
                                                        </React.Fragment>}

                                                </div>


                                            {/*Image View*/}
                                            <div id="myModal" class="modal_image" style={{display:this.state.displayImage }} >
                                            <span class="close" onClick={()=>{
                                                this.setState({displayImage:"none"})
                                            }}  >&times;</span>
                                            {this.state.imageView  ?

                                            <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView.fileName + "&id=" + this.state.imageView.fileType} class="modal-content_image" id="img01"/>

                                            : null}

                                            <div id="caption">  </div>
                                            </div>
                                                {/*Image View*/}

                                                {/*content*/}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /page content --> */}

                        {/* <!-- footer content --> */}
                        <footer>
                            <div class="pull-right">
                                {/* Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a> */}
                            </div>
                            <div class="clearfix"></div>
                        </footer>
                        {/* <!-- /footer content --> */}
                    </div>
                </div>




            </React.Fragment>
        )

    }


}


export default ImageManager
