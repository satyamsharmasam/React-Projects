import { useSelector } from 'react-redux';
import clear from '../assets/clear.png';
import mist from '../assets/mist.png';
import cloud from '../assets/cloud.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';

const Images = () => {
  const state = useSelector((state) => state.weather);

  const condition = state?.data?.weather?.[0]?.main;

  let imageSrc;

  switch (condition) {
    case 'Clear':
      imageSrc = clear;
      break;
    case 'Clouds':
      imageSrc = cloud;
      break;
    case 'Haze':
      imageSrc = haze;
      break;
    case 'Rain':
      imageSrc = rain;
      break;
    case 'Snow':
      imageSrc = snow;
      break;
    case 'Mist':
      imageSrc = mist;
      break;
    default:
      imageSrc = null;
  }

  return (
    <>
      {imageSrc && (
        <div>
          <img className='w-36' src={imageSrc} alt={condition} />
        </div>
      )}
    </>
  );
};

export default Images;
