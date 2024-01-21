export function apiHost():string {
    return `${process.env.REACT_APP_API_HOST}` ;
  }

export function signInUrl():string {
    return `${apiHost()}/${process.env.REACT_APP_API_PATH_AUTH_SIGNIN}`;
  }

export function healthUrl():string {
    return `${apiHost()}/${process.env.REACT_APP_API_PATH_HEALTH}`;
  }

export function UserDetailsUrl():string {
    return `${apiHost()}/${process.env.REACT_APP_API_PATH_USER_DETAILS}`;
  }

export function chatUrl():string {
    return `${apiHost()}/${process.env.REACT_APP_API_PATH_CHAT}`;
  }

export function submitRemarkUrl():string {
  return `${apiHost()}/${process.env.REACT_APP_API_PATH_REMARK_SUBMIT}`;
}

export function getRemarkResponseStreamUrl():string {
  return `${apiHost()}/${process.env.REACT_APP_API_PATH_REMARK_RESPONSESTREAM}`;
}

export function getGoogleOauthClientId():string {
  return `${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`;
}

export function googleTokenSignginUrl():string {
  return `${apiHost()}/${process.env.REACT_APP_API_PATH_GOOGLE_TOKEN_SIGNIN}`;
}

export function microsoftTokenSignginUrl():string {
  return `${apiHost()}/${process.env.REACT_APP_API_PATH_MICROSOFT_TOKEN_SIGNIN}`;
}

export function microsoftOauthTenantId():string {
  return `${process.env.REACT_APP_MICROSOFT_OAUTH_TENANT_ID}`;
}

export function microsoftOauthClientId():string {
  return `${process.env.REACT_APP_MICROSOFT_OAUTH_CLIENT_ID}`;
}

export function microsoftOauthRediretUri():string {
  return `${process.env.REACT_APP_MICROSOFT_OAUTH_REDIRECT_URI}`;
}