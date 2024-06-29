export enum TASK_STATUS {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum PARTICIPANT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum ESTIMATION_MODE {
  TIME_ESTIMATES = 'TIME_ESTIMATES',
  STORY_POINTS = 'STORY_POINTS'
}

export enum SESSION_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type Session = {
  id: string
  title: string
  status: SESSION_STATUS
  tasks: Task[]
  participants: Participant[]
  moderator: Participant
  votes: Vote[]
  currentTaskId: string | null
}
export type Vote = {
  id: string
  value: number
  participantId: string
  taskId: string
}

export type Participant = {
  id: string
  name: string
  vote: Vote
  status: PARTICIPANT_STATUS
  isModerator: boolean
  votes: Vote[]
}

export type Task = {
  id: string
  title: string
  sessionId: string
  status: TASK_STATUS
  votes: Vote[]
  averageVote: number
}

export type Activity =
  | 'No task'
  | 'Start voting'
  | 'Waiting for moderator'
  | 'Voting panel'
  | 'Bar chart'
