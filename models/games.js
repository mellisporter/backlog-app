const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	title: String,
	console: String,
    releaseYear: String,
    coverURL: String,
    review: String,
    hasCompleted: String,
}, 
// {
//     timestamps: true
// }
);

const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    games: [gameSchema],
})

const Game = mongoose.model('Game', gameSchema);
const User = mongoose.model('User', userSchema);

module.exports = Game;
// trying to export a User seperately broke my crud functionality, so commenting out for now.
// module.exports = User;