import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { Theme } from "../../types";
import { Field, Form } from "react-final-form";
import Button from "./Button";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { emailRegex } from "../../constants";
// @ts-ignore
import { register } from "../coreActions";
import Input from "./Input";
import { Link } from "react-router-dom";

const styles = (theme: Theme): Styles => ({
  RegisterPage: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "75%",
    color: theme.fontColor,
    backgroundColor: theme.formBackground
  },
  loginLink: {
    fontSize: "1.2em",
    padding: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "flex-end"
  }
});

interface Props {
  classes: { [s: string]: string };
  register: ({ email, password }: FormValues) => any;
  isSubmitting: boolean;
}

interface FormValues {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

const RegisterPage: React.SFC<Props> = ({
  classes,
  register,
  isSubmitting
}) => {
  const handleSubmit = (values: FormValues) => {
    register(values);
  };
  return (
    <div className={classes.RegisterPage}>
      <h1> Register </h1>
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
              Submit
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

const mapStateToProps = state => ({
  isSubmitting: state.core.registerForm.isSubmitting
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ register }, dispatch);


export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterPage);
