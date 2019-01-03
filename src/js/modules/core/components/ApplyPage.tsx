import * as React from "react";
import { JssRules, ReduxState, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { push } from "connected-react-router";
import { submitApp } from "../coreActions";
import { Form, Field, FormSpy } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";
import { schools } from "../schools";
import SchoolInput from "./SchoolInput";
import Condition from "./Condition";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Select from "./Select";
import UploadResumeButton from "./UploadResumeButton";

interface Props {
  classes: ApplyPageStyles<string>;
  user: User;
  push: (route: string) => any;
  formData: FormData;
  submitTimestamp: string;
  submitApp: (values: FormData, incompleteFields: string[]) => any;
}

interface ApplyPageStyles<T> extends Styles {
  ApplyPage: T;
  header: T;
  form: T;
  inputs: T;
  inputLabel: T;
  submit: T;
  checkbox: T;
  loadingText: T;
  autocompleteItem: T;
  mlhPolicy: T;
  underline: T;
  multipleCheckboxes: T;
  genderOptions: T;
  termsAndConditions: T;
}

interface FormData {
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

  allergies: string;
  codeOfConduct: boolean;
  privacyPolicy: boolean;
  resumeTimestamp: string; // timestamp
}

interface ApplyPageState {
  formData: FormData | null;
  isLoading: boolean;
}

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
  gender: "Gender",
  codeOfConduct: "Code of Conduct",
  privacyPolicy: "Private Policy"
};

