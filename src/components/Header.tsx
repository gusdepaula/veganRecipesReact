const Header = () => {
  return (
    <header className="header">
      <img src="../public/logo.png" alt="Logo" className="header__logo" />
      <div className="likes">
        <div className="likes__field" style={{ visibility: 'hidden' }}>
          <svg className="likes__icon">
            <use href="../public/icons.svg#icon-heart"></use>
          </svg>
        </div>
        <div className="likes__panel">
          <ul className="likes__list"></ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
