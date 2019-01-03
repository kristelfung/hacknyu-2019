import { User } from "firebase";
// Misc types

export interface ReduxState {
  core: CoreState;
}

export interface Errors {
  loginError: string;
  logoutError: string;
  registerError: string;
  passwordEmailError: string;
  updatePasswordError: string;
}

export enum LoadingStates {
  Loading,
  Loaded,
  Failed
}

export interface CoreState {
  viewportWidth: number;
  viewportHeight: number;
  user: User;
  errors: Errors;
  loadingState: LoadingStates;
}

export interface Theme {
  backgroundColor: string;
  secondBackground: string;
  thirdBackground: string;
  fontColor: string;
  secondFont: string;
  secondFontHover: string;
  highlightColor: string;
  highlightColorHover: string;
  formBackground: string;
  submitButton: string;
  submitButtonHover: string;
  submitButtonDeactivated: string;
  errorBorder: string;
  errorText: string;
  errorBackground: string;
  notificationBackground: string;
  notificationBorder: string;
  overlayColor: string;
  fontFamily: string;
  inputPadding: string;
  red: string;
  green: string;
  blue: string;
  orange: string;
  containerWidth: string;
  containerSmallWidth: string;
}
export type JssValue =
  | string
  | number
  | Array<string | number | Array<string | number> | "!important">
  | null
  | false;

// Basically calculated props. Returns a JssValue (which I stole from the
// JSS typings, idk why JSS doesn't export it)
export type JssFunction<Props> = (props: Props) => JssValue;

export type JssRules = { [s: string]: JssValue | JssFunction | JssRules };
