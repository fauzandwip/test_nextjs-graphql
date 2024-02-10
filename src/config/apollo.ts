import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

let client: ApolloClient<any> | null = null;

export const createApolloClient = () => {
	if (!client || typeof window === 'undefined') {
		client = new ApolloClient({
			link: createHttpLink({
				uri: 'http://207.148.68.106:2301/query',
			}),
			cache: new InMemoryCache(),
		});
	}

	return client;
};
