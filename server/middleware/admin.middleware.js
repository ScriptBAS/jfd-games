const User = require("../models/User");

module.exports = async (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const data = await User.findById(req.user._id);

		req.user.isAdmin = data.isAdmin;

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
	}
};
