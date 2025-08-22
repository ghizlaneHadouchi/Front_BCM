import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const API_BASE = (import.meta.env.VITE_API || '').replace(/\/+$/, '')
    const url = API_BASE ? `${API_BASE}/api/auth/signout` : '/api/auth/signout'

    try {
      const res = await fetch(url, {
        method: 'POST',            // <-- POST now
        credentials: 'include',    // <-- send cookies
        // If CSRF is enabled on your backend, also send the token:
        // headers: { 'X-CSRF-TOKEN': getCookie('XSRF-TOKEN') }
      })

      // Don’t force JSON; many logout endpoints return 204 No Content
      if (!res.ok && res.status !== 204) {
        const txt = await res.text().catch(() => '')
        console.warn('signout not OK:', res.status, txt)
      }
    } catch (e) {
      console.error('signout error:', e)
    } finally {
      // Always clear client state
      dispatch({ type: 'signOut' })
      dispatch({ type: 'setNotifications', payload: { notifications: 0, notificationMessage: [] } })
      navigate('/')
    }
  }

  return { handleSignOut }
}

export default useSignOut;
