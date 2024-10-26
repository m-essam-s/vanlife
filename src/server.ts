import { createServer, Model, Registry, Response } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

// Define the shape of a Van model
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

// Define the registry and schema type
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AppRegistry = Registry<{ van: ModelDefinition<Van>; user: ModelDefinition<User> }, {}>;
type AppSchema = Schema<AppRegistry>;

createServer({
    models: {
        van: Model.extend<Partial<Van>>({}),
        user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
        server.create("van", { id: "1", name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" });
        server.create("van", { id: "2", name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" });
        server.create("van", { id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" });
        server.create("van", { id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" });
        server.create("van", { id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" });
        server.create("van", { id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" });
        server.create("user", { id: "123", name: "Alice", email: "alice@vanlife.pro", password: "alice123" });
    },

    routes() {
        this.namespace = "api";

        // Get all vans
        this.get("/vans", (schema: AppSchema) => {
            return schema.all("van");
        });

        this.passthrough("https://firestore.googleapis.com/**");

        // Get a specific van by ID
        this.get("/vans/:id", (schema: AppSchema, request) => {
            const id = request.params.id;
            return schema.find("van", id);
        });

        // Get vans by host ID
        this.get("/host/vans", (schema: AppSchema) => {
            return schema.where("van", { hostId: "123" });
        });

        // Get a specific van by host ID and van ID
        this.get("/host/vans/:id", (schema: AppSchema, request) => {
            const id = request.params.id;
            return schema.where("van", { id, hostId: "123" });
        });

        this.post("/login", (schema: AppSchema, request) => {
            const { email, password }: { email: string; password: string } = JSON.parse(request.requestBody);
            const foundUser = schema.findBy("user", { email, password });

            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" });
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userWithoutPassword } = foundUser.attrs;
            return {
                user: userWithoutPassword,
                token: "Enjoy your pizza, here's your tokens."
            };
        });
    }
});
