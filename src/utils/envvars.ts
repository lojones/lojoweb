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

