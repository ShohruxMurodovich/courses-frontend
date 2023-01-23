import React, { useEffect, useState } from 'react';
import { useLogin } from '../../context/Authentication';
import Delete from "../../Assets/images/delete.png";
import Edit from "../../Assets/images/edit.png"

import './admin.css';

export default function Admin() {
	const [token] = useLogin();
	const [users, setUsers] = useState();
	const [selected, setSelected] = useState(null);
	const [courses, setCourses] = useState(null);
  const [active, setActive] = useState()
  const [show, setShow] = useState()

	useEffect(() => {
		fetch('https://courses-backend-tuve.onrender.com/users', {
			method: 'GET',
			headers: {
				access_token: token,
			},
		})
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => console.log(err));
	});

	const toggle = (id) => {
    fetch('https://courses-backend-tuve.onrender.com/courses', {
      method: 'GET',
      headers: {
        access_token: token
      }
    })
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err))

		if (selected == id) {
			return selected(null);
		}

		setSelected(id);
	};

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
  }

  const handleRemove = (id) => {
    fetch('https://courses-backend-tuve.onrender.com/del/user/', {
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
        user_id: selected,
        id: active
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))


      setActive(false)
      window.location.href = `/admin`
    }

    const handleEdit = (e) => {
      e.preventDefault();

      const { name, email, password } = e.target;

      fetch('https://courses-backend-tuve.onrender.com/edit/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          id: show
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))


        setShow(false)
    }

	return (
		<>
			<h1 className='admin_title'>Admin</h1>
			<div className='wrapper'>
				<div className='accordion'>
					{users &&
						users.map((a) => (
							<div className='item'>
								<div className='item_title' onClick={() => toggle(a.id)}>
									<div className='item_data'>
										<h4>
											Name: <span>{a.name}</span>
										</h4>
										<h4>
											Email: <span>{a.email}</span>
										</h4>
										<h4>
											Password: <span>{a.password}</span>
										</h4>
									</div>
                  <div className="buttons">
                       <button onClick={() => handleRemove(a.id)} className='button'><img className='button_img' src={Delete} alt="Delete icon" /></button>
                        <button onClick={() => setShow(a.id)} className='button'><img className='button_img edit_img' src={Edit} alt="Edit icon" /></button>
                    </div>
								</div>

								<div className={selected == a.id ? 'show' : 'item_content'}>
									<h3>Courses List</h3>
									<div className='admin_column'>
										<h2 className='admin_column_title'>ID</h2>
										<h2 className='admin_column_title'>TITLE</h2>
										<h2 className='admin_column_title'>Price</h2>
										<h2 className='admin_column_title'>TYPE</h2>
										<h2 className='admin_column_title'>IMG</h2>
										<h2 className='admin_column_title'>ACTIONS</h2>
									</div>
                  {
                       courses && courses.filter(a => a.user_id == selected).map(g => (
                     <div className='admin_column filtered'>
                     <h2 className='admin_column_title'>{g.id}</h2>
                     <h2 className='admin_column_title'>{g.title}</h2>
                     <h2 className='admin_column_title'>{g.price}</h2>
                     <h2 className='admin_column_title'>{g.type}</h2>
                     <img className='admin_column_img' src={g.img} alt="Course img" />
                     <div className="buttons">
                       <button onClick={() => handleDel(g.id)} className='button'><img className='button_img' src={Delete} alt="Delete icon" /></button>
                        <button onClick={() => setActive(g.id)} className='button'><img className='button_img edit_img' src={Edit} alt="Edit icon" /></button>
                    </div>
            </div>
            ))
          }
								</div>
							</div>
						))}
				</div>
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


      <div onClick={() => setShow(false)} className={show ? "modal actived" : "modal"}>
        <div onClick={e => e.stopPropagation()} className='modal__content'>

            {
              users && users.filter(a => a.id == show).map(g => (
                <div className='center'>
						    <h1 className='title'>Edit User</h1>
						<form onSubmit={handleEdit} autoComplete='off' className='form' method='POST'>

						<div className='txt_field'>
								<input type='text' name='name' required  defaultValue={g.name}/>
								<span></span>
								<label>Name</label>
							</div>

							<div className='txt_field'>
								<input type='text' name='email' required defaultValue={g.email} />
								<span></span>
								<label>Email</label>
							</div>

							<div className='txt_field'>
								<input name='password' type='text' required  defaultValue={g.password}/>
								<span></span>
								<label>Password</label>
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
	);
}
