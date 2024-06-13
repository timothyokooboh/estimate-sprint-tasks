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
    sessionId: String!
    session: Session!
    votes: [Vote]
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
    currentTaskId: ID
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
  }

  input listParticipantsInput {
    session: ID!
    task: ID
  }

  input viewParticipantInput {
    id: ID!
    task: ID
  }

  input listTasksInput {
    session: ID!
    status: TASK_STATUS
  }

  type Query {
    listParticipants(input: listParticipantsInput!): [Participant]
    viewParticipant(input: viewParticipantInput!): Participant
    listSessions: [Session]
    viewSession(id: ID!): Session
    listTasks(input: listTasksInput): [Task]
    viewTask(id: ID!): Task
  }

  input CreateSessionInput {
    title: String!
  }

  input JoinSessionInput {
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

  input CreateVoteInput {
    participant: ID!
    task: ID!
    value: String!
  }

  input UpdateVoteInput {
    id: ID!
    value: String!
  }

  input ResetVotesInput {
    votes: [ID!]
  }

  input StartVotingInput {
    sessionId: ID!
    taskId: ID!
  }

  type Mutation {
    createSession(input: CreateSessionInput!): Session
    endSession(id: ID!): Session
    joinSession(input: JoinSessionInput!): Participant @sessionActive
    leaveSession(participant: ID!): Participant
    createTask(input: CreateTaskInput!): Task @sessionActive
    bulkCreateTasks(input: BulkCreateTasksInput!): [Task] @sessionActive
    updateTask(input: TaskUpdateInput!): Task
    deleteTask(id: ID!): ID
    createVote(input: CreateVoteInput!): Vote
    updateVote(input: UpdateVoteInput!): Vote
    resetVotes(input: ResetVotesInput!): [ID]
    startVoting(input: StartVotingInput): Session
  }

  type Subscription {
    participantJoined: Participant
    participantLeft: Participant
    sessionEnded: Session
    taskCreated: [Task]
    taskUpdated: Task
    taskDeleted: ID
    voteCreated: Vote
    voteUpdated: Vote
    votesReset: [ID]
    votingStarted: ID # ID of the task being voted for
  }
`;
