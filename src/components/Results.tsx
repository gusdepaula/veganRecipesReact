const Results = () => {
  return (
    <div className="results hidden-xs">
      <form className="search">
        <div className="input-group">
          <input type="text" className="search__field" placeholder="Pesquise por ingrediente ou receita..." />
          <span className="input-group-btn">
            <button className="btn search__btn">
              <svg className="search__icon">
                <use href="../public/icons.svg#icon-magnifying-glass"></use>
              </svg>
            </button>
          </span>
        </div>
      </form>
      <ul className="results__list">
        <li>
          <a className="results__link results__link--active" href="#23456">
            <figure className="results__fig">
              <img src="img/test-1.jpg" alt="Test" />
            </figure>
            <div className="results__data">
              <h4 className="results__name">Pasta with Tomato ...</h4>
              <p className="results__author">The Pioneer Woman</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Results;
