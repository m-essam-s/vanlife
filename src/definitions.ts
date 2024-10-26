interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
    hostId: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type { Van, User };