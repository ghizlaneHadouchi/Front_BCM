import React from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import PropTypes from 'prop-types'

const ConfirmationModal = ({ header, message, visible, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose} style={{ display: 'flex', alignItems: 'center' }}>
      <CModalHeader>
        <h5>{header}</h5>
      </CModalHeader>
      <CModalBody>{message}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={onConfirm}>
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ConfirmationModal.propTypes = {
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}
export default ConfirmationModal
