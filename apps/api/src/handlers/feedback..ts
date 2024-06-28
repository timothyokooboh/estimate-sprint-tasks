export const sendFeedback = async (_, { input }, { prisma }) => {
  try {
    const feedback = await prisma.feedback.create({
      data: {
        fullName: input.fullName,
        email: input.email,
        message: input.message,
      },
    });

    return feedback;
  } catch (err) {
    throw err;
  }
};
