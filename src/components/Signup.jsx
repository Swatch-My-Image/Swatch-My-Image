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
    
    const signupInfo = {
      username,
      email,
      password,
      key
    };

    try {
      fetch('WHAT WILL BE THE ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          console.log('Sign up success!');
          navigate('/');
        }
      })

    } catch(error) {
      console.log('Error: ', error);
    }
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