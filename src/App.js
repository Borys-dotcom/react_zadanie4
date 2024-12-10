import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + (user ? user.jwt_token : '');

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
