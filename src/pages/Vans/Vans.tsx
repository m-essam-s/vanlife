import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
}

const Vans = () => {

    const [vans, setVans] = useState([] as Van[])

    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    const filteredVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans


    const vanElements = filteredVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={`/vans/${van.id}`}
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

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    className="van-type simple"
                    onClick={() => setSearchParams({ type: "simple" })}
                >Simple</button>
                <button
                    className="van-type luxury"
                    onClick={() => setSearchParams({ type: "luxury" })}
                >Luxury</button>
                <button
                    className="van-type rugged"
                    onClick={() => setSearchParams({ type: "rugged" })}
                >Rugged</button>
                <button
                    className="van-type clear-filters"
                    onClick={() => setSearchParams({})}
                >Clear filter</button>
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}

export default Vans;