export function getPermissions() {
  return localStorage.getItem("permissions") ? localStorage.getItem("permissions") : "[]"
}
