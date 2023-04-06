const errorHandler = (err, req, res, next) => {
	if (err instanceof Sequelize.ValidationError) {
		return res.status(400).json({
			message: "Validation error",
			errors: err.errors.map((error) => ({
				field: error.path,
				message: error.message,
			})),
		});
	}

	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({
			message: err.message,
			errors: err.errors,
		});
	}

	console.error(err);
	res.status(500).json({ message: "Server Error" });
};

module.exports = errorHandler;
