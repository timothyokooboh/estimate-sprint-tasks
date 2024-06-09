import gql from "graphql-tag";

export const typeDefs = gql`
  directive @sessionActive on FIELD_DEFINITION

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
  }

  input ParticipantsInput {
    session: ID!
    task: ID
  }

  input ParticipantInput {
    id: ID!
    task: ID
  }

  input TaskInput {
    session: ID!
    status: TASK_STATUS
  }

  type Query {
    participants(input: ParticipantsInput!): [Participant]
    participant(input: ParticipantInput!): Participant
    sessions: [Session]
    session(id: ID!): Session
    tasks(input: TaskInput): [Task]
    task(id: ID!): Task
  }

  input CreateSessionInput {
    title: String!
  }

  input CreateParticipantInput {
    name: String!
    session: ID!
    isModerator: Boolean
  }

  input CreateTaskInput {
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
    createTask(input: CreateTaskInput!): Task @sessionActive
    bulkCreateTasks(input: BulkCreateTasksInput!): [Task] @sessionActive
    updateTask(input: TaskUpdateInput!): Task
    deleteTask(id: ID!): ID
    createVote(input: VoteCreateInput!): Vote
    updateVote(input: VoteUpdateInput!): Vote
    resetVotes(input: VoteResetInput!): [ID]
  }

  type Subscription {
    participantAdded: Participant
    participantLeft: Participant
    sessionEnded: Session
    taskCreated: [Task]
    taskUpdated: Task
    taskDeleted: ID
    voteCreated: Vote
    voteUpdated: Vote
    voteReset: [ID]
  }
`;
