const API = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5001`;

async function parseJsonResponse(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export async function fetchNotes() {
  const res = await fetch(`${API}/notes`);
  return parseJsonResponse(res);
}

export async function addNoteApi(note) {
  const res = await fetch(`${API}/notes/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });
  return parseJsonResponse(res);
}

export async function deleteNoteApi(id) {
  const res = await fetch(`${API}/notes/${id}`, {
    method: "DELETE"
  });
  return parseJsonResponse(res);
}

export async function updateNoteContentApi(id, title, content) {
  const res = await fetch(`${API}/notes/${id}/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  return parseJsonResponse(res);
}

export async function updateNotePositionApi(id, x, y) {
  const res = await fetch(`${API}/notes/${id}/position`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ x, y })
  });
  return parseJsonResponse(res);
}
