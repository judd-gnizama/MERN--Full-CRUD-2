import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext"
import Post from "../../components/Post";

const Home = () => {
  // use Post Context
  const { posts, setPosts } = useContext(PostContext)

  // Loading state
  const [ loading, setLoading ] = useState(true);

  // Grab all post on page load
  useEffect(() => {
    setTimeout( async () => { 
      const data = await getPosts()
      // Update Post state
      setPosts(data.posts);
      // Remove loading
      setLoading(false);
    }, 500)
  }, [])


  return (
    <section className="card">
      <h1 className="title">Latest Posts</h1>

      {loading && (
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-arrow-rotate-right animate-spin text-3xl text-center block"></i>
        </div>
      )}

      { posts?.map((post, index) => <div key={index}>
        <Post post={post} />
      </div>) }
    </section>
  )
}
export default Home;