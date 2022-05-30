import './App.css';
import {Fragment} from "react";
import {Route,Routes} from "react-router-dom";
import List from './List';
import Create from './Create';
import Edit from './Edit';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Fragment><Create/><List/></Fragment> } />
        <Route path="/edit/:id"element={<Edit/>} />
      </Routes>

    </div>
  );
}

export default App;