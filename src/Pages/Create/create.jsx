import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from '../../Assets/images/logo.png'
import { useLogin } from '../../context/Authentication'

import "./create.css"
export default function Create() {
	const { id } = useParams();

	const handleAdd = (e) => {
    e.preventDefault();

    const { title, price, type,  img } = e.target;

    fetch('https://courses-backend-tuve.onrender.com/add/course/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        price: price.value,
        type: type.value,
        img: img.value,
				user_id: id
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))

			window.location.href = `/home/${id}`
  }

  const logout = () => {
		window.localStorage.removeItem('token')
		window.location.href = '/';
	}

  return (
    <>
    		<div className='container'>
				  <header className='header'>
					<img className='logo' src={Logo} alt='Logo img' />
					<nav className='nav'>
					<Link className='nav_link' to={`/home/${id}`}>Home</Link>
						<Link className='nav_link' to={`/web/${id}`}>Web</Link>
						<Link className='nav_link' to={`/mobile/${id}`}>Mobile</Link>
						<Link className='nav_link' to={`/design/${id}`}>Design</Link>
						<Link className='nav_link' to={`/create/${id}`}>Create Course</Link>
						<Link className='nav_link' to={`/list/${id}`}>Course List</Link>
						<a onClick={logout} className='nav_link'>Log Out</a>
						<div className='animation start-create'></div>
					</nav>
				</header>

        <main>
					<div className='center'>
						<h1 className='title'>Create Course</h1>
						<form onSubmit={handleAdd} autoComplete='off' className='form' method='POST'>

						<div className='txt_field'>
								<input type='text' name='title' required />
								<span></span>
								<label>Title</label>
							</div>

							<div className='txt_field'>
								<input type='number' name='price' required />
								<span></span>
								<label>Price</label>
							</div>

							<select className='select' name="type">
								<option className='option' value="web">Web</option>
								<option className='option' value="mobile">Mobile</option>
								<option className='option' value="design">Design</option>
							</select>

							<div className='txt_field'>
								<input name='img' type='text' required />
								<span></span>
								<label>Img</label>
							</div>

							<button className='btn' type='submit'>
							 Create
							</button>
						</form>
					</div>

        </main>


        </div>
    </>
  )
}
