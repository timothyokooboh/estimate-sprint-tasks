import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PubSub } from "graphql-subscriptions";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { sessionActiveDirectiveTransformer } from "./directives.js";
import history from "connect-history-api-fallback";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const prisma = new PrismaClient();
export const pubsub = new PubSub();

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = sessionActiveDirectiveTransformer(schema, "sessionActive");

const server = new ApolloServer({
  schema,
  introspection: true,
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
  formatError(formattedError, err) {
    // log errors to an error service
    return formattedError;
  },
});

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
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
  expressMiddleware(server, {
    async context({ req }) {
      return {
        prisma,
        req,
      };
    },
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
