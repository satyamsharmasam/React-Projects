import notfound from '../assets/404.png';
const Notfound = () => {
  return (
    <div className='flex flex-col gap-8'>
      <h3>Sorry, Location not found</h3>
      <img src={notfound} alt='' />
    </div>
  );
};

export default Notfound;
