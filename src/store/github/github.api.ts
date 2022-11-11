import { ServerResponse, IUser, IRepo } from './../../models/models';
/// Здесь настраиваем api для работы с github
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const githabApi = createApi({
    reducerPath: 'github/api',  // Указываем где будут храниться все кэшированные данные при работе с API
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com' // Базовый Url
    }),
    // refetchOnFocus: true,
    endpoints: build => ({
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: 'search/users',   // Конкат с Базовым Url
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse) => response.items  // Чистим Responce
        }),
    getUserRepos: build.query<IRepo[], string>({
        query: (username: string) => ({
            url: `users/${username}/repos`
        })
    })
    }),
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githabApi  // Получаем кастомный хукб который можем использовать в компонентах. Lazy - делает запрос когда захотим (не сразу)