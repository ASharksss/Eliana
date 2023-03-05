import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { fetchLogin } from '../redux/slices/authSlice';

const Auth = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			username: username,
			password: password
		}
		dispatch(fetchLogin(data))
	}
	return (
		<div classname='auth_container'>
			<form className="auth_form" onSubmit={e => handleSubmit(e)}>
				<h1>ВХОД</h1>
				<div className="input">
					<input type="text" placeholder='Логин'
					onChange={e => setUsername(e.target.value)}/>
				</div>
				<div className="input">
					<input type="password" placeholder='Пароль'
					onChange={e => setPassword(e.target.value)}/>
				</div>

				<button type="submit">Войти</button>
			</form>
		</div>
	);
};

export default Auth;