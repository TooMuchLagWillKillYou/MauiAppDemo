const ApiStatus = (props) => {
  const { status } = props;

  switch (status) {
    case "pending":
      return <div>Caricamento...</div>;
    case "error":
    default:
      return <div>Si è verificato un errore</div>;
  }
};

export default ApiStatus;
