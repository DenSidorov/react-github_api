import React from "react"
import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-grey-500 teext-white">
            <h3>Github поиск</h3>

            <span>
                <Link to="/" className="mr-2">Дом</Link>
                <Link to="/favourites">Избранное</Link>
            </span>
        </nav>
    )
}