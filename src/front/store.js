export const initialStore=()=>{
  return{
    userInfo: null,
    isLogged: false,
    loadingUser: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "loading_user_info":
      return {
        ...store,
        userInfo: null,
        loadingUser: true
      }
    case "set_user_info":
      const userInfo = action.payload
      return {
        ...store,
        userInfo: userInfo,
        isLogged: true,
        loadingUser: false
      }
    case "restart_store":
      return initialStore
    default:
      throw Error('Unknown action.');
  }    
}
