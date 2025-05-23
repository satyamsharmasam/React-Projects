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
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-red-600 text-xl font-bold'>
          Something went wrong. API not working...
        </h1>
      </div>
    );
  }

  return (
    <div
      className='w-dvw h-dvh flex flex-col items-center py-10'
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2016/05/05/02/40/jetty-1373173_1280.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className=' w-96  bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-4  flex flex-col items-center font-bold gap-2'>
        <div className='flex items-center justify-center gap-2 p-2'>
          <input
            className='p-2 font-bold outline-none rounded-md bg-transparent text-lg  bg-white   placeholder:text-black'
            value={city}
            type='text'
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter Your Location '
          />
          <button
            className='bg-white px-3 py-2 font-bold text-lg  rounded-full '
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
              <div className='items-center justify-center flex flex-col gap-4 '>
                <Images />
                <div className='items-center justify-center flex flex-col text-2xl m-4'>
                  {state.data.main?.temp ? (
                    <p className='text-6xl'>
                      {Math.round(state.data.main.temp - 273.15)}
                      <sup className='text-4xl'>ºC</sup>
                    </p>
                  ) : (
                    <Notfound />
                  )}
                  <p className='Weather-type'>
                    {state?.data?.weather?.[0]?.main || ''}
                  </p>
                </div>
                {state?.data?.main?.humidity && state?.data?.wind?.speed && (
                  <div className='flex justify-between items-center gap-24 py-4'>
                    <div className='flex gap-2 justify-center items-center '>
                      <i className='fa-solid fa-droplet'></i>
                      <div className='text-lg'>
                        <span>{state.data.main.humidity}%</span>
                        <h6 className='text-xs'>humidity</h6>
                      </div>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                      <i className='fa-solid fa-wind'></i>
                      <div className='text-lg'>
                        <span>{state.data.wind.speed} Km/H</span>
                        <h6 className='text-xs'>wind-speed</h6>
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
