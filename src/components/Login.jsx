import React from 'react';
import { Button,Stack}  from 'react-bootstrap';

const Login = () => {
  const handleLogin = () => {
    const clientId = '9f1716309abf49c0feca';
    const redirectUri = 'http://localhost:3000/home';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <Stack gap={2} className="col-md-5 mx-auto  " style={{height:'100vh', display:'flex'}}>
      <div className='my-auto mx-auto' >
        <h2 style={{textAlign:'center', marginBottom:'2rem'}}>Login</h2>
        <Button variant='secondary' onClick={handleLogin}>Login with GitHub</Button>
      </div>
    </Stack>
  );
};

export default Login;
