export const oktaConfig = {
  clientId: "0oag7eze35WaIDCOZ5d7",
  issuer: "https://dev-65439396.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
