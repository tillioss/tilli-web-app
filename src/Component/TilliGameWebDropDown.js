import React from 'react';
import Select, { components, } from 'react-select';
import downArrow from "../images/downArrow.png"




export default (props) => {

  // const customStyles = () => ({
  //   control: (styles) => ({
  //     ...styles,
  //     background: "red",
  //     backgroundColor: "red",
  //   }),
  //   menu: (base) => ({
  //     ...base,
  //     background: "#FFF",
  //     color: "#000",
  //     backgroundColor: "red",
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //     color: 'black',
  //     backgroundColor: state.isSelected ? "rgba(189,197,209,.3)" : "white",
  //   }),
  //   singleValue: provided => ({
  //     ...provided,
  //     height: '100%',
  //     color: '#08699B',
  //     paddingTop: '3px',
  //   }),
  // });


  const customStyles = () => ({
    control: (styles) => ({
      ...styles,
      ...({ borderColor: 'red' }),
    }),
    menu: (base) => ({
      ...base,
      background: "#FFF",
      color: "#000"
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img style={{ width: 22, }} src={downArrow} />
        <div style={{ width: 10 }}></div>
      </components.DropdownIndicator>
    );
  };

  let { selectedOption } = props
  let SingleValue = ({
    ...props
  }) => (
    <components.SingleValue {...props}>

    </components.SingleValue>
  );


  if (props.pageType === "language") {
    SingleValue = ({
      ...props
    }) => (
      <components.SingleValue {...props}>
        <div style={{ display: "flex" }}>
          <div style={{ width: 30 }}>
            <img style={{ width: 25, height: 25, }} src={selectedOption.extra.image} />
          </div>
          <div style={{ flex: 1, fontSize: 18, fontWeight: 300, }}>{selectedOption.label}</div>
        </div>
      </components.SingleValue>
    );
  }

  return (
    <Select
      styles={customStyles()}
      value={props.value ? props.value : props.selectedOption}
      onChange={props.onChange}
      options={props.options}
      isDisabled={props.isDisabled ? true : false}
      isMulti={props.isMulti ? props.isMulti : false}
      placeholder={props.placeholder}
      components={{ DropdownIndicator, SingleValue }}
      {...props}
    />
  )
}
