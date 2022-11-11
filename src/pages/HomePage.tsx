import React, { useEffect, useState } from "react"
import { RepoCard } from "../components/RepoCard"
import { useDebounce } from "../hooks/debounce"
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api"

export function HomePage() {
    const [search, setSearch] = useState('')
    const debounced = useDebounce(search)
    const [dropdown, SetDropdown] = useState (false) // Для видимости dropdown
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 4, // При каких условиях не надо делать запросы
        // refetchOnFocus: true
    })

    const [fetchrepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()
    // fetchrepos - ф-ция позволяет загружать данные. Т.к. isLoading уже есть - через двоеточие указываем др. переменную

    useEffect(() =>{
        SetDropdown(debounced.length >3 && data?.length! > 0)       
    }, [debounced, data])

    const clickHandler = (username: string) => {
        fetchrepos(username);
        SetDropdown(false)
    }
        
    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            { isError && <p className="text-center text-red-600">Что-то пошло не так</p> }

            <div className="relative w-[560px]">
                <input
                type="text"
                className="border py-2 px-4 w-full h-[42px] mb-2"
                placeholder="Github, поиск по имени..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                />

                {dropdown && <ul className="list-none top-[42px] left-0 rigt-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                    { isLoading && <p className="text-center">Loading...</p>}
                    
                    {data?.map(user => (
                        <li
                            key={user.id}
                            onClick = {() => clickHandler(user.login)}
                            className="py-2 px-4 hover:bg-gray-500 hover:text-right transition-colors cursor-pointer"
                            >
                            { user.login }
                        </li>
                    ))}
                </ul>}

                <div className="container">
                    {areReposLoading && <p className="text-center">Репозитории загружаются...</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
                </div>
            </div>

        </div>
    )
}