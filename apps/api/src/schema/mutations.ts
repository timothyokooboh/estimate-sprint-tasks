import gql from "graphql-tag";

export const mutations = `
  input CreateSessionInput {
    title: String!
  }

  input CreateParticipantInput {
    name: String!
    session: ID!
    isModerator: Boolean
  }

  input TaskCreateInput {
    title: String!
    session: ID!
  }

  input BulkCreateTasksInput {
    tasks: [String!]
    session: ID!
  }

  input TaskUpdateInput {
    id: ID!
    title: String
    status: TASK_STATUS
  }

  input VoteCreateInput {
    participant: ID!
    task: ID!
    value: String!
    time: Int!
  }

  input VoteUpdateInput {
    id: ID!
    value: String!
    time: Int!
  }

  input VoteResetInput {
    votes: [ID!]
  }

  type Mutation {
    createSession(input: CreateSessionInput!): Session
    endSession(id: ID!): Session
    createParticipant(input: CreateParticipantInput!): Participant
      @sessionActive
    leaveSession(participant: ID!): Participant
    createTask(input: TaskCreateInput!): Task @sessionActive
    bulkCreateTasks(input: BulkCreateTasksInput!): [Task] @sessionActive
    updateTask(input: TaskUpdateInput!): Task
    deleteTask(id: ID!): ID
    createVote(input: VoteCreateInput!): Vote
    updateVote(input: VoteUpdateInput!): Vote
    resetVotes(input: VoteResetInput!): [ID]
  }
`;
