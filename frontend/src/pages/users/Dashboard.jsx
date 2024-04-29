import { useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postsController";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {
  // Use User context
  const { user, setUser } = useContext(UserContext);

  // Loading State
  const [ loading, setLoading ] = useState(true);

  // Error State
  const [ error, setError ] = useState(null);

  // Success State
  const [ success, setSuccess ] = useState(null);



  // Handle Delete Post
  const handleDelete = async (_id) => {

    if (confirm("Confirm delete?")) {
      try {
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message)
      }
      const newPosts = user.posts.filter(post => post._id !== _id)
      setUser({...user, posts: newPosts})
    }

  }

  useEffect(() => {
    setTimeout(async () => {
      const email = localStorage.getItem('email');
      const { userPosts } = await getUserPosts();
      setUser({...user, email: email, posts: userPosts})
      setLoading(false);
    }, 1000)
  }, [])

  return( 
  <section className="card">

    <h1 className="title">User Dashboard</h1>
    <p className="mb-8">{user.username}</p>

    {loading && (
        <i className="fa-solid fa-arrow-rotate-right animate-spin text-3xl text-center block"></i>
      )}
    
    { success && <Success msg={success}/>}
    { error && <Alert msg={error}/>}

    { user.posts?.map((post, index) => (
      <div key={index}>
        <Post post={post}>
          <div className="flex items-center gap-2">
            <Link className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
            title="Update"
            state={post}
            to="/update"
            ></Link>
            <button className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
            title="Delete"
            onClick={() => handleDelete(post._id)}
            ></button>
          </div>
        </Post>
      </div>
    ))}



  </section>
  )
};
export default Dashboard