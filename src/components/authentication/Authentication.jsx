
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = (props) => {
  const token = localStorage.getItem("token")
 const user = JSON.parse(localStorage.getItem("userData"))
console.log(props.roleRequired)


  let auth = { 'token': true }
  if (token) {
    auth.token = true
  } else {
    auth.token = false
  }


if(props.roleRequired){
return auth.token? (
  props.roleRequired === user.role ? (
    <Outlet/>
  ):(
    <Navigate to = "/"/>
  )
  ):(
    <Navigate to = "/login"/>
  )
}else{
  return auth.token ? <Outlet /> : <Navigate to='/login' />
}
}

export default PrivateRoutes
