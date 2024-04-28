import { useContext, useState } from "react"
import Alert from "../../components/Alert"
import { loginUser } from "../../controllers/usersController";
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from "react-router-dom";

const Login = () => {

  // Use user context
  const { setUser } = useContext(UserContext)

  // Use Navigate Hook
  const navigate = useNavigate();

  // Error State
  const [ error, setError ] = useState(null);
  
  // Form data state
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Login user
      const data = await loginUser(email, password);
      //Update user state
      setUser({ email, posts: [], username: data.username})
      // Navigate to dashboard
      navigate('/dashboard')
      setError(null);
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <section className="card">
      <h1 className="title">Login to your account</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email Address" className="input"
        value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        <input type="password" placeholder="Password" className="input" 
        value={password} onChange={(e) => setPassword(e.target.value)}autoFocus />
        <button className="btn">Login</button>
      </form>

      { error && <Alert msg={error}/> }


    </section>
  )
}

export default Login
