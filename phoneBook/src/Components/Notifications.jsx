const Notifications = ({ message }) => {
  if (message === null) {
    return null;
  }
  const notificationStyle = {
    color: message.positive ? "green" : "red",
    background: "lightgray",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message.message}</div>;
};

export default Notifications;
