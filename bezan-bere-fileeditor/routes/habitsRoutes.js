const express = require("express");
const router = express.Router();
const controller = require("../controllers/habitsController");

router.get("/", controller.getHabits);
router.post("/", controller.saveHabits);
router.post("/add", controller.addHabit);
router.patch("/update-day", controller.updateDay);
router.put("/:id/name", controller.updateHabitName); // مسیر ویرایش عنوان هبیت
router.delete("/:id", controller.deleteHabit);

module.exports = router;
