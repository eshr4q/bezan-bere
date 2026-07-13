const { readMonthData, writeMonthData } = require("../utils/fileUtils");

// تابع کمکی برای دریافت year و month از کوئری
const getQueryParams = (req) => ({
  year: Number(req.query.year),
  month: Number(req.query.month)
});

// GET /habits?year=2026&month=5
async function getHabits(req, res) {
  const { year, month } = getQueryParams(req);
  if (!year || !month) return res.status(400).json({ error: "year and month are required" });

  const data = await readMonthData(year, month);
  res.json(data);
}

// POST /habits?year=2026&month=5
async function saveHabits(req, res) {
  const { year, month } = getQueryParams(req);
  if (!year || !month) return res.status(400).json({ error: "year and month are required" });

  await writeMonthData(year, month, { year, month, habits: req.body });
  res.json({ status: "ok" });
}

// POST /habits/add?year=2026&month=5
async function addHabit(req, res) {
  const { year, month } = getQueryParams(req);
  if (!year || !month) return res.status(400).json({ error: "year and month are required" });

  const data = await readMonthData(year, month);

  const newHabit = {
    id: Date.now(),
    name: req.body.name,
    days: {}
  };

  data.habits.push(newHabit);
  await writeMonthData(year, month, data);

  res.json(newHabit);
}

// DELETE /habits/:id?year=2026&month=5
async function deleteHabit(req, res) {
  const { year, month } = getQueryParams(req);
  const id = Number(req.params.id);

  const data = await readMonthData(year, month);

  data.habits = data.habits.filter(h => h.id !== id);
  await writeMonthData(year, month, data);

  res.json({ status: "deleted", id });
}

// PATCH /habits/update-day?year=2026&month=5
async function updateDay(req, res) {
  const { habitId, date, value } = req.body;
  const { year, month } = getQueryParams(req);

  const data = await readMonthData(year, month);
  const habit = data.habits.find(h => h.id === habitId);

  if (!habit) return res.status(404).json({ error: "habit not found" });

  habit.days[date] = value;
  await writeMonthData(year, month, data);

  res.json({ status: "ok", habit });
}

// PUT /habits/:id/name?year=2026&month=5  <--- اضافه شده برای ویرایش نام
async function updateHabitName(req, res) {
  const { year, month } = getQueryParams(req);
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "name is required" });

  const data = await readMonthData(year, month);
  const habit = data.habits.find(h => h.id === id);

  if (!habit) return res.status(404).json({ error: "habit not found" });

  habit.name = name;
  await writeMonthData(year, month, data);

  res.json({ status: "ok", habit });
}

module.exports = {
  getHabits,
  saveHabits,
  addHabit,
  deleteHabit,
  updateDay,
  updateHabitName, // صادر کردن تابع جدید
};
