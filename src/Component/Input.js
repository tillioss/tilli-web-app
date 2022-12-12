import React from 'react';


export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <React.Fragment>
                <input 
                  onChange={this.props.handleInputChange} 
                  autoComplete="off" {...this.props}/>
                { (typeof this.props.error !== "undefined" && this.props.error !== "") ? 
                <div className="custom-invalid-feedback">
                  { this.props.error }
                </div>
                : null}
            </React.Fragment>
        )
    }
}