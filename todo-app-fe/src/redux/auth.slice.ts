import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type State = {
  accessToken: string;
  username: string;
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
    username: '',
  },
  reducers: {
    storeAccessToken: (state: State, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    clearAccessToken: (state: State) => {
      state.accessToken = '';
    },

    storeUsername: (state: State, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { storeAccessToken, clearAccessToken, storeUsername } =
  authSlice.actions;
