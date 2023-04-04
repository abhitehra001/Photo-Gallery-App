const { registerUser, loginUser, logoutUser, userInfo } = require("../controllers/User");

const router = require("express").Router();
const { authenticate } = require("../authentication/Auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/info", authenticate, userInfo);

module.exports = router;