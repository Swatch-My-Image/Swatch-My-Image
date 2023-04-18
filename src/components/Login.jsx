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
      .then(data => data)
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
      <form className='loginForm' onSubmit={handleLogin}>
        <input 
          type='text' 
          placeholder='Enter username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type='password' 
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <div className='signupLink'>
        <a onClick={routeToSignup}>Sign up</a>
      </div>
    </div>
  );
}

export default Login;