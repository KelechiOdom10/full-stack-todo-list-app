const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

//* @desc Register New User
//* @route POST /api/v1/auth/register
//* @access Public
async function register(req, res, next) {
	try {
		const { username, email, password } = req.body;

		//? Create user
		const user = await User.create({ username, email, password });

		const token = await user.getSignedToken();
		res.status(200);
		res.json({
			status: "success",
			token,
		});
	} catch (error) {
		return next(error);
	}
}

//* @desc Login User
//* @route POST /api/v1/auth/login
//* @access Public
async function login(req, res, next) {
	try {
		const { email, password } = req.body;

		//? Validate email and password
		if (!email || !password) {
			return next(
				new ErrorResponse("Please provide an email and password", 400)
			);
		}

		//? Check for User
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}

		//? Check if passwords match
		const isMatch = await user.checkPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse("Invalid credentials", 401));
		}

		sendTokenResponse(user, 200, res);
	} catch (error) {
		return next(error);
	}
}

//* Get token from Model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
	const token = await user.getSignedToken();
	const { _id, email, username } = user;
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") {
		options.secure = true;
	}

	res.status(statusCode).cookie("token", token, options).json({
		status: "success",
		token,
		user: {
			_id,
			username,
			email,
		},
	});
};

module.exports = { register, login };
