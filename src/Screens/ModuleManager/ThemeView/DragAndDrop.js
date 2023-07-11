import React from "react";
import drag_drop from "../../../images/drag_drop.png";

export default class DragAndDrop extends React.Component {
  drag(ev) {}

  drop(ev, action) {
    ev.preventDefault();
    // ev.stopPropagation();

    if (action === "Correct Answer") {
      ev.target.appendChild(
        document.getElementById("drag1").getElementsByTagName("img")[0]
      );
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  render() {
    let { layer, index, deviceHeight } = this.props;
    let { drag, drop } = layer;
    return (
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            top: drag.y + "%",
            left: drag.x + "%",
            width: drag.width + "%",
            height: parseInt((drag.height / 100) * deviceHeight) + "px",
            // backgroundColor: drag.backgroundColor,
            borderWidth: drag.borderWidth + "px",
            borderColor: drag.borderColor,
            borderStyle: drag.borderStyle,
            borderRadius: drag.borderRadius + "px",
          }}
          key={index}
          id="drag1"
          draggable="true"
          onDragStart={(e) => this.drag(e)}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={drag.image ? drag.image : drag_drop}
            alt={""}
          />
        </div>
        {drop.map((row, rowIndex) => {
          return (
            <div
              data-testid="drop-target"
              style={{
                position: "absolute",
                top: row.y + "%",
                left: row.x + "%",
                width: row.width + "%",
                height: parseInt((row.height / 100) * deviceHeight) + "px",
                borderWidth: row.borderWidth + "px",
                borderColor: row.borderColor,
                borderStyle: row.borderStyle,
                borderRadius: row.borderRadius + "px",
              }}
              key={rowIndex}
              onDrop={(e) => this.drop(e, row.action)}
              onDragOver={(e) => this.allowDrop(e)}
            ></div>
          );
        })}
      </React.Fragment>
    );
  }
}
