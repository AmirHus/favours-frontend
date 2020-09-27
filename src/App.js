import React from 'react';
import { BrowserRouter as Router,Route, Link} from "react-router-dom";
import Create from './Components/Create';
import CreateOther from './Components/CreateOther';

export default class App extends React.Component {
  render(){
    return(
      
 <Router>
            <div>
                <ul>
                   <li> <Link to="/create">Create Owe other </Link></li>
                   <li> <Link to="/createOther">Create other Owe me</Link></li>
                    <Route path="/create" component={Create}/>
                    <Route path="/createOther" component={CreateOther}/>
               </ul>
            </div>
</Router>
    )
  }
};