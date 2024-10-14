import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Tasks from './components/Tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/tasks' element={<Tasks/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
