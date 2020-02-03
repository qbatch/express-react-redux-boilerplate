export default function authHeaders() {
  const authToken = localStorage.getItem('AUTH_TOKEN') ? `JWT ${localStorage.getItem('AUTH_TOKEN')}` : null;

  return { 'Authorization': authToken };
};
