import { Outlet } from 'react-router-dom';

// Auth is not enforced in the prototype — all routes are open.
// Replace with real auth logic when user accounts are introduced.
export default function ProtectedRoute() {
  return <Outlet />;
}
