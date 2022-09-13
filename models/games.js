const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	title: String,
	console: String,
    releaseDate: Date,
    coverURL: String,
    review: String,
    hasBeaten: Boolean
}, 
// {
//     timestamps: true
// }
);

const gamerSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    games: [gameSchema],
    googleId: String,
})

const Game = mongoose.model('Game', gameSchema);
const Gamer = mongoose.model('User', gamerSchema);

module.exports = Game;
// trying to export a User seperately broke my crud functionality, so commenting out for now.
// module.exports = User;