const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter a username"],
	},
	email: {
		type: String,
		trim: true,
		required: [true, "Please enter an email address"],
		minlength: 5,
		maxlength: 255,
		unique: true,
		match: [
			// /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+(\.\w{2,3})+$/,
			"Please enter a valid email address",
		],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: 6,
		maxlength: 40,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.methods.checkPassword = async function (userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password);
	return isMatch;
};

userSchema.methods.getSignedToken = async function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.pre("save", async function (next) {
	const hasPasswordChanged = this.isModified("password");
	if (hasPasswordChanged) {
		const encryptedPassword = await bcrypt.hash(this.password, saltRounds);
		this.password = encryptedPassword;
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
