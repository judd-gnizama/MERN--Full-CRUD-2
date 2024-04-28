import { useContext, useState } from "react"
import Alert from "../../components/Alert"
import { registerUser } from "../../controllers/usersController";
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from "react-router-dom";

const Register = () => {

  // Use user context
  const { setUser } = useContext(UserContext)

  // Use Navigate Hook
  const navigate = useNavigate();

  // Error State
  const [ error, setError ] = useState(null);
  
  // Form data state
  const [ formData, setFormData ] = useState({
    email: '', 
    password: '', 
    passwordConfirm: '',
    username: '',
  });

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
      await registerUser(
        formData.email, 
        formData.password, 
        formData.passwordConfirm,
        formData.username,
      )
      //Update user state
      setUser({ email: formData.email, posts: []})
      // Navigate to dashboard
      navigate('/dashboard')
      setError(null);

    } catch(error) {
      setError(error.message)
    }

    
  }

  return (
    <section className="card">
      <h1 className="title">Create a new account</h1>
      <form onSubmit={handleRegister}>
        <input 
        type="email" 
        placeholder="Email Address" 
        className="input"
        value={formData.email} 
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
        autoFocus />

        <input 
        type="text" 
        placeholder="Username" 
        className="input"
        value={formData.username} 
        onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
        autoFocus />
        
        <input 
        type="password" 
        placeholder="Password" 
        className="input" 
        value={formData.password} 
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        autoFocus />

        <input 
        type="password" 
        placeholder="Confirm Password" 
        className="input" 
        value={formData.passwordConfirm} 
        onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
        autoFocus />
        <button className="btn">Register</button>

      </form>
      { error && <Alert msg={error}/> }
    </section>
  )
}

export default Register
