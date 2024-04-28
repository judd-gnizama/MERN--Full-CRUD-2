const backendBaseURL = "https://mern-full-crud-2.vercel.app"


// ------------------------ LOGIN USER ----------------------------

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error('All fields are required')
  }

  const res = await fetch(`${backendBaseURL}/api/users/login`, {
    method: 'POST', 
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('username', data.username);
  localStorage.setItem('email', data.email);


  return data;

};


// ------------------------ REGISTER USER ----------------------------
const registerUser = async (email, password, passwordConfirm, username) => {
  if (!email || !username || !password || !passwordConfirm) {
    throw Error("All fields are required");
  }

  if (password !== passwordConfirm) {
    throw Error("Passwords do not match");
  }

  const res = await fetch(`${backendBaseURL}/api/users`, {
    method: 'POST', 
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ email, password, username: `@${username.toLowerCase()}` })
  })

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('email', data.email);
  localStorage.setItem('username', data.username);

  return data;


}
export { loginUser, registerUser }