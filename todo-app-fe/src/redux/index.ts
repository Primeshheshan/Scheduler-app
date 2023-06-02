import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoCount.slice';

const store = configureStore({
  // map of reducers
  reducer: {
    todoStore: todoReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
