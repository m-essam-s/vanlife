import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

export interface Van {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    hostId: number;
    type: string;
    description: string;
}

const HostVanDetail = () => {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    const { id } = useParams()
    const [currentVan, setCurrentVan] = useState<Van | null>(null)

    useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setCurrentVan(data.vans[0]))
    }, [id])

    console.log(currentVan)
    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    return (
        <section className="van-detail-container">
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>
                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentVan }} />
            </div>
        </section>
    )
}

export default HostVanDetail