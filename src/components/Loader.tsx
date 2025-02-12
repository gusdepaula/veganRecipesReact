import { useLoader } from '../hooks/useLoader';

const Loader: React.FC = () => {
  const { loading } = useLoader();

  return (
    <>
      {loading && (
        <div className="loader">
          <svg>
            <use href="/icons.svg#icon-cw"></use>
          </svg>
        </div>
      )}
    </>
  );
};

export default Loader;
