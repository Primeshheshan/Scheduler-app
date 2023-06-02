import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type State = {
  inProgressCount: number;
  doneCount: number;
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    inProgressCount: 0,
    doneCount: 0,
  },
  reducers: {
    incrementImporgressCount: (state: State) => {
      state.inProgressCount++;
    },
    decrementImporgressCount: (state: State) => {
      state.inProgressCount--;
    },
    incrementDoneCount: (state: State) => {
      state.doneCount++;
    },
    decrementDoneCount: (state: State) => {
      state.doneCount--;
    },
    incrementInprogressByAmount: (
      state: State,
      action: PayloadAction<number>
    ) => {
      state.inProgressCount += action.payload;
    },
    incrementDoneByAmount: (state: State, action: PayloadAction<number>) => {
      state.doneCount += action.payload;
    },
  },
});

export default todoSlice.reducer;
export const {
  incrementImporgressCount,
  incrementDoneCount,
  decrementImporgressCount,
  decrementDoneCount,
  incrementInprogressByAmount,
  incrementDoneByAmount,
} = todoSlice.actions;
