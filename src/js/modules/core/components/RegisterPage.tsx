import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Field, Form } from "react-final-form";
import Button from "../../forms/components/Button";
import { connect } from "react-redux";
import { bindActionCreators, compose, Dispatch } from "redux";
import { emailRegex } from "../../constants";
import { register } from "../coreActions";
import Input from "../../forms/components/Input";
import { Link } from "react-router-dom";
import Underline from "./Underline";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";

const styles = (theme: Theme) => ({
  RegisterPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.secondFont,
    backgroundColor: theme.formBackground,
    paddingTop: "3em",
    paddingBottom: "1em",
    borderRadius: "0.5em"
  },
  loginLink: {
    fontSize: "1.2em",
    padding: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center"
  }
});


interface Props extends WithStyles<typeof styles> {
  register: ({ email, password }: FormValues) => any;
  isSubmitting: boolean;
}

interface FormValues {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}


const RegisterPage: React.FunctionComponent<Props> = ({
  classes,
  register,
  isSubmitting
}) => {
  const handleSubmit = (values: FormValues) => {
    register(values);
  };
  return (
    <div className={classes.RegisterPage}>
      <h1> REGISTER </h1>
      <Underline/>
      <Form
        onSubmit={handleSubmit}
        validate={values => {
          let errors: FormValues = {};
          // Ugh the typing rules for final-form are broken, hence all the ts-ignores

          //@ts-ignore
          if (!values.email) {
            errors.email = "Email is required";
          }

          //@ts-ignore
          if (!values.password) {
            errors.password = "Password is required";
          }

          //@ts-ignore
          if (!values.passwordConfirmation) {
            errors.passwordConfirmation = "Password confirmation is required";
          }

          //@ts-ignore
          if (values.password && values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }

          //@ts-ignore
          if (values.password && values.passwordConfirmation) {
            //@ts-ignore
            if (values.password !== values.passwordConfirmation) {
              errors.passwordConfirmation =
                "Password must be the same as password confirmation";
            }
          }
          //@ts-ignore
          if (values.email && !emailRegex.test(values.email)) {
            errors.email = "Invalid email";
          }
          return errors;
        }}
        render={({ handleSubmit, invalid }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }) => (
                <Input
                  input={input}
                  meta={meta}
                  label="Email"
                  type="email"
                  placeholder="ben@bitdiddle.com"
                />
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <Input
                  input={input}
                  meta={meta}
                  label="Password"
                  type="password"
                  placeholder="********"
                />
              )}
            </Field>
            <Field name="passwordConfirmation">
              {({ input, meta }) => (
                <Input
                  input={input}
                  meta={meta}
                  label="Confirm"
                  type="password"
                  placeholder="********"
                />
              )}
            </Field>
            <Button
              disabled={invalid || isSubmitting}
              width="100px"
              type="submit"
            >
              SUBMIT
            </Button>
            <Link to="/login" className={classes.loginLink}>
              Already have an account? Login
            </Link>
          </form>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  isSubmitting: state.core.registerForm.isSubmitting
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ register }, dispatch);


export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterPage);
