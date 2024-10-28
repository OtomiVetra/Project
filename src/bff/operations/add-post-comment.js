import {
	getPost,
	addComment,
	getComments,
	getUsers,
} from '../api';
import { getPostCommentsWithAuthor } from '../utils';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const addPostComment = async (
	hash,
	userId,
	postId,
	content,
) => {
	const accessRoles = [
		ROLE.ADMIN,
		ROLE.MODERATOR,
		ROLE.READER,
	];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await addComment(userId, postId, content);

	const post = await getPost(postId);

	const commentsWithAuthor =
		await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
