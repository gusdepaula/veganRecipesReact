import { useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function App() {
  useEffect(() => {
    const dbRef = ref(db);
    get(dbRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
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
      <div className="recipe">
        <figure className="recipe__fig">
          <a href="/" className="btn visible-xs recipe__back">
            « voltar
          </a>
          <img
            src="https://bonali.com.br/WP/wp-content/uploads/Creme-light-de-aveia-com-banana-e-chocolate.jpg"
            alt="Creme de banana com aveia e frutos secos"
            className="recipe__img"
          />
          <h1 className="recipe__title">
            <span>Creme de banana com aveia e frutos secos</span>
          </h1>
        </figure>

        <div className="recipe__details">
          <div className="recipe__info">
            <svg className="recipe__info-icon">
              <use href="../public/icons.svg#icon-stopwatch"></use>
            </svg>
            <span className="recipe__info-data recipe__info-data--minutes">undefined</span>
            <span className="recipe__info-text"> minutos</span>
          </div>
          <div className="recipe__info">
            <svg className="recipe__info-icon">
              <use href="../public/icons.svg#icon-man"></use>
            </svg>
            <span className="recipe__info-data recipe__info-data--people">undefined</span>
            <span className="recipe__info-text"> porções</span>

            <div className="recipe__info-buttons">
              <button className="btn-tiny btn-decrease">
                <svg>
                  <use href="../public/icons.svg#icon-circle-with-minus"></use>
                </svg>
              </button>
              <button className="btn-tiny btn-increase">
                <svg>
                  <use href="../public/icons.svg#icon-circle-with-plus"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="recipe__ingredients">
          <button className="recipe__love">
            <svg className="header__likes">
              <use href="../public/icons.svg#icon-heart-outlined"></use>
            </svg>
          </button>
          <ul className="recipe__ingredient-list">
            <li className="recipe__item">
              <svg className="recipe__icon">
                <use href="../public/icons.svg#icon-check"></use>
              </svg>
              1 banana madura
            </li>

            <li className="recipe__item">
              <svg className="recipe__icon">
                <use href="../public/icons.svg#icon-check"></use>
              </svg>
              1/2 xícara de leite de amêndoas ou outro leite de sua preferência
            </li>

            <li className="recipe__item">
              <svg className="recipe__icon">
                <use href="../public/icons.svg#icon-check"></use>
              </svg>
              3 colheres de sopa de aveia em flocos
            </li>

            <li className="recipe__item">
              <svg className="recipe__icon">
                <use href="../public/icons.svg#icon-check"></use>
              </svg>
              1 colher de sopa de frutos secos
            </li>
          </ul>
        </div>

        <div className="recipe__directions">
          <h2 className="heading-2">Modo de preparo</h2>
          <p className="recipe__directions-text preWrap"></p>
          <p className="recipe__directions-text">
            Esta receita foi cuidadosamente desenvolvida e testada por <span className="recipe__by">Gustavo de Paula</span>.
          </p>
        </div>
      </div>
      <div className="shopping" style={{ display: 'none' }}>
        <p>Shopping</p>
      </div>
      <div className="footer">
        <div className="copyright">
          © Copyright by{' '}
          <a className="twitter-link" target="_blank" href="https://github.com/gusdepaula">
            Gustavo de Paula
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
