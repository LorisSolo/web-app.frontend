import Cookies from 'js-cookie'

function isAuthenticated() {
    
    const token = Cookies.get('token')
    
    return !!token // return true if the token exists, false otherwise
  }

  export {isAuthenticated}