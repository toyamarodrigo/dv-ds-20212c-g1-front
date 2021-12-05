import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../features/app/appSlice";
import { clientesApi } from "../services/api.tiendaropita.clientes";
import { negociosApi } from "../services/api.tiendaropita.negocios";
import { prendasApi } from "../services/api.tiendaropita.prendas";

import { ventasApi } from "./../services/api.tiendaropita.ventas";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [negociosApi.reducerPath]: negociosApi.reducer,
    [clientesApi.reducerPath]: clientesApi.reducer,
    [prendasApi.reducerPath]: prendasApi.reducer,
    [ventasApi.reducerPath]: ventasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      negociosApi.middleware,
      clientesApi.middleware,
      prendasApi.middleware,
      ventasApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
