export const transformUser = (dbUser) => ({
	id: dbUser,
	login: dbUser.login,
	password: dbUser.password,
	registeredAt: dbUser.registed_at,
	roleId: dbUser.role_id,
});
