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

export const resolvers = {
  Query: {
    async session(_, { id }, { prisma }) {
      try {
        const session = await prisma.session.findUnique({
          where: {
            id,
          },
          include: {
            participants: {
              include: {
                votes: true,
              },
            },
            tasks: {
              include: {
                votes: true,
              },
            },
          },
        });
        return session;
      } catch (err) {
        throw new Error(err);
      }
    },
    async sessions(_, __, { prisma }) {
      try {
        const sessions = await prisma.session.findMany({
          include: {
            participants: {
              include: {
                votes: true,
              },
            },
            tasks: {
              include: {
                votes: true,
              },
            },
          },
        });
        return sessions;
      } catch (err) {
        throw new Error(err);
      }
    },

    async participant(_, { input }, { prisma }) {
      try {
        const participant = await prisma.participant.findUnique({
          where: {
            id: input.id,
          },
          include: {
            votes: true,
            session: {
              include: {
                tasks: true,
              },
            },
          },
        });

        if (input.task) {
          const task = await this.task(_, { id: input.task }, { prisma });

          participant.task = task;
        }

        return participant;
      } catch (err) {
        throw new Error(err);
      }
    },
    async participants(_, { input }, { prisma }) {
      try {
        const participants = await prisma.participant.findMany({
          where: {
            session: {
              id: input.session,
            },
          },
          include: {
            votes: true,
            session: true,
          },
        });

        return participants;
      } catch (err) {
        throw new Error(err);
      }
    },
    async task(_, { id }, { prisma }) {
      try {
        const task = await prisma.task.findUnique({
          where: {
            id,
          },
        });
        return task;
      } catch (err) {
        throw new Error(err);
      }
    },
    async tasks(_, { input }, { prisma }) {
      try {
        const tasks = await prisma.task.findMany({
          where: {
            session: {
              id: input.session,
            },
          },
        });
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createParticipant(_, { input }, { prisma }) {
      try {
        const participant = await prisma.participant.create({
          data: {
            name: input.name,
            sessionId: input.sessionId,
            isOwner: input.isOwner,
          },
        });

        // publish participant added
        await pubsub.publish(PARTICIPANT_ADDED, {
          participantAdded: participant,
        });

        return participant;
      } catch (err) {
        throw new Error(err);
      }
    },

    async leaveSession(_, { participantId }, { prisma }) {
      try {
        const participant = await prisma.participant.update({
          where: {
            id: participantId,
          },
          data: {
            status: "INACTIVE",
          },
        });

        // publish participant left
        await pubsub.publish(PARTICIPANT_LEFT, {
          participantLeft: participant,
        });

        return participant;
      } catch (err) {
        throw new Error(err);
      }
    },
    async createSession(_, { input }, { prisma }) {
      try {
        const session = await prisma.session.create({
          data: {
            title: input.title,
            ownerId: input.ownerId,
          },
        });

        return session;
      } catch (err) {
        throw new Error(err);
      }
    },
    async endSession(_, { id }, { prisma }) {
      try {
        const session = await prisma.session.update({
          where: {
            id,
          },
          data: {
            status: "INACTIVE",
          },
        });

        // publish session ended
        await pubsub.publish(SESSION_ENDED, {
          sessionEnded: session,
        });

        return session;
      } catch (err) {
        throw new Error(err);
      }
    },
    async createTask(_, { input }, { prisma }) {
      try {
        const task = await prisma.task.create({
          data: {
            title: input.title,
            sessionId: input.sessionId,
          },
        });

        // publish task created
        await pubsub.publish(TASK_CREATED, {
          taskCreated: task,
        });

        return task;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateTask(_, { input }, { prisma }) {
      try {
        const task = await prisma.task.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            status: input.status,
          },
        });

        // publish task updated
        await pubsub.publish(TASK_UPDATED, {
          taskUpdated: task,
        });

        return task;
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteTask(_, { id }, { prisma }) {
      try {
        await prisma.task.delete({
          where: {
            id,
          },
        });

        // publish task deleted
        await pubsub.publish(TASK_DELETED, {
          taskDeleted: id,
        });

        return id;
      } catch (err) {
        throw new Error(err);
      }
    },
    async createVote(_, { input }, { prisma }) {
      try {
        const vote = await prisma.vote.create({
          data: {
            participantId: input.participantId,
            taskId: input.taskId,
            value: input.value,
            time: input.time,
          },
        });

        // publish vote created
        await pubsub.publish(VOTE_CREATED, {
          voteCreated: vote,
        });

        return vote;
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateVote(_, { input }, { prisma }) {
      try {
        const vote = await prisma.vote.update({
          where: {
            id: input.id,
          },
          data: {
            value: input.value,
            time: input.time,
          },
        });

        // publish vote updated
        await pubsub.publish(VOTE_UPDATED, {
          voteUpdated: vote,
        });
        return vote;
      } catch (err) {
        throw new Error(err);
      }
    },

    async resetVotes(_, { input }, { prisma }) {
      try {
        const votes = await prisma.vote.deleteMany({
          where: {
            id: {
              in: input.votes,
            },
          },
        });

        // publish vote reset
        await pubsub.publish(VOTE_RESET, {
          voteReset: input.votes,
        });

        return input.votes;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Participant: {
    vote(participant) {
      if (!participant.task) {
        throw new GraphQLError(
          "In order to get vote for the current task, you must provide a task id",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              argumentName: "vote",
            },
          },
        );
      }

      return participant.votes.filter(
        (vote) => vote.taskId === participant.task.id,
      )[0];
    },
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
