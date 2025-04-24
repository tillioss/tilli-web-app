import React from "react";
import { Style } from "react-style-tag";
import backImage from "../../images/outlineBackIcon.png";
import nextImage from "../../images/outlineRightIcon.png";
import MyConstant from "../../config/MyConstant";
import people_set from "../../images/people_set.png";
import drag_drop from "../../images/drag_drop.png";
import { Link } from "react-router-dom";

class CircleWithInfoAnimations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: [],
      selectColor_1: "",
      selectColor_2: "",
      selectColor_3: "",
      modelView: false,
      display_view: "none",
      show_con: "",
      imageBackground_color: "",
      modelContent: "",
      anotherChoice: 1,
      true_header: "",
      true_body: "",
      true_button: "",
      change_Content: false,
      false_header: "",
      false_body: "",
      false_button: "",
      boderView: false,
      imageDraged: false,
      appendData: document.createElement("p"),
    };
  }

  selectedView() {
    const { selectColor_1, selectColor_2, selectColor_3 } = this.state;

    const { match } = this.props;

    let levelIndex = match.params.levelIndex;

    let value = "";
    let color = "white";
    if (selectColor_1.length !== 0) {
      value = 0;
    } else if (selectColor_2.length !== 0) {
      value = 1;
    } else if (selectColor_3.length !== 0) {
      value = 2;
    }

    if (value.length !== 0) {
      localStorage.removeItem(levelIndex + "_selectedCircle");
    }

    if (!localStorage.getItem(levelIndex + "_selectedCircle")) {
      if (value.length !== 0) {
        console.log("color", color, value);

        localStorage.setItem(levelIndex + "_selectedCircle", value);
        console.log(localStorage.getItem(levelIndex + "_selectedCircle"));
      }
    }
  }

  async componentDidMount() {
    const { data, match } = this.props;

    let levelIndex = match.params.levelIndex;
    let datacontent = localStorage.getItem(levelIndex + "_selectedCircle");

    if (datacontent) {
      if (datacontent === 0) {
        this.setState({ selectColor_1: "white" });
      } else if (datacontent === 1) {
        this.setState({ selectColor_2: "white" });
      } else if (datacontent === 2) {
        this.setState({ selectColor_3: "white" });
      }
    }
    await this.setState({
      true_header: data.content.message.success_header_1,
      true_body: data.content.message.success_body_1,
      true_button: data.content.message.success_button_1,
      change_Content: false,
      false_header: data.content.message.failure_header_1,
      false_body: data.content.message.failure_body_1,
      false_button: data.content.message.failure_button_1,
    });

    var btn = document.querySelector("#drag1");

    // attaching each event listener
    var activeEvent = "";
    var originalX = "";
    var originalY = "";
    var that = this;
    btn.addEventListener("touchstart", function (e) {
      e.preventDefault();

      e.target.getAttribute("id");
      originalX = e.target.offsetLeft - 10 + "px";
      originalY = e.target.offsetTop - 10 + "px";
      activeEvent = "start";
      that.setState({
        boderView: true,
        imageDraged: true,
        imageBackground_color: "#61E4C5",
      });
    });
    btn.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (activeEvent === "move") {
        e.target.style.position = "initial";
        var changedTouch = e.changedTouches[0];
        var element = document.elementFromPoint(
          changedTouch.clientX,
          changedTouch.clientY
        );
        if (element.id) {
          document.getElementById(element.id).appendChild(e.target);
          that.checkAnswer(element.id);
        } else {
        }
      }
      that.setState({
        imageBackground_color: "#61E4C5",
        originalX,
        originalY,
        appendData: e.target,
        check: element.id,
      });
    });

    btn.addEventListener("touchmove", function (e) {
      var touchLocation = e.targetTouches[0];
      let x = window.innerWidth > 768 ? 0 : 70;
      let y = window.innerWidth > 768 ? 0 : 90;

      var pageX = touchLocation.pageX - x + "px";
      var pageY = touchLocation.pageY - y + "px";
      e.target.style.position = "absolute";
      e.target.style.left = pageX;
      e.target.style.top = pageY;
      activeEvent = "move";
    });

    btn.addEventListener("dragstart", function (e) {
      console.log("btn dragstart");
      e.target.getAttribute("id");
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("text", e.target.getAttribute("id"));
    });

    btn.addEventListener("touchleave", function () {});
    btn.addEventListener("touchcancel", function () {});
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    console.log(
      "div",
      JSON.stringify(ev.target.id).length,
      JSON.stringify(ev.target.id)
    );
    ev.preventDefault();
    this.setState({ check: ev.target.id });

    if (
      ev.target.id === "Yellow" ||
      ev.target.id === "Blue" ||
      ev.target.id === "Red"
    ) {
      var datas = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(datas));
      this.checkAnswer(ev.target.id);
    }
  }
  checkAnswer(choose) {
    const { data } = this.props;
    let content = data.content;
    let check_value = false;
    let trustvalue = "";

    if (choose === "Yellow") {
      trustvalue = "NO TRUST";
    } else if (choose === "Blue") {
      trustvalue = "LOW TRUST";
    } else if (choose === "Red") {
      trustvalue = "HIGH TRUST";
    }

    content.circles.map((iva, index) => {
      if (
        content.circles[index].isCorrectanswer === true &&
        content.circles[index].name === trustvalue
      ) {
        check_value = true;
      }
      return true;
    });

    console.log("choose", choose);
    console.log("trustvalue", trustvalue);
    console.log("check_value", check_value);

    if (check_value) {
      this.setState({
        modelView: true,
        show_con: "show",
        display_view: "block",
        imageBackground_color: "#61E4C5",
        modelContent: true,
        boderView: false,
      });
    } else {
      this.setState({
        modelView: true,
        show_con: "show",
        display_view: "block",
        imageBackground_color: "#61E4C5",
        modelContent: false,
        boderView: false,
      });
    }
  }

  IncreaseUserPoint() {
    var levelPoints = localStorage.getItem("levelPoints");
    var newPoint = parseInt(levelPoints) + 1;
    localStorage.setItem("userPoints", newPoint);
    localStorage.setItem("levelPoints", newPoint);
  }

  render() {
    const { stage, data } = this.props;
    const {
      true_body,
      true_header,
      true_button,
      change_Content,
      false_body,
      false_header,
      false_button,
    } = this.state;
    let content = data.content;
    let innerWidth = window.innerWidth > 768 ? 768 : window.innerWidth;
    return (
      <React.Fragment>
        <Style>
          {`
                    #Yellow>img{
                      margin-top:40px !Important;
                      
                    }
                    #Red>img{
                        margin-top:40px !Important;
                        
                      }

                      #Blue>img
                      {
                        margin-top:80px !Important;
                      }
                      `}
        </Style>

        <div style={{ width: "100%" }}>
          <div className="col-12" style={{ margin: 0, padding: 0 }}>
            <div className="row mt-5 ml-0">
              <div className="col-2">
                <Link
                  onClick={() => {
                    this.selectedView();
                    if (this.props.themeType === "StoryCard") {
                      this.props.changeindex("Previous", stage);
                    } else {
                      this.props.changeStage("Previous", stage);
                    }
                  }}
                >
                  <img
                    style={{ width: 48, height: 48 }}
                    src={backImage}
                    alt={""}
                  />
                </Link>
              </div>
              <div className="col-8">
                <p
                  style={{
                    fontSize: 27,
                    fontFamily: "montserrat-bold",
                    fontWeight: "800",
                    alignSelf: "center",
                  }}
                >
                  {data.title}
                </p>
              </div>
            </div>

            <div
              style={{ textAlign: "right", position: "relative", zIndex: 1 }}
            ></div>
          </div>

          <div className="row" style={{}}>
            <div
              id={"drag2"}
              className="col-4"
              style={{
                backgroundColor: "#00C6AE",
                width: 100,
                height: 100,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                marginLeft: 50,
                position: "absolute",
              }}
            >
              <Draggable
                onStop={() => {
                  this.setState({ imageBackground_color: "#61E4C5" });
                  setTimeout(() => {
                    this.setState({
                      modelView: true,
                      show_con: "show",
                      display_view: "block",
                      imageBackground_color: "#61E4C5",
                    });
                  }, 1000);
                }}
              >
                <img
                  id="drag1"
                  draggable="true"
                  onDragStart={(e) => {
                    console.log(e);
                    this.drag(e);
                  }}
                  onDragEnd={(e) => {
                    this.setState({
                      imageBackground_color: "#61E4C5",
                      appendData: e.target,
                    });
                    console.log(e);
                  }}
                  src={people_set}
                  style={{
                    zIndex: 1,
                    width: 70,
                    height: 70,
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: -10,
                    backgroundColor: this.state.imageBackground_color,
                    borderRadius: 40,
                  }}
                  alt={""}
                />
              </Draggable>
            </div>
            <div
              className="col-8 boder_radius"
              style={{
                height: "auto",
                width: 300,
                paddingLeft: "8%",
                backgroundColor: "#53dce294",
                marginLeft: 104,
                borderRadius: 20,
              }}
            >
              {" "}
              <p
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontWeight: "400",
                  textAlign: "center",
                  paddingTop: 15,
                  paddingLeft: 10,
                }}
              >
                {" "}
                {data.content.text1}
              </p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-2"> </div>
            <div
              className="col-9"
              style={{
                fontSize: 14,
                fontWeight: "bold",
                paddingTop: 6,
                height: 60,
                backgroundColor: "#FFC737",
                border: " 1px solid rgba(35, 31, 32, 0.46)",
                boxSizing: "border-box",
                boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: 10,
              }}
            >
              <img src={drag_drop} style={{ width: 34, height: 30 }} alt={""} />{" "}
              {data.content.text2}
            </div>
            <div className="col-1"> </div>
          </div>

          <div
            class={"modal fade bd-example-modal-lg " + this.state.show_con}
            style={{ display: this.state.display_view }}
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div
                class="modal-content"
                style={{
                  backgroundColor: "#FF6161",
                  top: 200,
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 16,
                  paddingBottom: 20,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                {this.state.modelContent === true ? (
                  <React.Fragment>
                    <div className="row" style={{ marginTop: 30 }}>
                      <div className="col-sm-2"> </div>
                      <div className="col-sm-10">
                        <p
                          style={{
                            fontWeight: 800,
                            fontSize: 17,
                            fontFamily: "montserrat-bold",
                          }}
                        >
                          {true_header}
                        </p>
                        <p
                          style={{
                            fontSize: 15,
                            fontFamily: "montserrat-medium",
                            lineHeight: 1.1,
                          }}
                        >
                          {" "}
                          {true_body}
                        </p>
                      </div>
                      <div className="col-sm-2"> </div>
                    </div>

                    <div className="row">
                      <div className="col-1"> </div>
                      <div
                        className="col-10"
                        onClick={() => {
                          if (change_Content) {
                            this.IncreaseUserPoint();

                            if (this.props.themeType === "StoryCard") {
                              this.props.changeStage(
                                "Next",
                                this.props.parentindex
                              );
                            } else {
                              this.props.changeStage("Next", stage);
                            }

                            this.setState({
                              show_con: "",
                              display_view: "none",
                            });
                          }
                          this.setState({
                            change_Content: true,
                            true_header: data.content.message.success_header_2,
                            true_body: data.content.message.success_body_2,
                            true_button: data.content.message.success_button_2,
                          });
                        }}
                      >
                        <button
                          style={{
                            fontFamily: "montserrat-extrabold",
                            fontWeight: 800,
                            fontSize: 12,
                            border: "2px solid #FFFFFF",
                            boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: 12,
                            backgroundColor: "#FFBD12",
                            paddingBottom: 12,
                            paddingTop: 12,
                          }}
                          type="button"
                          data-dismiss="modal"
                          aria-label="Close"
                          class="btn btn-warning"
                        >
                          {true_button}
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="row" style={{ marginTop: 40 }}>
                      <div className="col-sm-2"> </div>
                      <div className="col-sm-10">
                        <p
                          style={{
                            fontWeight: 800,
                            fontSize: 17,
                            fontFamily: "montserrat-bold",
                          }}
                        >
                          {false_header}{" "}
                        </p>
                        <p
                          style={{
                            fontSize: 17,
                            fontFamily: "montserrat-medium",
                            lineHeight: 1.1,
                          }}
                        >
                          {" "}
                          {false_body}
                        </p>
                      </div>
                      <div className="col-sm-2"> </div>
                    </div>

                    <div className="row">
                      <div className="col-1"> </div>
                      <div
                        className="col-10"
                        onClick={(ev) => {
                          const { anotherChoice, appendData } = this.state;

                          this.setState({
                            false_header: data.content.message.success_header_2,
                            false_body: data.content.message.failure_body_2,
                            false_button: data.content.message.failure_button_2,
                          });

                          if (anotherChoice === 2 || anotherChoice === 4) {
                            this.setState({
                              show_con: "",
                              display_view: "none",
                              anotherChoice: anotherChoice + 1,
                              imageBackground_color: "",
                            });
                            document
                              .getElementById("drag2")
                              .appendChild(appendData);

                            if (anotherChoice === 2) {
                              this.setState({
                                false_header: "Are you sure?",
                                false_body: "Think again!",
                                false_button: "Try Again",
                              });
                            }

                            if (anotherChoice === 4) {
                              this.props.history.push(
                                "/" + MyConstant.keyList.projectUrl + "/home/"
                              );
                            }
                          }

                          this.setState({ anotherChoice: anotherChoice + 1 });
                        }}
                      >
                        <button
                          style={{
                            fontFamily: "montserrat-extrabold",
                            fontWeight: 800,
                            fontSize: 12,
                            border: "2px solid #FFFFFF",
                            boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: 12,
                            backgroundColor: "#FFBD12",
                          }}
                          type="button"
                          data-dismiss="modal"
                          aria-label="Close"
                          class="btn btn-warning"
                        >
                          {false_button}{" "}
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                )}

                <div className="col-1"> </div>
              </div>
            </div>
          </div>

          <div
            id="drop_zone"
            ondragover="return false"
            onDrop={(event) => {
              this.drop(event);
            }}
            onDragOver={(event) => {
              this.allowDrop(event);
            }}
            style={{
              backgroundColor: content.circles[2].color,
              height: innerWidth * 0.9,
              width: "90%",
              margin: "5%",
              borderRadius: 100000,
            }}
          >
            <div
              className="row"
              style={{ height: innerWidth * 0.9, margin: 0 }}
            >
              <div
                className="col-9"
                style={{
                  display: "inline-grid",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginTop: "1%",
                    backgroundColor: content.circles[1].color,
                    height: (innerWidth * 0.9) / 1.3,
                    width: (innerWidth * 0.9) / 1.3,
                    borderRadius: 100000,
                  }}
                >
                  <div
                    className="row"
                    style={{ height: innerWidth * 0.9, margin: 0 }}
                  >
                    <div
                      className="col-5"
                      style={{
                        display: "contents",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {/*div1 yellow*/}
                      <div
                        id="Yellow"
                        style={{
                          marginTop: "21%",
                          backgroundColor: content.circles[0].color,
                          height: (innerWidth * 0.9) / (1.5 * 1.5),
                          width: (innerWidth * 0.9) / (1.5 * 1.5),
                          borderRadius: 100000,
                        }}
                      >
                        {this.state.boderView ? (
                          <div
                            style={{
                              border: "2px dotted white",
                              position: "absolute",
                              marginLeft: 5,
                              marginTop: "10%",
                              width: 90,
                              height: 90,
                              borderRadius: 90 / 2,
                            }}
                          >
                            {" "}
                          </div>
                        ) : null}
                      </div>
                      {/*div1 yellow*/}
                    </div>
                    {/*div2 Blue*/}
                    <div id="Blue" className="col-4">
                      {this.state.boderView ? (
                        <div
                          style={{
                            border: "2px dotted white",
                            position: "absolute",
                            marginLeft: -10,
                            marginTop: "100%",
                            width: 90,
                            height: 90,
                            borderRadius: 90 / 2,
                          }}
                        >
                          {" "}
                        </div>
                      ) : null}
                    </div>
                    {/*div2 Blue*/}
                  </div>
                </div>
              </div>
              {/*div3 Red*/}
              <div
                id="Red"
                onDrop={(event) => {
                  this.drop(event);
                }}
                onDragOver={(event) => {
                  this.allowDrop(event);
                }}
                style={{ marginTop: "30%" }}
                className="col-3"
              >
                {this.state.boderView ? (
                  <div
                    style={{
                      border: "2px dotted white",
                      position: "absolute",
                      marginLeft: -10,
                      marginTop: "45%",
                      width: 75,
                      height: 80,
                      borderRadius: 75 / 2,
                    }}
                  >
                    {" "}
                  </div>
                ) : null}
                <div className="col-12"> </div>
              </div>
              {/*div3 Red*/}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: window.innerHeight / 15,
            right: "5%",
            zIndex: 3,
          }}
        >
          <Link
            onClick={() => {
              if (this.state.imageDraged) {
                this.setState({
                  modelView: true,
                  show_con: "show",
                  display_view: "block",
                });
              } else {
                console.log("img not drageed ");
              }
            }}
          >
            <img style={{ width: 44, height: 44 }} src={nextImage} alt={""} />
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
export default CircleWithInfoAnimations;
