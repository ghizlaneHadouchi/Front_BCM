import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ isCardOpen, setIsCardOpen, title, content }) => {
  const titleStyle = {
    textAlign: 'center',
    flex: 1,
  }
  return (
    <div className="card-container">
      <div className="card-header" onClick={() => setIsCardOpen((prev) => !prev)}>
        <h6 style={titleStyle}>{title}</h6>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="var(--cui-body-color)"
            style={{
              transition: 'transform 1s',
              transform: isCardOpen ? 'rotate(90deg)' : 'rotate(0)',
            }}
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </div>
      </div>
      <div className={`card-content ${isCardOpen ? 'open' : ''}`}>{content}</div>
    </div>
  )
}

Card.propTypes = {
  isCardOpen: PropTypes.bool.isRequired,
  setIsCardOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
}
export default Card
