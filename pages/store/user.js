import { createSlice } from '@reduxjs/toolkit'
// Slice
let  initialUser=''
try {

 initialUser = localStorage.getItem('user')  ? JSON.parse(localStorage.getItem('user'))   : null

}

catch(e) {
    initialUser=''
}

const slice = createSlice({
  name: 'user',
  initialState: {
    user:initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) =>  {
      state.user = '';
      localStorage.removeItem('user')
    },
  },
});
export default slice.reducer
// Actions
const { loginSuccess, logoutSuccess } = slice.actions


export const login = (user ) => async dispatch => {
    try {
      // const res = await api.post('/api/auth/login/', { username, password })
      dispatch(loginSuccess({user}));
    } catch (e) {
      return console.error(e.message);
    }
  }
  export const logout = () => async dispatch => {
    try {
      // const res = await api.post('/api/auth/logout/')
      return dispatch(logoutSuccess())
    } catch (e) {
      return console.error(e.message);
    }
  }