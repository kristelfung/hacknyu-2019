import * as React from "react";
import { ApplyFormData, IncompleteField } from "../../types";
import injectSheet, { WithStyles } from "react-jss";
import { push } from "connected-react-router";
import { submitApp } from "../../core/coreActions";
import { Form, Field, FormSpy } from "react-final-form";
import { User } from "firebase";
import Condition from "./Condition";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Select from "./Select";
import UploadResumeButton from "./UploadResumeButton";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link } from "react-router-dom";
import CheckboxesContainer from "./CheckboxesContainer";
import InputLabel from "./InputLabel";
import EmergencyContactInfo from "./EmergencyContactInfo";
import TermsAndConditions from "./TermsAndConditions";
import EducationInfo from "./EducationInfo";

const requiredFields = {
  firstName: "First Name",
  lastName: "Last Name",
  birthDate: "Birth Date",
  phoneNumber: "Phone Number",
  school: "School",
  gender: "Gender",
  yearOfStudy: "Year of Study",
  major: "Major",
  gradYear: "Graduation Year",
  isFirstTime: "First time participating",
  track: "Preferred Track",
  tshirtSize: "T-shirt size",
  codeOfConduct: "Code of Conduct",
  privacyPolicy: "Private Policy",
  emergencyContactName: "Emergency contact name",
  emergencyContactNumber: "Emergency contact number",
  emergencyContactRelation: "Relation to emergency contact"
};

