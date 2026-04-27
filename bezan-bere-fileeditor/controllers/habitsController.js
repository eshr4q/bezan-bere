const { readYearData, writeYearData } = require("../utils/fileUtils");

// GET /habits?year=2026
async function getHabits(req, res) {
  const year = Number(req.query.year);
  if (!year) return res.status(400).json({ error: "year is required" });

  const data = await readYearData(year);
  res.json(data);
}

// POST /habits?year=2026  (replace all)
async function saveHabits(req, res) {
  const year = Number(req.query.year);
  if (!year) return res.status(400).json({ error: "year is required" });

  await writeYearData(year, { year, habits: req.body });
  res.json({ status: "ok" });
}

// POST /habits/add?year=2026
async function addHabit(req, res) {
  const year = Number(req.query.year);
  if (!year) return res.status(400).json({ error: "year is required" });

  const data = await readYearData(year);

  const newHabit = {
    id: Date.now(),
    name: req.body.name,
    days: {}
  };

  data.habits.push(newHabit);
  await writeYearData(year, data);

  res.json(newHabit);
}

// DELETE /habits/:id?year=2026
async function deleteHabit(req, res) {
  const year = Number(req.query.year);
  const id = Number(req.params.id);

  const data = await readYearData(year);

  data.habits = data.habits.filter(h => h.id !== id);
  await writeYearData(year, data);

  res.json({ status: "deleted", id });
}

// PATCH /habits/update-day?year=2026
async function updateDay(req, res) {
  const { habitId, date, value } = req.body;
  const year = Number(req.query.year);

  const data = await readYearData(year);
  const habit = data.habits.find(h => h.id === habitId);

  if (!habit) return res.status(404).json({ error: "habit not found" });

  habit.days[date] = value;

  await writeYearData(year, data);

  res.json({ status: "ok", habit });
}

module.exports = {
  getHabits,
  saveHabits,
  addHabit,
  deleteHabit,
  updateDay,
};

