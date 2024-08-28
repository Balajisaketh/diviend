import React from 'react';
import { gapi } from 'gapi-script';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInScreen from './components/Signin';

import Display from './components/Display';

class App extends React.Component {
  componentDidMount() {
    const clientId = '749071613731-iejh90edkvtb9ugn87n8qfpagpv7e1n5.apps.googleusercontent.com';

    // Load the gapi client library and initialize the API client
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      }).then(() => {
        console.log('GAPI client initialized');
      }).catch((error) => {
        console.error('Error initializing GAPI client:', error);
      });
    });
    console.log('Component did mount');
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignInScreen />} />
            <Route path="/display" element={<Display />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
