const API = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5001`;

async function parseJsonResponse(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export async function fetchHabits(year, month) {
  const res = await fetch(`${API}/habits?year=${year}&month=${month}`);
  return parseJsonResponse(res);
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
  return parseJsonResponse(res);
}

export async function addHabit(name, year, month) {
  const res = await fetch(`${API}/habits/add?year=${year}&month=${month}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return parseJsonResponse(res);
}

export async function deleteHabit(id, year, month) {
  const res = await fetch(`${API}/habits/${id}?year=${year}&month=${month}`, {
    method: "DELETE"
  });
  return parseJsonResponse(res);
}


export async function updateHabitName(id, newName, year, month) {
  const res = await fetch(`${API}/habits/${id}/name?year=${year}&month=${month}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName })
  });
  return parseJsonResponse(res);
}
