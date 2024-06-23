import { pubsub } from "../index.js";
import { VOTE_CREATED, VOTE_UPDATED, VOTING_STARTED } from "../constants.js";
import { GraphQLError } from "graphql";

export async function createVote(_, { input }, { prisma }) {
  try {
    const vote = await prisma.vote.create({
      data: {
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
    await pubsub.publish(VOTE_CREATED, {
      voteCreated: vote,
    });

    return vote;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateVote(_, { input }, { prisma }) {
  try {
    const vote = await prisma.vote.update({
      where: {
        id: input.id,
      },
      data: {
        value: input.value,
      },
      include: {
        participant: true,
        task: true,
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

    pubsub.publish(VOTING_STARTED, { votingStarted: input.taskId });
    return session;
  } catch (err) {
    throw new Error(err);
  }
};
