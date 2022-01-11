const express = require("express");
const router = express.Router();

const AccountController = require("../controllers/accountController");
const SearchController = require("../controllers/searchController");

const accountController = new AccountController();
const searchController = new SearchController();


router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.get("/search", searchController.search);

module.exports = router;

// http://localhost:3000/search?title=metro 2033 bad request
// http://localhost:3000/search?title=Metro 2033