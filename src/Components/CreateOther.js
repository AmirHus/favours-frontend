import React from 'react';
import Button from '@material-ui/core/Button';

export default class CreateOther extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          favor: 'Coffee',
          name:'',
          file:''
      }; 
    }
    
    favorChange=(e) => {
      this.setState({favor: e.target.value});
    }

    nameChange=(e)=>{
      this.setState({name: e.target.value});
    }

    fileChange=(e)=>{
      this.setState({file: e.target.value});
    }

    handleSubmit=(event) =>{      
      alert('You owe:' + this.state.name + '  Favor is: ' +this.state.favor+this.state.file);
      
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
      <label>
        Who do you owe?:
        <input type="text" required="required" onChange={this.nameChange} />
      </label>
      <ul />
          <label>
            Choose a favor:
            <select value={this.state.value} onChange={this.favorChange}>
              <option value="Coffee">Coffee</option>
              <option value="Chip">Chip</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Coke">Coke</option>
              <option value="Cupcake">Cupcake</option>
            </select>
          </label>
          <ul />
          <label for='file'>
          <Button variant="contained" color="primary" component="span">
          upload proof
      </Button>
          <input type="file" id='file' onChange={this.fileChange} accept="image/*" hidden />
          </label>
          
          <input type="submit" value="Submit" />
        </form>
      );
    }
}