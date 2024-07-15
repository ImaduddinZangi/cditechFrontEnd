import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username?: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
}


interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;