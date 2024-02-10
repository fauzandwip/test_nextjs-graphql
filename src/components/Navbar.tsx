import { cookies } from 'next/headers';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export const Navbar = () => {
	return (
		<div className=" fixed top-0 right-0 w-full flex items-center justify-between px-20 bg-blue-300 py-4">
			<Link href={'/'}>
				<h1 className="text-2xl font-bold text-blue-900">Technicall Test</h1>
			</Link>
			{cookies().get('access_token')?.value ? (
				<LogoutButton />
			) : (
				<Link href={'/login'}>
					<button className="btn-submit">Login</button>
				</Link>
			)}
		</div>
	);
};
