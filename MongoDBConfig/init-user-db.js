db.createUser({
	user: "admin",
	pwd: "1234",
	role: [
		{
			role: "readWrite",
			db: "webAPIMongoDB"
		}
	]
});