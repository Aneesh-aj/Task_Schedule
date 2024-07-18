import { setUser } from '../redux/userSlice';

export const clearUser = (dispatch) => {
  dispatch(
    setUser({
      role: '',
      name: '',
      email: '',
      id: '',
    })
  );
};
