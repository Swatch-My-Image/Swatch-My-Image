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

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
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