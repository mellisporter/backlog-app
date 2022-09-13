const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    games: [gameSchema],
    googleId: String,
})

const gameSchema = new Schema({
	title: String,
	console: String,
    releaseDate: Date,
    coverURL: String,
    review: String,
    hasBeaten: Boolean
}, {
    timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;