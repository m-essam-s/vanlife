import { Link, NavLink, Outlet, useLoaderData, LoaderFunctionArgs } from "react-router-dom"
import { getHostVan } from "../../api"

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
export const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params?.id) {
        // If there's no ID in params, throw 404 error
        throw new Response("Van ID not found", { status: 404 });
    }

    try {
        const van = await getHostVan(params.id as string) as Van;
        return van;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // Handle errors
        throw new Response("Van not found", { status: 404 });
    }
};

const HostVanDetail: React.FC = () => {
    const currentVan = useLoaderData() as Van;

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
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