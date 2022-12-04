const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    // const tmp = req.headers.authorization;
    const tmp = req.header('Authorization');
    const token = tmp ? tmp.split(" ")[1] : null;
    if (!token) {
      // return res.status(401).json({
      return res.status(400).json({
        message: "you are not authorized to access this resource",
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            // return res.status(401).json({
            return res.status(400).json({
                message: "you are not authorized to access this resource"})
        }
        req.user = user;
        next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
