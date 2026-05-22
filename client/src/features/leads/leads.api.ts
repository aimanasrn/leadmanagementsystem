export async function getLeads() {
  const response = await fetch("http://127.0.0.1:3001/leads", {
    headers: { "x-dev-role": "ADMIN" }
  });

  return response.json();
}
