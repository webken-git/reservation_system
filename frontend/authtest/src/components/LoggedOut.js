import Cookies from 'universal-cookie'

const cookies = new Cookies();

// props.childrenの意味はよくわかっていない
const LoggedOut = props =>
    cookies.get('access_token') ? null : props.children;

export default LoggedOut;
