import * as React from "react";
import { JssRules, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { Field, Form } from "react-final-form";
import Button from "./Button";
import { compose } from "redux";
import { connect } from "react-redux";
//@ts-ignore
import { loginWithGoogle, loginWithPassword } from "../coreActions";
import { emailRegex } from "../../constants";
import Input from "./Input";
import { Link } from "react-router-dom";

interface LoginPageStyles<T> extends Styles {
  LoginPage: T;
  form: T;
  registerLink: T;
  resetPasswordLink: T;
}

interface Props {
  classes: LoginPageStyles<string>;
  isSubmitting: boolean;
  loginWithGoogle: () => any;
  loginWithPassword: (
    { email, password }: { email: string; password: string }
  ) => any;
}

interface FormValues {
  email: string;
  password: string;
}

const styles = (theme: Theme): LoginPageStyles<JssRules> => ({
  LoginPage: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "75%",
    color: theme.fontColor,
    backgroundColor: theme.formBackground
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "flex-end"
  },
  registerLink: {
    padding: "20px 20px 0px 20px",
    fontSize: "1.2em"
  },
  resetPasswordLink: {
    padding: "5px 20px 20px 20px",
    fontSize: "1.2em"
  }
});

const validateLogin = values => {
  let errors: { email?: string; password?: string } = {};
  if (values.email && values.email.length === 0) {
    errors.email = "Email is required";
  }
  if (values.password && values.password.length === 0) {
    errors.password = "Password is required";
  }
  if (values.email && !emailRegex.test(values.email)) {
    errors.email = "Invalid email";
  }
  return errors;
};

const LoginPage: React.SFC<Props> = ({
  classes,
  isSubmitting,
  loginWithGoogle,
  loginWithPassword
}) => {
  const handleSubmit = (values: FormValues) => {
    loginWithPassword(values);
  };
  const handleGoogleLogin = (event: Event) => {
    event.preventDefault();
    loginWithGoogle();
  };
  return (
    <div className={classes.LoginPage}>
      <h1> Login </h1>
      <Form
        onSubmit={handleSubmit}
        validate={validateLogin}
        render={({ handleSubmit, invalid }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }) => (
                <Input
                  input={input}
                  meta={meta}
                  label="Email"
                  type="email"
                  placeholder="alyssap@hacker.com"
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
            <Button
              disabled={invalid || isSubmitting}
              width="100px"
              type="submit"
            >
              Login
            </Button>
            <Button
              disabled={isSubmitting}
              width="200px"
              onClick={handleGoogleLogin}
            >
              Login w/ Google
            </Button>
            <Link to="/register" className={classes.registerLink}>
              Don't have an account? Register
            </Link>
            <Link to="/reset_password" className={classes.resetPasswordLink}>
              Forgot your password? Reset it
            </Link>
          </form>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isSubmitting: state.core.loginForm.isSubmitting
});

const mapDispatchToProps = (dispatch: any) => ({
  loginWithGoogle: () => {
    dispatch(loginWithGoogle());
  },
  loginWithPassword: ({ email, password }: FormValues) => {
    dispatch(loginWithPassword({ email, password }));
  }
});

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);
