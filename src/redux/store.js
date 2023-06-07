import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import authSlice from './services/authSlice'
import { contactApi } from './api/contactApi'
import contactSlice from './services/contactSlice'
import favoritContactSlice from './services/favoritContactSlice'

export const store = configureStore({
    reducer : {
        [authApi.reducerPath]: authApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        authSlice : authSlice,
        contactSlice : contactSlice ,
        favoriteContactSlice : favoritContactSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,contactApi.middleware),
})

