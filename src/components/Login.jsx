import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const loginInfo = {username, password};
    try {
      fetch('api/*', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginInfo)
      })
      .then(response => response.json())
      .then(data => {
        if(data.status === 200) {
          navigate('/homepage');
        }
      })
    } catch(error) {
      console.log('Invalid username or password')
    }
  }

  const routeToSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <div className='login-container'>
      <h1>Welcome to Swatch!</h1>
      <form className='login-form' onSubmit={handleLogin}>
        <input 
          className='input-form'
          type='text' 
          placeholder='Enter username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          className='input-form'
          type='password' 
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-button' type='submit'>Login</button>
      </form>
      <div className='signup-link'>
        <a onClick={routeToSignup}>Sign up</a>
      </div>
    </div>
  );
}

export default Login;