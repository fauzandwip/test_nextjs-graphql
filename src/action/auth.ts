'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logoutAction = () => {
	cookies().get('access_token')?.value && cookies().delete('access_token');

	redirect('/login');
};
