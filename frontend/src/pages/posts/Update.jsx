import { useContext, useState } from "react";
import { createPost, updatePost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { posts, setPosts } = useContext(PostContext);

  // Error State
  const [ error, setError ] = useState(null);

  // Form Data State
  const [ formData, setFormData ] = useState({
    title: state.title,
    body: state.body,
  });

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      // Update post
      const data = await updatePost(state._id,formData.title, formData.body)
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
    <h1 className="title">Update post</h1>
    <form onSubmit={handleUpdate}>
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
      <button className="btn">Update</button>
      { error && <Alert msg={error} /> }
    </form>


  </section>
}; export default Update;