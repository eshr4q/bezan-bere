const API = `http://${window.location.hostname}:5001`;

export async function fetchNotes() {
  const res = await fetch(`${API}/notes`);
  return res.json();
}

export async function addNoteApi(note) {
  const res = await fetch(`${API}/notes/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });
  return res.json();
}

export async function deleteNoteApi(id) {
  await fetch(`${API}/notes/${id}`, {
    method: "DELETE"
  });
}

export async function updateNoteContentApi(id, title, content) {
  const res = await fetch(`${API}/notes/${id}/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  return res.json();
}

export async function updateNotePositionApi(id, x, y) {
  const res = await fetch(`${API}/notes/${id}/position`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ x, y })
  });
  return res.json();
}
