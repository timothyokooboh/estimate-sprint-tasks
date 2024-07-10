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

  enum ESTIMATION_MODE {
    TIME_ESTIMATES
    STORY_POINTS
  }

  type User {
    id: ID!
    email: String!
    name: String
    picture: String
  }

  type AuthPayload {
    token: String!
    user: User!
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
    estimationMode: ESTIMATION_MODE
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
    averageVote: String
  }

  type Vote {
    id: ID!
    createdAt: String!
    updatedAt: String!
    value: Float!
    participantId: ID
    participant: Participant
    taskId: ID!
    task: Task!
  }

  type Feedback {
    id: ID!
    createdAt: String!
    updatedAt: String!
    fullName: String!
    email: String!
    message: String!
  }

  input listParticipantsInput {
    sessionId: ID!
    taskId: ID
  }

  input viewParticipantInput {
    id: ID!
    taskId: ID
  }

  input listTasksInput {
    sessionId: ID!
    status: TASK_STATUS
  }

  type Query {
    listParticipants(input: listParticipantsInput!): [Participant]
    viewParticipant(input: viewParticipantInput!): Participant
    listSessions: [Session]
    viewSession(id: ID): Session
    listTasks(input: listTasksInput): [Task]
    viewTask(id: ID!): Task
  }

  input CreateSessionInput {
    title: String!
    moderator: String!
    estimationMode: ESTIMATION_MODE!
  }

  input JoinSessionInput {
    name: String!
    sessionId: ID!
    isModerator: Boolean
  }

  input CreateTaskInput {
    title: String!
    sessionId: ID!
  }

  input BulkCreateTasksInput {
    tasks: [String!]
    sessionId: ID!
  }

  input UpdateTaskInput {
    id: ID!
    title: String
    status: TASK_STATUS
  }

  input CastVoteInput {
    participantId: ID!
    taskId: ID!
    value: Float!
  }

  input UpdateVoteInput {
    id: ID!
    value: Float!
  }

  input ResetVotesInput {
    votes: [ID!]
  }

  input StartVotingInput {
    sessionId: ID!
    taskId: ID!
  }

  input SendFeedbackInput {
    fullName: String!
    email: String!
    message: String!
  }

  type Mutation {
    googleSignIn(access_token: String!): AuthPayload!
    createSession(input: CreateSessionInput!): Session
    endSession(id: ID!): ID
    joinSession(input: JoinSessionInput!): Participant @sessionActive
    leaveSession(participant: ID!): Participant
    createTask(input: CreateTaskInput!): Task @sessionActive
    bulkCreateTasks(input: BulkCreateTasksInput!): [Task] @sessionActive
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: ID!): ID
    resetTask(id: ID!): Task
    castVote(input: CastVoteInput!): Vote
    startVoting(input: StartVotingInput): Session @sessionActive
    sendFeedback(input: SendFeedbackInput!): Feedback
  }

  type Subscription {
    participantJoined: Participant
    participantLeft: Participant
    sessionEnded: ID
    taskCreated: [Task]
    taskUpdated: Task
    taskDeleted: ID
    taskReset: Task
    voteCasted: Vote
    votingStarted: ID # ID of the task being voted for
  }
`;
