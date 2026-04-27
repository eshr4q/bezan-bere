const fs = require("fs-extra");
const path = require("path");
const { DATA_DIR } = require("../config/paths");

function getYearFile(year) {
  return path.join(DATA_DIR, `habits-${year}.json`);
}

async function ensureYearFile(year) {
  const file = getYearFile(year);
  await fs.ensureDir(DATA_DIR);

  if (!(await fs.pathExists(file))) {
    await fs.writeJson(file, { year, habits: [] }, { spaces: 2 });
  }

  return file;
}

async function readYearData(year) {
  const file = await ensureYearFile(year);
  return fs.readJson(file);
}

async function writeYearData(year, data) {
  const file = getYearFile(year);
  await fs.writeJson(file, data, { spaces: 2 });
}

module.exports = {
  ensureYearFile,
  readYearData,
  writeYearData,
};
