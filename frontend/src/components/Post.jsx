
const Post = ({ post, children }) => {

  return (
  <div className="border rounded-xl border-slate-400 p-4 my-2">
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <i className="fa-solid fa-user w-8 h-8 items-center flex justify-center p-2 rounded-full bg-slate-400"></i>
        <div >
          <p className="font-bold text-sm">{`${post.username}`}</p>
          <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <h2 className="font-bold text-2xl text-indigo-600 break-words mt-4 ml-2">{post.title}</h2>
    </div>
    <p className="text-sm mt-2 ml-2 break-words">{post.body}</p>
    <div className="pt-4">{children}</div>
  </div>
  )
}
export default Post