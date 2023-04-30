//import logo from './logo.svg';
import './App.css';
import AddPostForm from './Component/PostCreation'; 
import {BrowserRouter as Router, Route , Routes} from "react-router-dom" 
import Allpost from './Component/Allpost';

function App() {
  return (
    <Router>  
         
      <Routes>
      
        <Route path = "/" element = {<AddPostForm/>} />
        <Route path = "/all" element = {<Allpost/>} />


        </Routes>     
</Router>
  );
}

export default App;
