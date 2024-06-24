import { pubsub } from "../index.js";
import { SESSION_ENDED } from "../constants.js";

export async function viewSession(_, { id }, { prisma }) {
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
            votes: {
              include: {
                participant: true,
              },
            },
          },
        },
      },
    });
    return session;
  } catch (err) {
    throw new Error(err);
  }
}

export async function listSessions(_, __, { prisma }) {
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
}

export async function createSession(_, { input }, { prisma }) {
  try {
    const session = await prisma.session.create({
      data: {
        title: input.title,
      },
    });

    return session;
  } catch (err) {
    throw new Error(err);
  }
}

export async function endSession(_, { id }, { prisma }) {
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
}
