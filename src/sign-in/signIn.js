import { useRef, useState } from 'react';
import styles from './signIn.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(true);
	const submitBtnRef = useRef(null);

	const conditionForFocusBtn =
		email.length > 2 &&
		password.length > 5 &&
		password === repeatPassword &&
		!errorMessage;

	const conditionForSubmit = email.length > 2 && password.length > 5;

	let newError = null;

	const onSubmit = (event) => {
		event.preventDefault();
		if (!conditionForSubmit) {
			newError = 'некоторые поля формы не заполнены';
			setErrorMessage(newError);
			return;
		}
		sendData({ email, password });
	};

	if (conditionForFocusBtn) {
		submitBtnRef.current.focus();
	}

	const onBlurEmail = ({ target }) => {
		setEmail(target.value);
		if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(target.value)) {
			newError = 'неправильный email';
		}
		setErrorMessage(newError);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		if (target.value.length > 20) {
			newError = 'Пароль не должен быть больше 20 символов';
		} 
		setErrorMessage(newError);
	};

	const onPasswordBlur = ({ target }) => {
		if (!/^(?=.*[a-zA-Z])(?=.*\d).*$/.test(target.value)) {
			newError = 'Пароль должен содержать латинские буквы и цифры';
		} else if (target.value.length < 6) {
			newError = 'Пароль не должен быть не меньше 6 символов';
		}
		setErrorMessage(newError);
	};

	const onRepeatPasswordBlur = () => {
		if (password !== repeatPassword) {
			newError = `Пароли не совпадают`;
		}
		setErrorMessage(newError);
	};

	return (
		<div className={styles.wraper}>
			<form onSubmit={onSubmit} className={styles.classForm}>
				<div> Регистрация </div>
				<div className={styles.error}>{errorMessage}</div>
				<input
					type="email"
					value={email}
					placeholder="email"
					onChange={({ target }) => setEmail(target.value)}
					onBlur={onBlurEmail}
					className={styles.formInput}
				/>
				<input
					type="password"
					value={password}
					placeholder="пароль"
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
					className={styles.formInput}
				/>
				<input
					type="password"
					value={repeatPassword}
					placeholder="повторите пароль"
					onChange={({ target }) => setRepeatPassword(target.value)}
					onBlur={onRepeatPasswordBlur}
					className={styles.formInput}
				/>
				<button
					type="submit"
					ref={submitBtnRef}
					disabled={!!errorMessage}
					className={styles.btn}
				>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
