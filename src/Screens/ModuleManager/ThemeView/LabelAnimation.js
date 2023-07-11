import React from "react";

export default class LabelAnimation extends React.Component {
  render() {
    let { layer, index, deviceHeight } = this.props;
    let { label } = layer;
    return (
      <div
        className={`layer`}
        style={{
          position: "absolute",
          top: layer.y + "%",
          left: layer.x + "%",
          width: layer.width + "%",
          height: parseInt((layer.height / 100) * deviceHeight) + "px",
          backgroundColor: layer.backgroundColor,
          borderWidth: layer.borderWidth + "px",
          borderColor: layer.borderColor,
          borderStyle: layer.borderStyle,
          borderRadius: layer.borderRadius + "px",
          display: "flex",
          flexDirection: "column",
        }}
        key={index}
      >
        {label.map((row, rowIndex) => {
          return (
            <div
              data-testid="label-element"
              style={{
                backgroundColor: row.backgroundColor,
                borderWidth: row.borderWidth + "px",
                borderColor: row.borderColor,
                borderStyle: row.borderStyle,
                borderRadius: row.borderRadius + "px",
                padding: 5,
                flex: 1,
                margin: 5,
              }}
              key={rowIndex}
              dangerouslySetInnerHTML={{ __html: row.text }}
            ></div>
          );
        })}
      </div>
    );
  }
}
