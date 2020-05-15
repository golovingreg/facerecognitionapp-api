const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd29124a8f57d4991bfe2f3b3bd77e0a9'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('errror'))

}


const submit = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
	submit: submit,
	handleApiCall: handleApiCall
}