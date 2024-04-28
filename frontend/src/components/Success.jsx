import { useState } from "react";

const Success = ({ msg }) => {

  const [ show, setShow ] = useState(true);

  setTimeout(() => setShow(false), 2000)

  return <>
    {show && <div className="bg-green-500 text-white p-2 rounded-md my-6 text-sm flex gap-2 items-center">
    <i className="fa-solid fa-circle-check"></i>{msg}</div>}
  </>
}; 
export default Success