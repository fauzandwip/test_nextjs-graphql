'use client';

import { logoutAction } from '@/action/auth';

export const LogoutButton = () => {
	return (
		<button onClick={() => logoutAction()} className="btn-logout">
			Logout
		</button>
	);
};
