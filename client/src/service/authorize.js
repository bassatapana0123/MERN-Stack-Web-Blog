
//เก็บ token / username => session storage
export const authenticate = (response, navigate) => {
    if (window !== "undefined") {
      //เก็บข้อมูลลง session storage
      sessionStorage.setItem("token", JSON.stringify(response.data.token))
      sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
    navigate("/create");
  }
  
//ดึงข้อมูล token
export const getToken=()=>{
  if(window !== "undefined"){
    if(sessionStorage.getItem("token")){
      return JSON.parse(sessionStorage.getItem("token"))
    }else{
      return false
    }

  }
}

//ดึงข้อมูลของ user
export const getUser=()=>{
  if(window !== "undefined"){
    if(sessionStorage.getItem("user")){
      return  JSON.parse(sessionStorage.getItem("user"))
    }else{
      return false
    }

  }
}


//logout
export const logout=(next)=>{
  if(window !== "undefined"){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")

  }
  next()
}