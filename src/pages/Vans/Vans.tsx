import { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { loader } from "../../loader";

interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
}

loader()

const Vans = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [error] = useState<Error | null>(null)

    const vans = useLoaderData() as Van[]

    const typeFilter = searchParams.get("type")

    const filteredVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans


    const vanElements = filteredVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={`./${van.id}`}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                }}
                aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
            >
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <p>{van.name}</p>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    function handleFilterChange(key: string, value: string | null) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">

                <button
                    className={
                        `van-type simple ${typeFilter === "simple" ? 'selected' : ''}`
                    }
                    onClick={() => handleFilterChange("type", "simple")}
                >Simple</button>

                <button
                    className={
                        `van-type luxury ${typeFilter === "luxury" ? 'selected' : ''}`
                    }
                    onClick={() => handleFilterChange("type", "luxury")}
                >Luxury</button>

                <button
                    className={
                        `van-type rugged ${typeFilter === "rugged" ? 'selected' : ''}`
                    }
                    onClick={() => handleFilterChange("type", "rugged")}
                >Rugged</button>

                {
                    typeFilter
                    &&
                    <button
                        className="van-type clear-filters"
                        onClick={() => handleFilterChange("type", null)}
                    >Clear filter</button>
                }

            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}

export default Vans;