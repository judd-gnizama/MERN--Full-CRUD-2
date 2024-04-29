import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { user } = useContext(UserContext);
  return user.email ? <Navigate to="/"/> : <Navigate to="/login"/>
}
export default AuthRoutes;