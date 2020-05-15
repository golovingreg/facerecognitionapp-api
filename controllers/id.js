const getId = (req, res, db) => {
	const { id } = req.params;
	db.select('*')
		.where({
			id: id
		})
		.from('users')
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('user not found');
			}
			
		})
		.catch(err => res.status(400).json('error getting user'));
}

module.exports = {
	getId: getId
}