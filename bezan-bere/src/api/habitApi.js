// needs revision
const API = `http://${window.location.hostname}:5001`;

export async function fetchHabits(year, month) {
  const res = await fetch(`${API}/habits?year=${year}&month=${month}`);
  return res.json();
}

export async function toggleDay(year, month, habitId, date, value) {
  const res = await fetch(`${API}/habits/update-day?year=${year}&month=${month}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habitId,
      date,
      value
    })
  });
  return res.json();
}

export async function addHabit(name, year, month) {
  const res = await fetch(`${API}/habits/add?year=${year}&month=${month}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }) 
  });
  return res.json();
}

export async function deleteHabit(id, year, month) {
  await fetch(`${API}/habits/${id}?year=${year}&month=${month}`, {
    method: "DELETE"
  });
}


export async function updateHabitName(id, newName, year, month) {
  const res = await fetch(`${API}/habits/${id}/name?year=${year}&month=${month}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName })
  });
  return res.json();
}
