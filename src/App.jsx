import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './redux/slice/weather';
import { useState } from 'react';
import { Loader, Notfound } from './components';
import './App.css';
import Images from './components/Images';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.weather);

  const [city, setCity] = useState('');

  function handleSearch() {
    if (!city.trim()) return;
    dispatch(fetchWeather(city));
  }

  // Api error handle
  if (state.isError) {
    return (
      <div className='flex items-center justify-center h-screen px-2'>
        <h1 className='text-red-600 text-base sm:text-xl font-bold text-center'>
          Something went wrong. API not working...
        </h1>
      </div>
    );
  }

  return (
    <div
      className='w-screen min-h-screen flex flex-col items-center py-8 px-2 sm:px-6 md:px-10 lg:px-20'
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2016/05/05/02/40/jetty-1373173_1280.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full max-w-xs sm:max-w-lg md:max-w-xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-3 sm:p-6 flex flex-col items-center font-bold gap-2 sm:gap-4'>
        <div className='flex items-center justify-center gap-2 p-1 w-full'>
          <input
            className='flex-grow p-2 font-bold outline-none rounded-md bg-white bg-opacity-90 text-base placeholder-black sm:text-lg'
            value={city}
            type='text'
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter Your Location'
          />
          <button
            className='bg-white px-2 py-2 font-bold text-base rounded-full hover:bg-gray-200 transition sm:px-3 sm:text-lg'
            onClick={handleSearch}
          >
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </div>

        {state.isLoading ? (
          <Loader />
        ) : (
          <>
            {state.data && (
              <div className='flex flex-col items-center justify-center gap-3 w-full'>
                <Images />
                <div className='flex flex-col items-center justify-center text-xl sm:text-2xl m-2 sm:m-4'>
                  {state.data.main?.temp ? (
                    <p className='text-4xl sm:text-5xl'>
                      {Math.round(state.data.main.temp - 273.15)}
                      <sup className='text-2xl sm:text-3xl'>ºC</sup>
                    </p>
                  ) : (
                    <Notfound />
                  )}
                  <p className='Weather-type text-base sm:text-lg mt-1 sm:mt-2'>
                    {state?.data?.weather?.[0]?.main || ''}
                  </p>
                </div>
                {state?.data?.main?.humidity && state?.data?.wind?.speed && (
                  <div className='flex justify-between items-center gap-6 sm:gap-20 py-3 w-full text-sm sm:text-lg'>
                    <div className='flex gap-1 justify-center items-center flex-1'>
                      <i className='fa-solid fa-droplet text-lg sm:text-2xl'></i>
                      <div>
                        <span>{state.data.main.humidity}%</span>
                        <h6 className='text-xs sm:text-sm'>humidity</h6>
                      </div>
                    </div>
                    <div className='flex gap-1 justify-center items-center flex-1'>
                      <i className='fa-solid fa-wind text-lg sm:text-2xl'></i>
                      <div>
                        <span>{state.data.wind.speed} Km/H</span>
                        <h6 className='text-xs sm:text-sm'>wind-speed</h6>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
