import { useState } from 'react'
import { useDispatch } from 'react-redux'

const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (email, password) => {
      await fetch('/api/auth/ping').then(r => r.json()).then(console.log)

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
      })
      const data = await res.json()
      console.log(data);
      
      if (data.success === false) {
        throw new Error(data.message)
      }
      dispatch({
        type: 'signIn',
        payload: {
          user: data.user,
        },
      })
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  return { email, setEmail, password, setPassword, handleLogin }
}

export default useLogin
