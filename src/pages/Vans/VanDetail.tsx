import { Link, useLocation, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { getVans } from "../../api";

interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
}

// Loader function

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params?.id) {
        // If there's no ID in params, throw 404 error
        throw new Response("Van ID not found", { status: 404 });
    }

    try {
        const van = await getVans(params.id as string) as Van;
        return van;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // Handle errors
        throw new Response("Van not found", { status: 404 });
    }
};

const VanDetail: React.FC = () => {
    const van = useLoaderData() as Van;
    const location = useLocation();

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link to={`..${search}`} relative="path" className="back-button">
                &larr; <span>Back to {type} vans</span>
            </Link>

            <div className="van-detail">
                <img src={van.imageUrl} alt={`${van.name}`} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        </div>
    );
};

export default VanDetail;
