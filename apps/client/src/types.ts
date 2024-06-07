export enum TASK_STATUS {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum PARTICIPANT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type Vote = {
  id: string
  value: string
  participantId: string
  taskId: string
}

export type Participant = {
  id: string
  name: string
  vote: Vote
  status: TASK_STATUS
  votes: Vote[]
}

export type Task = {
  id: string
  title: string
  sessionId: string
  status: TASK_STATUS
  votes: Vote[]
}
