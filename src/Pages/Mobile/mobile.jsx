import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useLogin } from '../../context/Authentication';
import Logo from '../../Assets/images/logo.png'

export default function Mobile() {

  const [token] = useLogin();
	const [courses, setCourses] = useState()

	useEffect(() => {
    fetch('https://courses-backend-tuve.onrender.com/courses', {
      method: 'GET',
      headers: {
        access_token: token
      }
    })
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err))
  })

	const logout = () => {
		window.localStorage.removeItem('token')
		window.location.href = '/';
	}

	if (token === null) {
		window.location.href = '/';
	}

	const { id } = useParams();
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
						<div className='animation start-mobile'></div>
					</nav>
				</header>

				<main className='main'>
					{
            courses && courses.filter(g => g.type == 'mobile').map(a => (
              <div key={a.id} className="card">
								<img className='card_img' src={a.img} alt="Image of card" />
								<div className="card_content">
								<h3 className='card_type'>{a.type}</h3>
								<h2 className='card_header'>{a.title}</h2>
								<p className='card_text'>Price: {a.price}</p>
								</div>
							</div>
            ))
					}
				</main>
			</div>
    </>
  )
}
