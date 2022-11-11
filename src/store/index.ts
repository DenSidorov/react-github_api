import { githubReduser } from './github/github.slice';
import { githabApi } from './github/github.api';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query';

/// https://habr.com/ru/post/498860/ - инфа Redux
export const store = configureStore({
    reducer: {
        [githabApi.reducerPath]: githabApi.reducer,
        github: githubReduser
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githabApi.middleware)
})

// setupListeners(store.dispatch) /// Что бы обновить store необходимо вызвать метод dispatch(). Он вызывается у объекта store который вы создаёте в store.js. (index.ts)

export type RootState = ReturnType<typeof store.getState>