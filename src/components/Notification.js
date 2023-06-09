import PropTypes from 'prop-types'

export const Notification = ({ notification }) => {

  return <div>
    {notification.message && <p className={`notification ${notification.type}`}>{notification.message}</p>}
  </div>
}

Notification.propTypes = {
  notification: PropTypes.exact({
    message: PropTypes.string,
    type: PropTypes.string
  })
}