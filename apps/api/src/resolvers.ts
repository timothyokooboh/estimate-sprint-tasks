import { pubsub } from "./index.js";
import {
  PARTICIPANT_JOINED,
  PARTICIPANT_LEFT,
  SESSION_ENDED,
  TASK_CREATED,
  TASK_DELETED,
  TASK_UPDATED,
  VOTE_CREATED,
  VOTE_UPDATED,
  VOTING_STARTED,
  TASK_RESET,
} from "./constants.js";

import {
  createSession,
  endSession,
  listSessions,
  viewSession,
} from "./handlers/session.js";

import {
  joinSession,
  leaveSession,
  listParticipants,
  viewParticipant,
} from "./handlers/participant.js";

import {
  bulkCreateTasks,
  createTask,
  deleteTask,
  viewTask,
  listTasks,
  updateTask,
  resetTask,
} from "./handlers/task.js";

import {
  createVote,
  startVoting,
  updateVote,
  viewVoteField,
} from "./handlers/vote.js";

export const resolvers = {
  Query: {
    viewSession: viewSession,
    listSessions: listSessions,
    viewParticipant: viewParticipant,
    listParticipants: listParticipants,
    viewTask: viewTask,
    listTasks: listTasks,
  },
  Mutation: {
    joinSession,
    leaveSession,
    createSession,
    endSession,
    createTask,
    bulkCreateTasks,
    updateTask,
    deleteTask,
    resetTask,
    createVote,
    updateVote,
    startVoting,
  },
  Session: {
    moderator(session) {
      const owner = session.participants.find(
        (participant) => participant.isModerator,
      );
      return owner;
    },
  },
  Participant: {
    vote: viewVoteField,
  },
  Task: {
    averageVote(task, _, { prisma }) {
      const votes = task.votes.map((vote) => vote.value);
      const sum = votes.reduce((a, b) => Number(a) + Number(b), 0);
      const average = votes.length ? sum / votes.length : 0;
      return average;
    },
  },
  Subscription: {
    participantJoined: {
      subscribe() {
        return pubsub.asyncIterator([PARTICIPANT_JOINED]);
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
    taskReset: {
      subscribe() {
        return pubsub.asyncIterator([TASK_RESET]);
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
    votingStarted: {
      subscribe() {
        return pubsub.asyncIterator([VOTING_STARTED]);
      },
    },
  },
};
