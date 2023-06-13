import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type State = {
  accessToken: string;
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: '',
  },
  reducers: {
    storeAccessToken: (state: State, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    clearAccessToken: (state: State) => {
      state.accessToken = '';
    },
  },
});

export default authSlice.reducer;
export const { storeAccessToken, clearAccessToken } = authSlice.actions;
