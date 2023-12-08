import '../assets/styles/components/Loader.scss';
import BeatLoader from 'react-spinners/BeatLoader';

export const Loader = () => (
  <div className="loader" role="loader">
    <BeatLoader color="#3874CB" size={10} />
  </div>
);
