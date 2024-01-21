import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutUserStart());
      const res = await fetch('https://oneinfinity.onrender.com/api/auth/signout');
      const data = await res.json();
      console.log("data", data);
      console.log(currentUser)
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      console.log(currentUser)
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
    navigate("/signin")
  }

  return (
    <header className='bg-slate-200 shadow-md sticky top-0'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>One</span>
            <span className='text-slate-700'>Infinity</span>
          </h1>
        </Link>
        <div className='flex gap-8 justify-center items-center'>
          <Link to='/todo'>
            <li className='hidden sm:inline text-slate-700 hover:text-slate-400 hover:underline'>
              Todos
            </li>
          </Link>
          <Link to='/addtodo'>
            <li className='hidden sm:inline text-slate-700 hover:text-slate-400 hover:underline mr-6'>
              AddTodo
            </li>
          </Link>
          {/* <ul className='flex gap-4'>
            {currentUser &&
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            }
            {currentUser ? <li onClick={handleSignOut} className='hover:cursor-pointer text-slate-700 hover:underline'> Sign Out</li> : (
              <div className='flex gap-8'>

                <Link to='/signup'>
                  <li className='hidden sm:inline text-slate-700 hover:underline'>
                    Sign Up
                  </li>
                </Link>
                <Link to='/signin'>
                  <li className='hidden sm:inline text-slate-700 hover:underline'>
                    Sign In
                  </li>
                </Link>
              </div>
            )}
          </ul> */}
        </div>
      </div>
    </header>
  );
}
