import { PARTICIPANT_ADDED, PARTICIPANT_LEFT } from "../constants.js";
import { pubsub } from "../index.js";

export async function viewParticipant(_, { input }, { prisma }) {
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
}

export async function listParticipants(_, { input }, { prisma }) {
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
}

export async function createParticipant(_, { input }, { prisma }) {
  try {
    const participant = await prisma.participant.create({
      data: {
        name: input.name,
        sessionId: input.session,
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
}

export async function leaveSession(_, { participant }, { prisma }) {
  try {
    const data = await prisma.participant.update({
      where: {
        id: participant,
      },
      data: {
        status: "INACTIVE",
      },
    });

    // publish participant left
    await pubsub.publish(PARTICIPANT_LEFT, {
      participantLeft: data,
    });

    return data;
  } catch (err) {
    throw new Error(err);
  }
}
