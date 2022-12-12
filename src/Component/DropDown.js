import React from 'react';
import Select from 'react-select';
 

 const DropDown =  (props) => {
return(
<Select
        value={props.selectedOption}
        onChange={props.onChange}
        options={props.options}
      />
)  

}
export default DropDown