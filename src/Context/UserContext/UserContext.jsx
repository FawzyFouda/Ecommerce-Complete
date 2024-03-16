import { createContext, useEffect, useState } from "react"

export let UserContext = createContext()
function UserContextProvider(props) {
  let baseUrl ='https://ecommerce.routemisr.com'
    const [userToken, setUserToken] = useState(null) //set token when login
    const [localStorageToken, setLocalStorageToken] = useState(null) //set token when login
    const [userName, setUserName] = useState(null)


useEffect(()=>{
  if(localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
  }
},[])

    return <UserContext.Provider value={{baseUrl,userToken,setUserToken,localStorageToken,setLocalStorageToken,setUserName,userName}}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider