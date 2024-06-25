import { pubsub } from "../index.js";
import { VOTE_CASTED, VOTING_STARTED } from "../constants.js";
import { GraphQLError } from "graphql";

export async function castVote(_, { input }, { prisma }) {
  try {
    const vote = await prisma.vote.upsert({
      where: {
        participantId_taskId: {
          participantId: input.participantId,
          taskId: input.taskId,
        },
      },
      update: {
        value: input.value,
      },
      create: {
        participantId: input.participantId,
        taskId: input.taskId,
        value: input.value,
      },

      include: {
        participant: true,
        task: true,
      },
    });

    // publish vote created
    await pubsub.publish(VOTE_CASTED, {
      voteCreated: vote,
    });

    return vote;
  } catch (err) {
    throw new Error(err);
  }
}

export async function viewVoteField(participant, _, { prisma }) {
  try {
    const session = await prisma.session.findUnique({
      where: {
        id: participant.sessionId,
      },
    });

    if (!session.currentTaskId) return null;

    const vote = participant.votes.find(
      (item) => item.taskId === session.currentTaskId,
    );

    return vote ? vote : null;
  } catch (err) {
    throw new Error(err);
  }
}

export const startVoting = async (_, { input }, { prisma }) => {
  try {
    const session = await prisma.session.update({
      where: {
        id: input.sessionId,
      },
      data: {
        currentTaskId: input.taskId,
      },
    });

    await prisma.task.update({
      where: {
        id: input.taskId,
      },
      data: {
        status: "ACTIVE",
        votes: {
          deleteMany: {},
        },
      },
    });

    pubsub.publish(VOTING_STARTED, { votingStarted: input.taskId });
    return session;
  } catch (err) {
    throw new Error(err);
  }
};
