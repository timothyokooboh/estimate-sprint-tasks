import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PubSub } from "graphql-subscriptions";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";
import dotenv from "dotenv";
import { getUserFromToken } from "./helpers/auth.js";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const prisma = new PrismaClient();
export const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,

  plugins: [
    // Proper shutdown for HTTP server
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const server = new ApolloServer({
  schema,
  introspection: true, // enable introspection
  schemaDirectives: {},
  formatError(formattedError, err) {
    // log errors to an error service

    return formattedError;
  },
});

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/subscriptions",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    async context({ req, res }) {
      const token = req.headers.authorization || "";
      const user = getUserFromToken(token.split(" ")[1]);
      return {
        prisma,
        user,
      };
    },
  }),
);

await new Promise((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);
console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
