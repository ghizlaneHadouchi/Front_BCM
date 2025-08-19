import React, { useState } from 'react'
import { CButton, CCol, CContainer, CFormInput } from '@coreui/react'
import { useSelector } from 'react-redux'
import useSignOut from '../../hooks/useSignOut'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { handleSignOut } = useSignOut()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldsNotValidated, setFieldsNotValidated] = useState(false)

  const handlePasswordChange = async () => {
    if (
      password !== confirmPassword ||
      !password ||
      !confirmPassword ||
      password?.length < 7 ||
      confirmPassword?.length < 7
    ) {
      setFieldsNotValidated(true)
      return
    } else {
      setFieldsNotValidated(false)
      try {
        const res = await fetch(`api/auth/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setPassword('')
        setConfirmPassword('')
        handleSignOut()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <CContainer style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: '0%' }}>Email</p>
          <CFormInput value={currentUser.email} disabled />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: '0%' }}>First Name</p>
            <CFormInput value={currentUser.firstName} disabled />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: '0%' }}>Last Name</p>
            <CFormInput value={currentUser.lastName} disabled />
          </div>
        </div>
      </div>
      <div
        style={{
          width: '60%',
        }}
      >
        <CCol xs style={{ marginTop: 10, marginBottom: 10 }}>
          <CFormInput
            placeholder="New Password"
            aria-label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: fieldsNotValidated && '1px solid red' }}
            type="password"
            text="Must be greater than 6 characters long."
          />
        </CCol>
        <CCol xs style={{ marginTop: 10, marginBottom: 10 }}>
          <CFormInput
            placeholder="Confirm New Password"
            aria-label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ border: fieldsNotValidated && '1px solid red' }}
            type="password"
          />
        </CCol>
        {fieldsNotValidated && (
          <p style={{ color: 'red' }}>Please choose a valid password or passwords do not match.</p>
        )}
        <CButton
          onClick={handlePasswordChange}
          color="success"
          style={{ color: 'white', width: '100%' }}
        >
          Confirm
        </CButton>
      </div>
    </CContainer>
  )
}

export default Profile
