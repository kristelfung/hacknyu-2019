import {User} from "firebase";

export interface State {
  core: CoreState
}
export interface CoreState {
  viewportWidth: number
  viewportHeight: number
  user: User,
  error: string
}