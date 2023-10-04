import React from "react";
import { Style } from "react-style-tag";
import backImage from "../../images/outlineBackIcon.png";
import nextImage from "../../images/outlineRightIcon.png";
import MyConstant from "../../config/MyConstant";
import { Link } from "react-router-dom";

class DoubleBoxOverlapWithImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { stage, data } = this.props;
    let content = data.content;
    console.log(window.innerWidth);
    return (
      <React.Fragment>
        <Style>
          {`
                    .center {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: '100%'; 
                      }
                    .pink {
                        width: 90%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 3px solid #18191F;
                        background-color:#FF89BB; 
                        border-radius:20px;
                        z-Index:2;
                      }
                      .yellow {
                        width: 86%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 3px solid #18191F;
                        background-color:#FFBD12; 
                        border-radius:20px;
                        z-Index:1;
                      }
                      `}
        </Style>
        <div className="module-content">
          <div className="col-12">
            <div className="row mt-4">
              <div className="col-2">
                <Link onClick={() => this.props.changeStage("Previous", stage)}>
                  <img
                    style={{ width: 48, height: 48 }}
                    src={backImage}
                    alt={""}
                  />
                </Link>
              </div>
              <div className="col-10" style={{ alignSelf: "center" }}>
                <p
                  style={{
                    fontSize: 27,
                    fontFamily: "montserrat-extrabold",
                    fontWeight: "800",
                    alignSelf: "center",
                  }}
                >
                  {data.title}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: window.innerHeight / 10,
            }}
          >
            <div
              style={{
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              <div
                className="pink"
                style={{
                  position: "absolute",
                  minHeight: window.innerHeight / 2.1,
                }}
              >
                <p
                  className="font-24-18"
                  style={{
                    fontFamily: "montserrat-medium",
                    fontWeight: "600",
                    margin: 0,
                    paddingLeft: 10,
                    paddingRight: 10,
                    textAlign: "center",
                  }}
                >
                  {content.text}
                </p>
              </div>
            </div>
            <div
              style={{
                marginLeft: "7%",
                marginRight: "7%",
              }}
            >
              <div
                className="yellow"
                style={{
                  position: "absolute",
                  minHeight: window.innerHeight / 2,
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "17%",
              left: "5%",
              zIndex: 3,
            }}
          >
            <img
              style={{ width: window.innerHeight / 5 }}
              src={
                MyConstant.keyList.apiURL +
                "vp?action=module&key=" +
                content.image.fileName +
                "&id=" +
                content.image.fileType
              }
              alt={""}
            />
          </div>
        </div>
        <div className="forward-step">
          <Link onClick={() => this.props.changeStage("Next", stage)}>
            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default DoubleBoxOverlapWithImage;
