Области хранения данных:
		- json-server
		- BFF
		- redux store


Сущности приложения:
		- пользователь: БД(список пользователей), BFF(сессия текущего),
			redux store(отображение в браузере)
		- роль пользователя: БД(список ролей), BFF(текущая роль), store(испльзование текущей)
		- статья: БД(список статей), store(отображение в браузере),
		- комментарии: БД(список), store(отображение в браузере)


Таблицы БД:
		- пользователи - users: id / login / password / registed_at /
			role_id
		- роли - roles: id / name
		- статьи - posts: id / title / image_url / content / published_at
		- комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:
		- сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте):
		- user: id / login / roleId / session
		- posts: массив post: id / title / imageUrl / publishedAt /
			commentsCount
		- post: id / title / imageUrl / content / publishedAt /
			comments: массив comment: id / author / content / publishedAt
		- users: массив user: id / login / registeredAt / role
