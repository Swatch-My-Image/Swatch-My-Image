import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledButton, WhiteTextField } from './customMuiStyle';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('No field can be left blank');
    }
    const loginInfo = {username, password};
    try {
      fetch('/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginInfo)
      })
      .then(response => {
        if(response.status === 200) {
          navigate('/homepage');
        } else {
          alert('Invalid Credentials');
        }
      })
    } catch(error) {
      console.log('Invalid username or password')
    }
  }

  const responseGoogle = (response) => {
    console.log(response.credential)
    const responseStr = {credential: response.credential};
    try {
      fetch('users/decode', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(responseStr)
      })
      .then(response => {
        if(response.status === 200) {
          navigate('/homepage');
        } else {
          alert('Error trying to login: ', response.status);
        }
      })
    } catch(error) {
      console.log('Invalid google login');
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
        <WhiteTextField 
          label='Username' 
          name='username'
          size='small'
          onChange={(e) => setUsername(e.target.value)}
        />
        <WhiteTextField 
          type='password'
          label='Password' 
          name='password'
          size='small'
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type='submit'>Login</StyledButton>
      </form>
      <div className='signup-link'>
        <a onClick={routeToSignup}>Sign up</a>
      </div>
      <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OATH_CLIENT_ID}>
        <GoogleLogin 
          onSuccess={responseGoogle}
          onError={responseGoogle}
        />
      </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default Login;