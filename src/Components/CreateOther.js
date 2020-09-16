import React from 'react';


export default class CreateOther extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: 'Coffee'};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
          const name = this.nameInput.value
          const file = this.fileInput.value
        alert( 'Owe you:' +name+ '  Favor is: ' + this.state.value+file);
       
        event.preventDefault();
      }
   
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
        <label>
          Who owe you?:
          <input type="text" required="required" ref={input=>this.nameInput=input} />
        </label>
            <label>
              Choose a favor:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="Coffee">Coffee</option>
                <option value="Chip">Chip</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Coke">Coke</option>
                <option value="Cupcake">Cupcake</option>
              </select>
            </label>
            <label>
              Upload proof:
            <input type="file" required="required" ref={input=>this.fileInput=input} accept="image/*"/>
            </label>            
            <input type="submit" value="Submit" />
          </form>
        );
      }
}