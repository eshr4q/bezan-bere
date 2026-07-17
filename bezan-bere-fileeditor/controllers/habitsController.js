const { readMonthData, writeMonthData } = require("../utils/fileUtils");

const getQueryParams = (req) => ({
  year: Number(req.query.year),
  month: Number(req.query.month)
});

const isValidYearMonth = (year, month) => (
  Number.isInteger(year) &&
  Number.isInteger(month) &&
  year > 0 &&
  month >= 1 &&
  month <= 12
);

const validateYearMonth = (res, year, month) => {
  if (!isValidYearMonth(year, month)) {
    res.status(400).json({ error: "valid year and month query parameters are required" });
    return false;
  }
  return true;
};

// GET /habits?year=2026&month=5
async function getHabits(req, res) {
  try {
    const { year, month } = getQueryParams(req);
    if (!validateYearMonth(res, year, month)) return;

    const data = await readMonthData(year, month);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read habits" });
  }
}

// POST /habits?year=2026&month=5
async function saveHabits(req, res) {
  try {
    const { year, month } = getQueryParams(req);
    if (!validateYearMonth(res, year, month)) return;
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "habits array is required" });

    await writeMonthData(year, month, { year, month, habits: req.body });
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save habits" });
  }
}

// POST /habits/add?year=2026&month=5
async function addHabit(req, res) {
  try {
    const { year, month } = getQueryParams(req);
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    if (!validateYearMonth(res, year, month)) return;
    if (!name) return res.status(400).json({ error: "name is required" });

    const data = await readMonthData(year, month);

    const newHabit = {
      id: Date.now(),
      name,
      days: {}
    };

    data.habits.push(newHabit);
    await writeMonthData(year, month, data);

    res.status(201).json({ status: "created", habit: newHabit });
  } catch (error) {
    res.status(500).json({ error: "Failed to add habit" });
  }
}

// DELETE /habits/:id?year=2026&month=5
async function deleteHabit(req, res) {
  try {
    const { year, month } = getQueryParams(req);
    const id = Number(req.params.id);
    if (!validateYearMonth(res, year, month)) return;
    if (!Number.isFinite(id)) return res.status(400).json({ error: "valid habit id is required" });

    const data = await readMonthData(year, month);
    const originalLength = data.habits.length;

    data.habits = data.habits.filter(h => h.id !== id);
    if (data.habits.length === originalLength) {
      return res.status(404).json({ error: "habit not found" });
    }

    await writeMonthData(year, month, data);
    res.json({ status: "deleted", id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
}

// PATCH /habits/update-day?year=2026&month=5
async function updateDay(req, res) {
  try {
    const { habitId, date, value } = req.body;
    const { year, month } = getQueryParams(req);
    const id = Number(habitId);
    if (!validateYearMonth(res, year, month)) return;
    if (!Number.isFinite(id)) return res.status(400).json({ error: "valid habitId is required" });
    if (typeof date !== "string" || !date) return res.status(400).json({ error: "date is required" });
    if (typeof value !== "boolean") return res.status(400).json({ error: "value must be boolean" });

    const data = await readMonthData(year, month);
    const habit = data.habits.find(h => h.id === id);

    if (!habit) return res.status(404).json({ error: "habit not found" });

    habit.days = habit.days || {};
    habit.days[date] = value;
    await writeMonthData(year, month, data);

    res.json({ status: "ok", habit });
  } catch (error) {
    res.status(500).json({ error: "Failed to update habit day" });
  }
}

// PUT /habits/:id/name?year=2026&month=5
async function updateHabitName(req, res) {
  try {
    const { year, month } = getQueryParams(req);
    const id = Number(req.params.id);
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    if (!validateYearMonth(res, year, month)) return;
    if (!Number.isFinite(id)) return res.status(400).json({ error: "valid habit id is required" });
    if (!name) return res.status(400).json({ error: "name is required" });

    const data = await readMonthData(year, month);
    const habit = data.habits.find(h => h.id === id);

    if (!habit) return res.status(404).json({ error: "habit not found" });

    habit.name = name;
    await writeMonthData(year, month, data);

    res.json({ status: "ok", habit });
  } catch (error) {
    res.status(500).json({ error: "Failed to update habit name" });
  }
}

module.exports = {
  getHabits,
  saveHabits,
  addHabit,
  deleteHabit,
  updateDay,
  updateHabitName,
};
