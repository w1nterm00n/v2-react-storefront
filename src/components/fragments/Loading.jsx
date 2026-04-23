const Loading = () => {

  return (
    <div
    id="loading"
    className="d-flex justify-content-center align-items-center loading-wheel"
    style={{
        position: "fixed",
        width: "68vw",
        height: "50vh",
        zIndex: 9999
    }}
    >
    <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
    >
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>
  );
};

export default Loading;
