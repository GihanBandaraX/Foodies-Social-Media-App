//import logo from './logo.svg';
import './App.css';
import AddPostForm from './Component/PostCreation'; 
import {BrowserRouter as Router, Route , Routes} from "react-router-dom" 

function App() {
  return (
    <Router>  
         
      <Routes>
      
        <Route path = "/" element = {<AddPostForm/>} />

        </Routes>     
</Router>
  );
}

export default App;
