import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { user } = useContext(UserContext);
  return user.email ? <Outlet/> : <Outlet/>
}
export default AuthRoutes;