import { transformPost } from '../transformers';

export const getPosts = (
	searchPhrase = '',
	page = 1,
	limit = 10,
) => {
	const encodedSearchPhrase =
		encodeURIComponent(searchPhrase);
	return fetch(
		`http://localhost:3005/posts?title_like=${encodedSearchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((response) =>
			Promise.all([
				response.json(),
				response.headers.get('Link'),
			]),
		)
		.then(([posts, links]) => ({
			posts: posts.map(transformPost),
			links,
		}));
};
