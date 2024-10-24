import { Link, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"

interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
    hostId: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
    return getHostVans(""); // null is passed to get all vans
}

const HostVans = () => {

    const vans = useLoaderData() as Van[]

    const hostVansEls = vans.map(van => (
        <Link
            to={`./${van.id}`}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                <section>
                    {hostVansEls}
                </section>
            </div>
        </section>
    )
}

export default HostVans;
