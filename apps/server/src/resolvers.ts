import { GraphQLError } from "graphql";
import { pubsub } from "./index.js";
import {
  PARTICIPANT_ADDED,
  PARTICIPANT_LEFT,
  SESSION_ENDED,
  TASK_CREATED,
  TASK_DELETED,
  TASK_UPDATED,
  VOTE_CREATED,
  VOTE_RESET,
  VOTE_UPDATED,
} from "./constants.js";

import {
  createSession,
  endSession,
  listSessions,
  viewSession,
} from "./controllers/session.js";

import {
  createParticipant,
  leaveSession,
  listParticipants,
  viewParticipant,
} from "./controllers/participant.js";

import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
  viewTask,
} from "./controllers/task.js";

import {
  createVote,
  resetVotes,
  updateVote,
  viewVoteField,
} from "./controllers/vote.js";

export const resolvers = {
  Query: {
    session: viewSession,
    sessions: listSessions,
    participant: viewParticipant,
    participants: listParticipants,
    task: viewTask,
    tasks: listTasks,
  },
  Mutation: {
    createParticipant: createParticipant,
    leaveSession: leaveSession,
    createSession: createSession,
    endSession: endSession,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    createVote: createVote,
    updateVote: updateVote,
    resetVotes: resetVotes,
  },
  Participant: {
    vote: viewVoteField,
  },
  Subscription: {
    participantAdded: {
      subscribe() {
        return pubsub.asyncIterator([PARTICIPANT_ADDED]);
      },
    },
    participantLeft: {
      subscribe() {
        return pubsub.asyncIterator([PARTICIPANT_LEFT]);
      },
    },
    sessionEnded: {
      subscribe() {
        return pubsub.asyncIterator([SESSION_ENDED]);
      },
    },
    taskCreated: {
      subscribe() {
        return pubsub.asyncIterator([TASK_CREATED]);
      },
    },
    taskUpdated: {
      subscribe() {
        return pubsub.asyncIterator([TASK_UPDATED]);
      },
    },
    taskDeleted: {
      subscribe() {
        return pubsub.asyncIterator([TASK_DELETED]);
      },
    },
    voteCreated: {
      subscribe() {
        return pubsub.asyncIterator([VOTE_CREATED]);
      },
    },
    voteUpdated: {
      subscribe() {
        return pubsub.asyncIterator([VOTE_UPDATED]);
      },
    },
    voteReset: {
      subscribe() {
        return pubsub.asyncIterator([VOTE_RESET]);
      },
    },
  },
};
