import { pubsub } from "../index.js";
import { VOTE_CREATED, VOTE_RESET, VOTE_UPDATED } from "../constants.js";
import { GraphQLError } from "graphql";

export async function createVote(_, { input }, { prisma }) {
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
}

export async function updateVote(_, { input }, { prisma }) {
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
}

export async function resetVotes(_, { input }, { prisma }) {
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
}

export function viewVoteField(participant) {
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
}
