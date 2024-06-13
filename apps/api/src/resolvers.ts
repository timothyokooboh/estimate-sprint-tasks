import { pubsub } from "./index.js";
import {
  PARTICIPANT_JOINED,
  PARTICIPANT_LEFT,
  SESSION_ENDED,
  TASK_CREATED,
  TASK_DELETED,
  TASK_UPDATED,
  VOTE_CREATED,
  VOTES_RESET,
  VOTE_UPDATED,
  VOTING_STARTED,
} from "./constants.js";

import {
  createSession,
  endSession,
  listSessions,
  viewSession,
} from "./controllers/session.js";

import {
  joinSession,
  leaveSession,
  listParticipants,
  viewParticipant,
} from "./controllers/participant.js";

import {
  bulkCreateTasks,
  createTask,
  deleteTask,
  viewTask,
  listTasks,
  updateTask,
} from "./controllers/task.js";

import {
  createVote,
  resetVotes,
  startVoting,
  updateVote,
  viewVoteField,
} from "./controllers/vote.js";

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
    joinSession: joinSession,
    leaveSession: leaveSession,
    createSession: createSession,
    endSession: endSession,
    createTask: createTask,
    bulkCreateTasks: bulkCreateTasks,
    updateTask: updateTask,
    deleteTask: deleteTask,
    createVote: createVote,
    updateVote: updateVote,
    resetVotes: resetVotes,
    startVoting: startVoting,
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
    votesReset: {
      subscribe() {
        return pubsub.asyncIterator([VOTES_RESET]);
      },
    },
    votingStarted: {
      subscribe() {
        return pubsub.asyncIterator([VOTING_STARTED]);
      },
    },
  },
};
