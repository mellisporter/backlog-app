const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	title: String,
	console: String,
    releaseDate: Date,
    coverURL: String,
    review: String,
    hasBeaten: Boolean
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;