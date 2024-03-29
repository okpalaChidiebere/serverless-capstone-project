import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from '../aws-exports';
import App from '../components/App';

Amplify.configure(awsconfig);

const AuthStateApp: React.FunctionComponent = () => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <App />
  ) : (
      <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          {
            type: "email",
            label: "Email",
            placeholder: "name@host.com",
            required: true,
          },
          {
            type: "name",
            label: "Name",
            placeholder: "Full name",
            required: true,
          },
          {
            type: "username",
            label: "Confirm Email",
            placeholder: "name@host.com",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "password",
            required: true,
          },
        ]}
      />
      <AmplifySignIn
        slot="sign-in"
        formFields={[
          {
            type: "username",
            label: "Email",
            placeholder: "name@host.com",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Password",
            required: true,
          },
        ]} 
      />
    </AmplifyAuthenticator>
  );
}

export default AuthStateApp;