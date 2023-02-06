const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorize } = require("../middleware/authorization");

router.get("/", authorize(["admin", "user"]), userController.getAllUser);
router.get("/:id", authorize(["admin", "user"]), userController.getUserbyID);
router.put("/:id", authorize(["admin"]), userController.updateUser);
router.delete("/:id", authorize(["admin"]), userController.deleteUser);

module.exports = router;
