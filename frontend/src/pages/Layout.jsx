import { useContext } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const Layout = () => {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {

    if (confirm("Confirm Logout?")) {
      setUser({ email: null, posts: []})
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
    }
  }

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link 
          title="Home"
          to="/" 
          className="fa-solid fa-house nav-link"></Link>
          { user.email ? (
          <div className="flex items-center gap-2">
            <Link 
            title="Create Post"
            to="/create" 
            className="fa-solid fa-plus nav-link"></Link>
            <Link 
            title="Dashboard"
            to="/dashboard" 
            className="fa-solid fa-user nav-link"></Link>
            <button
            title="Logout"
            className="fa-solid fa-right-from-bracket"
            onClick={handleLogout}>

            </button>
          </div>
          ) : (
            <div className="flex items-center gap-2">
            <Link 
            title="Login"
            to="/login" 
            className="fa-solid fa-right-to-bracket nav-link"></Link>
            <Link 
            title="Register"
            to="/register" 
            className="fa-solid fa-user-plus nav-link"></Link>
          </div>
          )
          }
        </nav>
      </header>
      <main className="p-4">
        <Outlet/>
      </main>
    </>
  )
}

export default Layout
