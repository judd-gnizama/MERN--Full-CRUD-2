import { useContext, useState } from "react";
import { createPost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostContext);

  // Error State
  const [ error, setError ] = useState(null);

  // Form Data State
  const [ formData, setFormData ] = useState({
    title: "",
    body: "",
  });

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      // Create a new post
      const data = await createPost(formData.title, formData.body)
      // Update Posts State
      setPosts([...posts, data.post])
      // Navigate to Dashboard
      navigate('/dashboard');
      // Clear Error
      setError(null);
    } catch (error) {
      setError(error.message)
    }
  }


  return <section className="card">
    <h1 className="title">Create a new post</h1>
    <form onSubmit={handleCreate}>
      <input 
        type="text"
        placeholder="Post Title"
        className="input"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        autoFocus 
      />
      <textarea
        rows="6"
        placeholder="Post Content"
        value={formData.body}
        onChange={(e) => setFormData({...formData, body: e.target.value})}
        className="input"
      ></textarea>
      <button className="btn">Create</button>
      { error && <Alert msg={error} /> }
    </form>


  </section>
}; export default Create;