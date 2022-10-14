import { Auth0Provider } from "@auth0/auth0-react";

//This protects child node with Auth0 security
const Auth0Context = ({ children }) => {
  const client_domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  return (
    <Auth0Provider
      domain={client_domain}
      clientId={client_id}
      redirectUri={window.location.origin}
      audience={audience}
      scope="read:current_user update:current_user_metadata"
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0Context;
