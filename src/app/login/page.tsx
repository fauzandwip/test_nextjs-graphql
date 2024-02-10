import { gql, ApolloError } from '@apollo/client';
import { createApolloClient } from '../../config/apollo';
import { cookies } from 'next/headers';

const USER_LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			refreshToken
			name
			email
			permissions {
				id
				name
				feature
			}
		}
	}
`;

const Login = () => {
	const handleOnLogin = async (formData: FormData) => {
		'use server';
		try {
			const email = formData.get('email');
			const password = formData.get('password');

			const client = createApolloClient();
			const { data } = await client.mutate({
				mutation: USER_LOGIN,
				variables: {
					email,
					password,
				},
			});

			cookies().set('access_token', data.login.token);
		} catch (error) {
			if (error instanceof ApolloError) {
				console.log('GraphQL Error:', error.message);
				console.log('GraphQL GraphQLErrors:', error.graphQLErrors);
				console.log('GraphQL NetworkError:', error.networkError);
			} else {
				console.error('Non-GQL Error:', error);
			}
		}
	};

	return (
		<div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-gray-500  to-gray-900">
			<div className="w-3/4 h-3/4 flex flex-col justify-center items-center gap-8">
				{/* title */}
				<div className="w-full py-4 px-10 rounded-xl bg-slate-100">
					<h1 className="text-3xl font-bold">Login</h1>
				</div>

				{/* login form */}
				<form
					action={handleOnLogin}
					className="w-full h-max flex flex-col gap-8 bg-slate-100 p-8 rounded-xl"
				>
					{/* email */}
					<label
						htmlFor="email-form"
						className="flex flex-col gap-2 font-medium"
					>
						E-mail
						<input
							type="email"
							name="email"
							id="email-form"
							placeholder="email@gmail.com"
							className=" input-text"
						/>
					</label>

					{/* password */}
					<label
						htmlFor="password-form"
						className="flex flex-col gap-2 font-medium"
					>
						Password
						<input
							type="password"
							name="password"
							id="password-form"
							placeholder="password"
							className=" input-text"
						/>
					</label>

					{/* login button */}
					<input type="submit" value="Login" className="btn-submit" />
				</form>
			</div>
		</div>
	);
};

export default Login;
