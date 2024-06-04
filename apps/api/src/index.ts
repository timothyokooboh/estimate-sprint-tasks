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

dotenv.config();
const app = express();
const prisma = new PrismaClient();
export const pubsub = new PubSub();
const httpServer = http.createServer(app);

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = sessionActiveDirectiveTransformer(schema, "sessionActive");

const server = new ApolloServer({
  schema,
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
  introspection: true, // enable introspection
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
