import React from 'react'
import { Link, useParams } from 'react-router-dom'
import "./login.css"
import Logo from '../../Assets/images/logo.png'
import { useLogin } from '../../context/Authentication';

export default function Login() {

  const [token, setToken] = useLogin();
  const params = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();

		const { email, password } = e.target;

		fetch('https://courses-backend-tuve.onrender.com/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {setToken(data?.access_token)
        if(token) {
          window.location.href = `/home/${data.id}`
        }
      })
			.catch((err) => console.log(err));
  }
  return (
    <>
    <div className="container">
    <header className='header'>
      <img className='logo' src={Logo} alt="Logo img" />
      <nav>
        <Link to={'/'}>Login</Link>
        <Link to={'/register'}>Sign Up</Link>
        <div className="animation start-login"></div>
      </nav>
    </header>

    <main>
      <div className="center">
        <h1 className='title'>Login</h1>
      <form onSubmit={handleSubmit} autoComplete='off' className='form' method='POST'>

      <div className="txt_field">
        <input type="text" name='email' required />
        <span></span>
        <label>Email</label>
      </div>

      <div className="txt_field">
        <input name='password' type="password" required />
        <span></span>
        <label>Password</label>
      </div>

      <div className="pass">Forgot Password?</div>
      <button className='btn' type='submit'>Login</button>
      <div className="signup_link">
        Not a member? <Link to={'/register'}>SignUp</Link>
      </div>
      </form>
      </div>
    </main>
    </div>
    </>
  )
}
