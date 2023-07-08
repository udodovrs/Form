import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './yapAndForm.module.css';


const fieldsSchema = yup
	.object()
	.shape({
		email: yup.string().email('неправильный email'),
		password: yup
			.string()
			.matches(
				/^(?=.*[a-zA-Z])(?=.*\d).*$/,
				'Пароль должен содержать латинские буквы и цифры',
			)
			.max(20, 'Пароль не должен быть больше 20 символов')
			.min(6, 'Пароль не должен быть не меньше 6 символов'),
		repeatPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
	})
	.required();

export const YapAndForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(fieldsSchema) });

	const onSubmit = ({ email, password, repeatPassword }) =>
		console.log({ email, password, repeatPassword });

	const emailMessage = errors.email?.message;
	const pasMessage = errors.password?.message;
	const repPasMessage = errors.repeatPassword?.message;

	return (
		<div className={styles.wraper}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.classForm}>
				<div>Регистрация Form and Yap</div>
				<div className={styles.error}>{emailMessage}</div>
				<input
					type="email"
					placeholder="email"
					className={styles.formInput}
					{...register('email')}
				/>
				<div className={styles.error}>{pasMessage}</div>
				<input
					type="password"
					placeholder="пароль"
					className={styles.formInput}
					{...register('password')}
				/>
				<div className={styles.error}>{repPasMessage}</div>
				<input
					type="password"
					placeholder="повторите пароль"
					className={styles.formInput}
					{...register('repeatPassword')}
				/>
				<button type="submit" disabled={!!emailMessage} className={styles.btn}>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
