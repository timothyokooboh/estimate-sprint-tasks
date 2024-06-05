import gql from "graphql-tag";

export const types = `
  enum TASK_STATUS {
    ACTIVE
    COMPLETED
  }

  enum PARTICIPANT_STATUS {
    ACTIVE
    INACTIVE
  }

  enum SESSION_STATUS {
    ACTIVE
    INACTIVE
  }

  type Participant {
    id: ID!
    name: String!
    isModerator: Boolean
    status: PARTICIPANT_STATUS
    createdAt: String!
    updatedAt: String!
    session: Session!
    votes: [Vote]

    #represents the current task for this participant
    task: Task

    #represents the vote for this participant for the current task
    vote: Vote
  }

  type Session {
    id: ID!
    title: String!
    status: SESSION_STATUS
    createdAt: String!
    updatedAt: String!
    participants: [Participant]!
    moderator: Participant!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
    status: TASK_STATUS!
    sessionId: ID!
    session: Session!
    votes: [Vote]
    averageVote: Int
  }

  type Vote {
    id: ID!
    createdAt: String!
    updatedAt: String!
    value: String!
    participantId: ID!
    participant: Participant!
    taskId: ID!
    task: Task!
    time: Int
`;
