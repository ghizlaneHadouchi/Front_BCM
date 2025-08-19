import React from 'react'
import { CButton } from '@coreui/react'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'

const SearchButton = ({ handleFilter }) => {
  return (
    <div>
      <CButton
        type="submit"
        size="sm"
        onClick={handleFilter}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          backgroundColor: 'var(--nup-mid-blue)',
          gap: 5,
        }}
      >
        <FaSearch size={14} />
        <span>Rechercher</span>
      </CButton>
    </div>
  )
}

SearchButton.propTypes = {
  handleFilter: PropTypes.func.isRequired,
}

export default SearchButton
