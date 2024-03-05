export function authMiddleware(req, res, next) {
	const authHeader = req.get("Authorization");
	if (authHeader !== process.env.SECRET_KEY) {
		res.status(403).json("Not authorised");
		return;
	}
	next();
}
