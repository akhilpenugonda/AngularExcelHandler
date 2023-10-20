export const environment = {
  production: true,
  baseAPIUrl: 'https://api.domain.com/api/',
  IDENTITY_METADATA: 'https://login.microsoftonline.com/',
  OAUTH_REDIRECT_URI: 'https://www.domian.com',
  OAUTH_SCOPE: {
    scopes: ['api://api_id/GeneralScope', 'openid'] 
  },
  GRAPH_ENDPOINT: 'https://graph.microsoft.com/v1.0/me',
  CLIENT_ID: "",
  OAUTH_TENANT_ID: "",

};
