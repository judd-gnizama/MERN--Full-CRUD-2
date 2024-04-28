const Alert = ({ msg }) => {

  return <div className="bg-red-500 text-white p-2 rounded-md mt-6 text-sm flex gap-2 items-center">
    <i className="fa-solid fa-triangle-exclamation"></i>{msg}</div>
}; 
export default Alert