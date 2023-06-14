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
    storeUsername: (state: State, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { storeUsername } = authSlice.actions;
