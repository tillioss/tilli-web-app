import React from "react";
import { Link } from "react-router-dom";

import MyConstant from "../../config/MyConstant";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div class="col-md-3 left_col">
        <div class="left_col scroll-view">
          <div class="navbar nav_title">
            <a class="site_title">
              <i class="fa fa-paw"></i>
              <span>Tilli</span>
            </a>
          </div>

          <div class="clearfix"></div>

          {/* <!-- menu profile quick info --> */}
          <div class="profile clearfix">
            <div class="profile_pic">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/" +
                  MyConstant.keyList.projectUrl +
                  "/images/user.png"
                }
                alt="..."
                class="img-circle profile_img"
              />
            </div>
            <div class="profile_info">
              <span>Welcome,</span>
              <h2>tilli</h2>
            </div>
            <div class="clearfix"></div>
          </div>
          {/* <!-- /menu profile quick info --> */}
          <br />

          {/* <!-- sidebar menu --> */}

          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
              <h3>General</h3>

              <ul class="nav side-menu">
                <li>
                  <Link to={"/" + MyConstant.keyList.projectUrl + "/Level"}>
                    <i class="fa fa-level-up"></i> Level <span class=""></span>
                  </Link>
                </li>
              </ul>

              <ul class="nav side-menu">
                <li>
                  <Link to={"/" + MyConstant.keyList.projectUrl + "/Theme"}>
                    <i class="fa fa-home"></i> Theme <span class=""></span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- /sidebar menu --> */}

          {/* <!-- /menu footer buttons --> */}
          <div class="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="Settings">
              <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
              <span
                class="glyphicon glyphicon-fullscreen"
                aria-hidden="true"
              ></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Lock">
              <span
                class="glyphicon glyphicon-eye-close"
                aria-hidden="true"
              ></span>
            </a>
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Logout"
              to="login.html"
            >
              <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
            </a>
          </div>
          {/* <!-- /menu footer buttons --> */}
        </div>
      </div>
    );
  }
}

export default SideMenu;
