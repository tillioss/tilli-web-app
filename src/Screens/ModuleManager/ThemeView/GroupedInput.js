import React from "react";

export default class GroupedInput extends React.Component {
  render() {
    let { layer, index, deviceHeight } = this.props;
    let { inputs } = layer;
    return (
      <div
        key={index}
        style={{
          visibility: layer.visibility,
        }}
      >
        {inputs.map((row, rowIndex) => {
          return (
            <div
              className={`layer`}
              data-testid="grouped-input"
              style={{
                position: "absolute",
                top: row.y + "%",
                left: row.x + "%",
                width: row.width + "%",
                height: parseInt((row.height / 100) * deviceHeight) + "px",
                backgroundColor: row.backgroundColor,
                borderWidth: row.borderWidth + "px",
                borderColor: row.borderColor,
                borderStyle: row.borderStyle,
                borderRadius: row.borderRadius + "px",
              }}
              key={rowIndex}
              onClick={() => {
                this.props.dynamicThemeAction(row, index);
              }}
              id={"layer" + index}
            >
              {/* <input type={inputType} /> */}
            </div>
          );
        })}
      </div>
    );
  }
}
