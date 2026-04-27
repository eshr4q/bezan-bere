// needs revision
const API = `http://${window.location.hostname}:5001`;

export async function fetchHabits(year) {
  const res = await fetch(`${API}/habits?year=${year}`);
  return res.json();
}


export async function toggleDay(year, habitId, date, value) {

  const res = await fetch(`${API}/habits/update-day?year=${year}`, {
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

export async function addHabit(name, year) {
  
  const res = await fetch(`${API}/habits/add?year=${year}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }) 
  });

  return res.json();
}

export async function deleteHabit(id, year) {
  await fetch(`${API}/habits/${id}?year=${year}`, {
    method: "DELETE"
  });
}
