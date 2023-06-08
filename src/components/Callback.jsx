import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        // Perform API request to exchange code for access token
        const response = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
            code,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.access_token;
          // Save the access token to local storage
          localStorage.setItem('accessToken', accessToken);
          // Redirect to the home page
          navigate('/');
        } else {
          console.error('Error exchanging code for access token');
        }
      } else {
        console.error('Code not found in the URL');
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  return (
    <div>
      <h2>Authenticating...</h2>
    </div>
  );
};

export default Callback;
