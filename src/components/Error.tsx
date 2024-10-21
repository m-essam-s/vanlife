import { useRouteError } from "react-router-dom";

interface Error {
    message: string;
    status: number;
    statusText: string;
}

const Error = () => {
    const error = useRouteError() as Error;

    return (
        <>
            <h1>Error: {error.message}</h1>
            <pre>{error.status} - {error.statusText}</pre>
        </>
    );
}

export default Error;