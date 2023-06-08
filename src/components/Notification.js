
export const Notification = ({notification}) => {

  return <div>
    {notification.message && <p className={`notification ${notification.type}`}>{notification.message}</p>}
  </div>
}