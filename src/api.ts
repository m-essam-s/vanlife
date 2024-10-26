interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

const getVans = async (id: string): Promise<Van[] | Van> => {
    const url = id ? `/api/vans/${id}` : "/api/vans";
    const res = await fetch(url);

    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        };
    }

    const data = await res.json();
    return id ? data.van : data.vans; // Return a single van if ID is provided
};

const getHostVans = async (id: string): Promise<Van[] | Van> => {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
    const res = await fetch(url);

    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        };
    }

    const data = await res.json();
    return id ? data.vans[0] : data.vans;
};

const loginUser = async (creds: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )

    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        };
    }

    return data;
};

export { getVans, getHostVans, loginUser };
