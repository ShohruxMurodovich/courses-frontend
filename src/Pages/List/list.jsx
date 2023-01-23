import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Logo from '../../Assets/images/logo.png'
import { useLogin } from '../../context/Authentication';
import Delete from '../../Assets/images/delete.png'
import Edit from '../../Assets/images/edit.png'

import './list.css'


export default function List() {
	const [token] = useLogin();

  const [courses, setCourses] = useState()
  const [active, setActive] = useState()


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


  const handleDel = (id) => {
    fetch('https://courses-backend-tuve.onrender.com/del/course/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))

      window.location.href = `/list/${id}`
  }

  const handleChange = (e) => {
    e.preventDefault();

    const { title, price, type,  img } = e.target;

    fetch('https://courses-backend-tuve.onrender.com/edit/course/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        price: price.value,
        type: type.value,
        img: img.value,
        user_id: id,
        id: active
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))


      setActive(false)
      window.location.href = `/list/${id}`
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
						<div className='animation start-list'></div>
					</nav>
				</header>

        <main>
          <div className='column'>
            <h2 className='column_title'>ID</h2>
            <h2 className='column_title'>TITLE</h2>
            <h2 className='column_title'>Price</h2>
            <h2 className='column_title'>TYPE</h2>
            <h2 className='column_title'>IMG</h2>
            <h2 className='column_title'>ACTIONS</h2>
          </div>

          {
            courses && courses.filter(a => a.user_id = id).map(g => (
              <div className='column filtered'>
              <h2 className='column_title'>{g.id}</h2>
              <h2 className='column_title'>{g.title}</h2>
              <h2 className='column_title'>{g.price}</h2>
              <h2 className='column_title'>{g.type}</h2>
              <img className='column_img' src={g.img} alt="Course img" />
              <div className="buttons">
                    <button onClick={() => handleDel(g.id)} className='button'><img className='button_img' src={Delete} alt="Delete icon" /></button>
                    <button onClick={() => setActive(g.id)} className='button'><img className='button_img edit_img' src={Edit} alt="Edit icon" /></button>
                </div>
            </div>
            ))
          }

        </main>
      </div>


      <div onClick={() => setActive(false)} className={active ? "modal active" : "modal"}>
        <div onClick={e => e.stopPropagation()} className='modal__content'>

            {
              courses && courses.filter(a => a.id == active).map(g => (
                <div className='center'>
						<h1 className='title'>Edit Course</h1>
						<form onSubmit={handleChange} autoComplete='off' className='form' method='POST'>

						<div className='txt_field'>
								<input type='text' name='title' required  defaultValue={g.title}/>
								<span></span>
								<label>Title</label>
							</div>

							<div className='txt_field'>
								<input type='number' name='price' required defaultValue={g.price} />
								<span></span>
								<label>Price</label>
							</div>

							<select className='select' defaultValue={g.type} name="type">
								<option className='option' value="web">Web</option>
								<option className='option' value="mobile">Mobile</option>
								<option className='option' value="design">Design</option>
							</select>

							<div className='txt_field'>
								<input name='img' type='text' required  defaultValue={g.img}/>
								<span></span>
								<label>Img</label>
							</div>

							<button className='btn' type='submit'>
							 Edit
							</button>
						</form>
					</div>
              ))
            }
        </div>
      </div>


      </>
  )
}
