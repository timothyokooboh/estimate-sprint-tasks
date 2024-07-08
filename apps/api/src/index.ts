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
// import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { sessionActiveDirectiveTransformer } from "./directives.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "express-session";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import WebSocket, { WebSocketServer } from "ws";

dotenv.config();
const app = express();

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    // Adjust this callback to your needs
    console.log(email, password);
    // done(error, matchingUser);
  }),
);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// // configure session middleware
// app.use(
//   session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//   }),
// );

// // initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Configure Passport with Google OAuth 2.0 strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.OAUTH_CLIENT_ID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       callbackURL:
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:5173/auth/google/callback"
//           : "https://sprintpoker-beta.vercel.app/#/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log("USER PROFILE", profile);
//       // Here you can handle user data (e.g., find or create a user in your database)
//       // For demonstration, we'll just return the user profile
//       return done(null, profile);
//     },
//   ),
// );

// // Serialize user into the sessions
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Deserialize user from the sessions
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

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
    async context({ req, res }) {
      return { prisma, ...buildContext({ req, res }) };
    },
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
