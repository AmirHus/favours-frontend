import React from 'react';

export default class Create extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          favor: 'Coffee',
          name:''
      }; 
    }
    
    favorChange=(e) => {
      this.setState({favor: e.target.value});
    }

    nameChange=(e)=>{
      this.setState({name: e.target.value});
    }

    handleSubmit=(event) =>{      
      alert('You owe:' + this.state.name + '  Favor is: ' + this.state.favor);
      
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
      <label>
        Who do you owe?:
        <input type="text" required="required" onChange={this.nameChange} style={{ width: 200 }} />
      </label>
      <ul />
          <label>
            Choose a favor:
            <select value={this.state.value} onChange={this.favorChange} style={{ width: 200 }}>
              <option value="Coffee">Coffee</option>
              <option value="Chip">Chip</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Coke">Coke</option>
              <option value="Cupcake">Cupcake</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );      
    }
}