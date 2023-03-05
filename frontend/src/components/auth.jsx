import React from 'react';

const Auth = () => {
	return (
		<div classname='auth_container'>
			<form className="auth_form">
				<h1>ВХОД</h1>
				<div className="input">
					<input type="username" placeholder='Логин'/>
				</div>
				<div className="input">
					<input type="password" placeholder='Пароль'/>
				</div>

				<button type="submit">Войти</button>
			</form>
		</div>
	);
};

export default Auth;