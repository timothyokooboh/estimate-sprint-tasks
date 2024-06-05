import { pubsub } from "../index.js";
import { TASK_CREATED, TASK_DELETED, TASK_UPDATED } from "../constants.js";

export async function viewTask(_, { id }, { prisma }) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        session: {
          include: {
            tasks: true,
            participants: true,
          },
        },
        votes: {
          include: {
            participant: true,
          },
        },
      },
    });
    return task;
  } catch (err) {
    throw new Error(err);
  }
}

export async function listTasks(_, { input }, { prisma }) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        session: {
          id: input.session,
        },
      },
      include: {
        session: {
          include: {
            tasks: true,
            participants: true,
          },
        },
        votes: {
          include: {
            participant: true,
          },
        },
      },
    });
    return tasks;
  } catch (err) {
    throw new Error(err);
  }
}

export async function createTask(_, { input }, { prisma }) {
  try {
    const task = await prisma.task.create({
      data: {
        title: input.title,
        sessionId: input.session,
      },
      include: {
        session: {
          include: {
            tasks: true,
            participants: true,
          },
        },
        votes: true,
      },
    });

    // publish task created
    await pubsub.publish(TASK_CREATED, {
      taskCreated: [task],
    });

    return task;
  } catch (err) {
    throw new Error(err);
  }
}

export async function bulkCreateTasks(_, { input }, { prisma }) {
  try {
    const payload = input.tasks.map((task) => ({
      title: task,
      sessionId: input.session,
    }));

    const tasks = await prisma.task.createManyAndReturn({
      data: payload,
      include: {
        session: {
          include: {
            tasks: true,
            participants: true,
          },
        },
        // votes: true,
      },
    });

    // publish task created
    await pubsub.publish(TASK_CREATED, {
      taskCreated: tasks,
    });

    return tasks;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateTask(_, { input }, { prisma }) {
  try {
    const task = await prisma.task.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        status: input.status,
      },
      include: {
        session: {
          include: {
            tasks: true,
            participants: true,
          },
        },
        votes: true,
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
}

export async function deleteTask(_, { id }, { prisma }) {
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
}
