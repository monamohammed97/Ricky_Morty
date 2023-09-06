import '../assets/scss/loadingScreen.scss';

export  function LoadingScreen({ isPage = false }) {
  return (
    <div className={`loading-wrapper ${isPage ? 'page' : ''}`}>
      <div className="spinner-square">
        <div className="square-1 square"></div>
        <div className="square-2 square"></div>
        <div className="square-3 square"></div>
      </div>
    </div>
  );
}
