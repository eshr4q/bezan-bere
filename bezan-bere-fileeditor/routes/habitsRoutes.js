const express = require("express");
const router = express.Router();
const controller = require("../controllers/habitsController");

router.get("/", controller.getHabits);
router.post("/", controller.saveHabits);
router.post("/add", controller.addHabit);
router.delete("/:id", controller.deleteHabit);
router.patch("/update-day", controller.updateDay);

module.exports = router;

