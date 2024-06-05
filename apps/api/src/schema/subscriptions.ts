import gql from "graphql-tag";

export const subscriptions = `
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
