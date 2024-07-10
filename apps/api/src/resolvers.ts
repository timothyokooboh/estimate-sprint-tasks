import { pubsub } from "./index.js";
import jwt from "jsonwebtoken";
import {
  PARTICIPANT_JOINED,
  PARTICIPANT_LEFT,
  SESSION_ENDED,
  TASK_CREATED,
  TASK_DELETED,
  TASK_UPDATED,
  VOTE_CASTED,
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

import { castVote, startVoting, viewVoteField } from "./handlers/vote.js";
import { sendFeedback } from "./handlers/feedback..js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  clientId:
    "46365325780-5gpiltf802fr0ml56ohm9srm5sqg7gc5.apps.googleusercontent.com",
});

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
    castVote,
    startVoting,
    sendFeedback,
    async googleSignIn(parent, { access_token }, { prisma }, info) {
      client.setCredentials({ access_token: access_token });
      const googleUserInfo = await client.request({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
      });

      console.log(googleUserInfo);
      const payload = googleUserInfo.data as {
        sub: string;
        name: string;
        email: string;
        picture: string;
      };

      const { sub, email, name, picture } = payload;

      let user = await prisma.user.findUnique({
        where: { googleId: sub },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            googleId: sub,
            email,
            name,
            picture,
          },
        });
      }

      // Create a JWT token for your own authentication
      const jwtToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return {
        token: jwtToken,
        user,
      };
    },
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
    voteCasted: {
      subscribe() {
        return pubsub.asyncIterator([VOTE_CASTED]);
      },
    },
    votingStarted: {
      subscribe() {
        return pubsub.asyncIterator([VOTING_STARTED]);
      },
    },
  },
};
