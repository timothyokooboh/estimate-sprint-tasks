import { types } from "./types.js";
import { mutations } from "./mutations.js";
import { queries } from "./queries.js";
import { subscriptions } from "./subscriptions.js";
import gql from "graphql-tag";

export const typeDefs = gql`
  ${types}
  ${queries}
  ${mutations}
  ${subscriptions}
`;
