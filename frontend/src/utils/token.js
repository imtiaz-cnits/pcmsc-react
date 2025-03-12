
// set token
export const setToken = (token)=> localStorage.setItem('access_token',token)

// remove token 
export const removeToken = ()=> localStorage.removeItem('access_token')

//get token 
export const getToken = ()=> localStorage.getItem('access_token')