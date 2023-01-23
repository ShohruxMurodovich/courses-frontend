import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/images/logo.png';

export default function Register() {
	const handleAdd = (e) =>{

		e.preventDefault();

    const { name,  email,  password } = e.target;

    fetch('https://courses-backend-tuve.onrender.com/add/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
        email: email.value,
        password: password.value
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

      window.location.href = '/'
  }

	return (
		<>
			<div className='container'>
				<header className='header'>
					<img className='logo' src={Logo} alt='Logo img' />
					<nav>
						<Link to={'/'}>Login</Link>
						<Link to={'/register'}>Sign Up</Link>
						<div className='animation start-signup'></div>
					</nav>
				</header>

				<main>
					<div className='center'>
						<h1 className='title'>Sign Up</h1>
						<form onSubmit={handleAdd} autoComplete='off' className='form' method='POST'>

						<div className='txt_field'>
								<input type='text' name='name' required />
								<span></span>
								<label>Name</label>
							</div>

							<div className='txt_field'>
								<input type='text' name='email' required />
								<span></span>
								<label>Email</label>
							</div>

							<div className='txt_field'>
								<input name='password' type='password' required />
								<span></span>
								<label>Password</label>
							</div>

							<button className='btn' type='submit'>
							 SignUp
							</button>
							<div className='signup_link'>
								Have a account? <Link to={'/'}>Login</Link>
							</div>
						</form>
					</div>
				</main>
			</div>
		</>
	);
}