const styles = (theme: Theme) => ({
  admittedAlert: {
    fontSize: "1.3rem",
    padding: "2rem"
  },
  ApplyPage: {
    display: "flex",
    width: "90vw",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    paddingTop: "3em",
    paddingBottom: "2em"
  },
  header: {
    padding: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.2em",
    fontSize: "1.5em",
    padding: "40px 0 40px 0"
  },
  link: {
    textDecoration: "underline"
  },
  inputs: {
    display: "flex",
    lineHeight: "2rem",
    flexDirection: "column"
  },
  resumeUpload: {
    maxWidth: "500px",
    padding: "20px",
    lineHeight: "1.8rem"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
  },
  loadingText: {
    fontSize: "1.3em"
  },
  autocompleteItem: {
    padding: theme.inputPadding
  },
  genderOptions: {
    padding: "40px"
  },
  warning: {
    maxWidth: "400px",
    color: "red"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    ApplyPage: {
      maxWidth: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ApplyPage: {
      maxWidth: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    inputs: {
      alignItems: "center"
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  isAdmitted: boolean;
  user: User;
  push: (route: string) => any;
  isSubmitting: boolean;
  formData: ApplyFormData;
  submitTimestamp: string;
  submitApp: (
    values: ApplyFormData,
    incompleteFields: IncompleteField[]
  ) => any;
}

const ApplyPage: React.FunctionComponent<Props> = ({
  classes,
  isAdmitted,
  isSubmitting,
  user,
  formData,
  submitApp,
  submitTimestamp
}) => {
  // Checks if values are all filled and puts an empty string if they aren't
  // (so firebase doesn't complain)
  const getIncompleteFields = (values: any): IncompleteField[] => {
    let incompleteFields: IncompleteField[] = [];
    Object.entries(requiredFields).forEach(([field, name]) => {
      if (
        !(field in values) ||
        values[field] === undefined ||
        values[field] === "" ||
        values[field] === false
      ) {
        values[field] = "";
        incompleteFields.push({ field, name });
      }
    });
    return incompleteFields;
  };

  const handleSave = (
    values: ApplyFormData,
    incompleteFields: IncompleteField[]
  ) => {
    submitApp(values, incompleteFields);
  };

  const handleSubmit = (values: ApplyFormData) => {
    submitApp(values, []);
  };

  const validateForm = (values: ApplyFormData): object => {
    const incomplete = getIncompleteFields(values);
    let errors: { [s: string]: string } = {};
    incomplete.map(({ field }: { field: string }) => {
      errors[field] = `Field cannot be empty`;
    });
    if (values.phoneNumber === values.emergencyContactNumber) {
      errors.emergencyContactNumber =
        "Emergency contact number cannot be your phone number!";
    }
    return errors;
  };

  return (
    <div className={classes.ApplyPage}>
      {isAdmitted && <div className={classes.admittedAlert}>
        You've already been accepted! Please{" "}
        <Link to="/status" className={classes.link}> confirm your attendance! </Link>
      </div>}
      {isAdmitted ? (<h1 className={classes.header}> Edit Application </h1>) : <h1 className={classes.header}> APPLY </h1>}
      <Form
        onSubmit={handleSubmit}
        validate={validateForm}
        initialValues={formData}
        render={({ handleSubmit, pristine, invalid }) => (
          <div className={classes.form}>
            <form onSubmit={handleSubmit}>
              <div className={classes.inputs}>
                <Field
                  name="firstName"
                  label="First Name:"
                  render={props => <Input {...props} />}
                  placeholder="Rose"
                />
                <Field
                  name="lastName"
                  label="Last Name:"
                  render={props => <Input {...props} />}
                  placeholder="Kolodny"
                />
                <Field
                  id="date"
                  name="birthDate"
                  label="Date Of Birth:"
                  type="date"
                  render={props => <Input {...props} />}
                />
                <Field
                  name="gender"
                  label="Gender:"
                  render={props => <Select {...props} />}
                >
                  <option value=""> Select an option </option>
                  <option value="male"> Male </option>
                  <option value="female"> Female </option>
                  <option value="non-binary"> Non-binary </option>
                  <option value="prefer-not"> Prefer not to say </option>
                  <option value="other"> Other </option>
                </Field>
                <CheckboxesContainer>
                  <InputLabel>
                    (Optional) What races/ethnicities do you most closely
                    identify with? Check all that apply.
                  </InputLabel>
                  <Checkbox name="isAmericanNative">
                    American Indian / Alaskan Native
                  </Checkbox>
                  <Checkbox name="isAsianPacificIslander">
                    Asian / Pacific Islander
                  </Checkbox>
                  <Checkbox name="isBlackAfricanAmerican">
                    Black / African American
                  </Checkbox>
                  <Checkbox name="isHispanic">Hispanic</Checkbox>
                  <Checkbox name="isWhiteCaucasian">White / Caucasian</Checkbox>
                  <Checkbox name="isOther">Other</Checkbox>
                </CheckboxesContainer>
                <Field
                  name="phoneNumber"
                  label="Phone Number:"
                  render={props => <Input {...props} />}
                  type="tel"
                  placeholder="1-800-867-5309"
                />
                <UploadResumeButton
                  uid={user.uid}
                  label="Upload Resume as PDF:"
                />
                <EducationInfo/>

                <Field
                  label="Is this your first time at HackNYU?"
                  name="isFirstTime"
                  render={props => <Select {...props} />}
                >
                  <option value=""> Select an option </option>
                  <option value="yes"> Yes </option>
                  <option value="no"> No </option>
                </Field>
                <Condition when="isFirstTime" is="no">
                  <label>
                    <Field
                      name="timesParticipated"
                      label="How many times have you participated at HackNYU so far?"
                      render={props => <Select {...props} />}
                    >
                      <option value=""> Select an option </option>
                      <option value="one"> 1 </option>
                      <option value="two"> 2 </option>
                      <option value="three"> 3 </option>
                      <option value="four-plus"> 4 or more </option>
                    </Field>
                  </label>
                </Condition>
                <Field
                  label="Which track are you currently most interested in hacking in? (You can change your track at the hackathon)"
                  name="track"
                  render={props => <Select {...props} />}
                >
                  <option value="">Select an option</option>
                  <option value="education">Education</option>
                  <option value="financial-empowerment">
                    Financial Empowerment
                  </option>
                  <option value="health-well-being">
                    Health and Well-Being
                  </option>
                  <option value="sustainability">Sustainability</option>
                </Field>

                <Field
                  label="Unisex t-shirt size:"
                  name="tshirtSize"
                  render={props => <Select {...props} />}
                >
                  <option value=""> Select an option </option>
                  <option value="x-small"> XS </option>
                  <option value="small"> S </option>
                  <option value="medium"> M </option>
                  <option value="large"> L </option>
                  <option value="x-large"> XL </option>
                  <option value="xx-large"> XXL </option>
                </Field>

                <CheckboxesContainer>
                  <InputLabel>
                    Any dietary restrictions? Check all that apply.
                  </InputLabel>
                  <Checkbox name="isVeggie">Vegetarian</Checkbox>
                  <Checkbox name="isVegan">Vegan</Checkbox>
                  <Checkbox name="isKosher">Kosher</Checkbox>
                  <Checkbox name="isHalal">Halal</Checkbox>
                  <Checkbox name="isGlutenFree">Gluten Free</Checkbox>
                </CheckboxesContainer>

                <Field
                  label="(Optional) Any other dietary restrictions or allergies?"
                  name="otherDietaryRestrictions"
                  render={props => <Input {...props} />}
                />

                <Field
                  label="(Optional) Any allergies?"
                  name="allergies"
                  render={props => <Input {...props} />}
                />

                <EmergencyContactInfo/>
                <TermsAndConditions/>
                <FormSpy
                  render={({ form }) => {
                    const fields = form.getState().values as ApplyFormData;
                    const incompleteFields = getIncompleteFields(fields);
                    if (!submitTimestamp && incompleteFields.length !== 0) {
                      return (
                        <Button
                          className={classes.submit}
                          onClick={() => handleSave(fields, incompleteFields)}
                          disabled={pristine || isSubmitting}
                        >
                          SAVE
                        </Button>
                      );
                    } else {
                      return (
                        <Button
                          className={classes.submit}
                          type="submit"
                          disabled={pristine || invalid || isSubmitting}
                        >
                          SUBMIT
                        </Button>
                      );
                    }
                  }}
                />
              </div>
            </form>
          </div>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  formData: state.core.applyForm.formData,
  submitTimestamp: state.core.applyForm.submitTimestamp,
  isAdmitted: state.core.isAdmitted,
  isSubmitting: state.core.applyForm.isSubmitting
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ push, submitApp }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ApplyPage);