const styles = (theme: Theme): ApplyPageStyles<JssRules> => ({
  ApplyPage: {
    display: "flex",
    width: "100%",
    maxWidth: theme.containerWidth,
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
  multipleCheckboxes: {
    margin: "40px 0 40px 0"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.3em",
    fontSize: "1.5em",
    padding: "40px"
  },
  inputs: {
    display: "flex",
    lineHeight: "2rem",
    flexDirection: "column"
  },
  inputLabel: {
    maxWidth: "300px",
    lineHeight: "1.8rem"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
  },
  checkbox: {
    width: "20px",
    height: "20px"
  },
  loadingText: {
    fontSize: "1.3em"
  },
  autocompleteItem: {
    padding: theme.inputPadding
  },
  mlhPolicy: {
    maxWidth: "500px",
    lineHeight: "1.8rem"
  },
  underline: {
    border: "2px solid #6fb1f5",
    width: "2em"
  },
  genderOptions: {
    padding: "40px"
  },
  termsAndConditions: {
    padding: "15px"
  },
});

interface IncompleteField {
  field: string;
  name: string;
}

class ApplyPage extends React.Component<Props, ApplyPageState> {
  // Checks if values are all filled and puts an empty string if they aren't
  // (so firebase doesn't complain)
  getIncompleteFields = (values: any): IncompleteField[] => {
    let incompleteFields = [];
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

  handleSave = (values, incompleteFields) => {
    this.props.submitApp(values, incompleteFields);
  };

  handleSubmit = values => {
    this.props.submitApp(values, []);
  };

  validateForm = (values: FormData): object => {
    const incomplete = this.getIncompleteFields(values);
    let errors = {};
    incomplete.map(({ field }) => {
      errors[field] = `Field cannot be empty`;
    });
    return errors;
  };

  render() {
    let { classes, isSubmitting, user, formData, submitTimestamp } = this.props;
    return (
      <div className={classes.ApplyPage}>
        <h1 className={classes.header}> Apply </h1>
        <Form
          onSubmit={this.handleSubmit}
          validate={this.validateForm}
          initialValues={formData}
          render={({ handleSubmit, pristine, invalid }) => (
            <div className={classes.form}>
              <form onSubmit={handleSubmit}>
                <div className={classes.inputs}>
                  <Field
                    className={classes.input}
                    name="firstName"
                    label="First Name:"
                    component={Input}
                    placeholder="Rose"
                  />
                  <Field
                    className={classes.input}
                    name="lastName"
                    label="Last Name:"
                    component={Input}
                    placeholder="Kolodny"
                  />
                  <Field
                    id="date"
                    name="birthDate"
                    label="Date Of Birth:"
                    type="date"
                    component={Input}
                  />
                  <Field
                    className={classes.input}
                    name="gender"
                    label="Gender:"
                    component={Select}
                  >
                    <option value=""> Select an option </option>
                    <option value="male"> Male </option>
                    <option value="female"> Female </option>
                    <option value="non-binary"> Non-binary </option>
                    <option value="prefer-not"> Prefer not to say </option>
                    <option value="other"> Other </option>
                  </Field>
                  <fieldset className={classes.multipleCheckboxes}>
                    <legend className={classes.inputLabel}>
                      (Optional) What races/ethnicities do you most closely
                      identify with? Check all that apply.
                    </legend>
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
                    <Checkbox name="isWhiteCaucasian">
                      White / Caucasian
                    </Checkbox>
                    <Checkbox name="isOther">Other</Checkbox>
                  </fieldset>
                  <Field
                    name="phoneNumber"
                    label="Phone Number:"
                    className={classes.input}
                    component={Input}
                    type="tel"
                    placeholder="1-800-867-5309"
                  />

                  <UploadResumeButton
                    uid={user.uid}
                    resumeTimestamp={formData && formData.resumeTimestamp}
                  />

                  <fieldset className={classes.multipleCheckboxes}>
                    <legend className={classes.inputLabel}>
                      Any dietary restrictions? Check all that apply.
                    </legend>
                    <Checkbox name="isVeggie">Vegetarian</Checkbox>
                    <Checkbox name="isVegan">Vegan</Checkbox>
                    <Checkbox name="isKosher">Kosher</Checkbox>
                    <Checkbox name="isHalal">Halal</Checkbox>
                    <Checkbox name="isGlutenFree">Gluten Free</Checkbox>
                  </fieldset>

                  <Field
                    className={classes.input}
                    label="(Optional) Any other dietary restrictions or allergies?"
                    name="allergies"
                    component={Input}
                  />
                  <Field
                    name="school"
                    label="School:"
                    component={SchoolInput}
                    schools={schools}
                    classes={classes}
                  />
                  <Condition when="school" is="New York University">
                    <Field
                      label="NYU School:"
                      className={classes.input}
                      name="nyuSchool"
                      component={Select}
                    >
                      <option value="">Select an option</option>
                      <option value="tandon">
                        Tandon School of Engineering
                      </option>
                      <option value="cas">College of Arts and Science</option>
                      <option value="gsas">
                        Graduate School of Arts and Science
                      </option>
                      <option value="stern">
                        Leonard N. Stern School of Business
                      </option>
                      <option value="nursing">
                        Rory Meyers College of Nursing
                      </option>
                      <option value="steinhardt">
                        Steinhardt School of Culture, Education, and Human
                        Development
                      </option>
                      <option value="tisch">Tisch School of the Arts</option>
                      <option value="dentistry">College of Dentistry</option>
                      <option value="sps">
                        School of Professional Studies
                      </option>
                      <option value="silver">
                        Silver School of Social Work
                      </option>
                      <option value="ls"> Liberal Studies </option>
                      <option value="gallatin">
                        Gallatin School of Individualized Study
                      </option>
                      <option value="global-health">
                        College of Global Public Health
                      </option>
                      <option value="abu-dhabi"> Abu Dhabi </option>
                      <option value="shanghai"> Shanghai </option>
                      <option value="other">Other (please specify):</option>
                    </Field>
                  </Condition>
                  <Condition when="nyuSchool" is="other">
                    <label>
                      <Field
                        className={classes.input}
                        name="nyuSchoolOther"
                        component="input"
                      />
                    </label>
                  </Condition>
                  <Field
                    label="Current year of study:"
                    className={classes.input}
                    name="yearOfStudy"
                    component={Select}
                  >
                    <option value=""> Select an option </option>
                    <option value="high-school">High School </option>
                    <option value="freshman">First-year (Freshman)</option>
                    <option value="sophomore"> Sophomore </option>
                    <option value="junior"> Junior </option>
                    <option value="senior"> Senior </option>
                    <option value="graduate">
                      Graduate Student (Masters or Doctorate)
                    </option>
                    <option value="post-grad"> Post Graduate </option>
                  </Field>
                  <Field
                    label="Major:"
                    className={classes.input}
                    name="major"
                    component={Input}
                  />

                  <Field
                    className={classes.input}
                    label="Anticipated graduation year:"
                    name="gradYear"
                    component={Select}
                  >
                    <option value=""> Select an option </option>
                    <option value="2019"> 2019 </option>
                    <option value="2020"> 2020 </option>
                    <option value="2021"> 2021 </option>
                    <option value="2022"> 2022 </option>
                    <option value="2023"> 2023 </option>
                    <option value="2024-plus"> 2024 or later </option>
                  </Field>

                  <Field
                    label="Is this your first time at HackNYU?"
                    className={classes.input}
                    name="isFirstTime"
                    component={Select}
                  >
                    <option value=""> Select an option </option>
                    <option value="yes"> Yes </option>
                    <option value="no"> No </option>
                  </Field>
                  <Condition when="isFirstTime" is="no">
                    <label>
                      <Field
                        className={classes.input}
                        name="timesParticipated"
                        label="How many times have you participated at HackNYU so far?"
                        component={Select}
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
                    className={classes.input}
                    label="Which track are you currently most interested in hacking in? (You can change your track at the hackathon)"
                    name="track"
                    component={Select}
                  >
                    <option value=""> Select an option </option>
                    <option value="assistive-tech"> Assistive Tech </option>
                    <option value="ed-tech">Educational Technology</option>
                    <option value="fin-tech"> Financial Technology </option>
                    <option value="healthcare"> Healthcare </option>
                    <option value="sustain-social-impact">
                      Sustainability and Social Impact
                    </option>
                  </Field>

                  <Field
                    className={classes.input}
                    label="Unisex t-shirt size:"
                    name="tshirtSize"
                    component={Select}
                  >
                    <option value=""> Select an option </option>
                    <option value="x-small"> XS </option>
                    <option value="small"> S </option>
                    <option value="medium"> M </option>
                    <option value="large"> L </option>
                    <option value="x-large"> XL </option>
                    <option value="xx-large"> XXL </option>
                  </Field>


                  <Field
                    className={classes.input}
                    label="(Optional) Any allergies?"
                    name="allergies"
                    component={Input}
                  />

                  <label className={classes.termsAndConditions}>
                    <div className={classes.inputLabel}>
                      I have read and agree to the{" "}
                      <a href="https://mlh.io/code-of-conduct">
                        MLH Code of Conduct.
                      </a>
                    </div>
                    <Field
                      className={classes.checkbox}
                      name="codeOfConduct"
                      component="input"
                      type="checkbox"
                    />
                  </label>
                  <label className={classes.termsAndConditions}>
                    <div className={classes.mlhPolicy}>
                      I authorize HackNYU to share my application/registration
                      information for event administration, pre- and post-event
                      informational emails, and occasional messages about
                      hackathons in-line with the MLH Privacy Policy. I further
                      agree to the Contest Terms and Conditions and the MLH
                      Privacy Policy.
                    </div>
                    <Field
                      className={classes.checkbox}
                      name="privacyPolicy"
                      component="input"
                      type="checkbox"
                    />
                  </label>
                  <FormSpy
                    render={({ form }) => {
                      const fields = form.getState().values;
                      const incompleteFields = this.getIncompleteFields(fields);
                      if (!submitTimestamp && incompleteFields.length !== 0) {
                        return (
                          <Button
                            className={classes.submit}
                            onClick={() =>
                              this.handleSave(fields, incompleteFields)
                            }
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
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  formData: state.core.applyForm.formData,
  submitTimestamp: state.core.applyForm.submitTimestamp,
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
