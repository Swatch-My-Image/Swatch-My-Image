import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { StyledButton, WhiteTextField, flexDisplayRow } from './customMuiStyle';

function Signup() {
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ key, setKey ] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !key) {
      alert('No field can be left blank');
    }
    
    const signupInfo = {
      username,
      email,
      password,
      key
    };

    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupInfo)
    })
    .then(response => {
      if (response.status === 200) {
        alert('Signup Success!');
        navigate('/');
      } else if (response.status === 409) {
        alert('Email already in use');
      } else {
        alert('Signup failed. Please try again');
      }
    })
    .catch(err => {
      alert('Error: ', err);
    })
  }


  const routeToLogin = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='signup-container'>
      <h1>Create an Account</h1>
      <form className='signup-form' onSubmit={handleSignup}>
        <WhiteTextField 
          label='Username'
          size='small'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <WhiteTextField 
          label='Email'
          size='small'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <WhiteTextField 
          type='password'
          label='Password'
          size='small'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <WhiteTextField 
          label='Validation Key'
          size='small'
          name='validKey'
          onChange={(e) => setKey(e.target.value)}
        />
        <StyledButton type='submit'>Sign Up</StyledButton>
      </form>
      <div className='login-link'>
        <a onClick={routeToLogin}>Back to Login</a>
      </div>
    </div>
  )
}

export default Signup;