exports.forEmailVerification = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).send("Invalid email format");
  }
  next();
};

exports.forPasswordverification = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long");
  }
  next();
};
