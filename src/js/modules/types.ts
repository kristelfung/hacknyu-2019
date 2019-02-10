import { User } from "firebase";
import { LoadingStates } from "./core/coreReducer";
// Misc types

export interface ApplyFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  // race / ethnicity
  isAmericanNative: boolean;
  isAsianPacificIslander: boolean;
  isBlackAfricanAmerican: boolean;
  isHispanic: boolean;
  isWhiteCaucasian: boolean;
  isOther: boolean;
  phoneNumber: string;
  school: string;
  nyuSchool?: string;
  nyuSchoolOther?: string;
  yearOfStudy: string;
  major: string;
  gradYear: string;
  isFirstTime: string;
  timesParticipated: string;
  track: string;
  tshirtSize: string;

  isVeggie: boolean;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;

  otherDietaryRestrictions: string;
  allergies: string;
  codeOfConduct: boolean;
  privacyPolicy: boolean;
  resumeTimestamp: string; // timestamp
  emergencyContactNumber: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
}

export interface ConfirmationFormData {
  location: string;
  nyuCodeOfConduct: boolean;
  nyuPrivacyPolicy: boolean;
  nyuMediaRights: boolean;
}

export interface IncompleteField {
  field: string;
  name: string;
}

export interface Errors {
  loginError: string;
  logoutError: string;
  registerError: string;
  passwordEmailError: string;
  updatePasswordError: string;
}

export interface Form {
  isSubmitting: boolean;
}

export interface IncompleteField {
  field: string;
  name: string;
}
