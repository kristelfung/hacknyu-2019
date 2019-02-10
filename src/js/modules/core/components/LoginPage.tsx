import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Field, Form } from "react-final-form";
import Button from "./Button";
import { AnyAction, compose, Dispatch } from "redux";
import { connect } from "react-redux";
import { loginWithGoogle, loginWithPassword } from "../coreActions";
import { emailRegex } from "../../constants";
import Input from "./Input";
import { Link } from "react-router-dom";
import Underline from "./Underline";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import { IS_REGISTRATION_OPEN } from "../../constants";

interface Props extends WithStyles<typeof styles> {
  isSubmitting: boolean;
  loginWithGoogle: () => void;
  loginWithPassword: (
    { email, password }: { email: string; password: string }
  ) => void;
}

interface FormValues {
  email: string;
  password: string;
}

const styles = (theme: Theme) => ({
  LoginPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    maxWidth: theme.containerSmallWidth,
    minWidth: "500px",
    color: theme.secondFont,
    backgroundColor: theme.formBackground,
    paddingTop: "3em",
    paddingBottom: "1em",
    borderRadius: "0.5em"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center"
  },
  registerLink: {
    padding: "20px 20px 0px 20px",
    fontSize: "1.2em"
  },
  resetPasswordLink: {
    padding: "5px 20px 20px 20px",
    fontSize: "1.2em"
  },
  underline: {
    border: "2px solid #6fb1f5",
    width: "2em"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    LoginPage: {
      minWidth: "0px"
    }
  }
});

const validateLogin = (values: any) => {
  let errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (values.email && !emailRegex.test(values.email)) {
    errors.email = "Invalid email";
  }
  return errors;
};

const LoginPage: React.FunctionComponent<Props> = ({
  classes,
  isSubmitting,
  loginWithGoogle,
  loginWithPassword
}) => {
  const handleSubmit = (values: FormValues) => {
    loginWithPassword(values);
  };
  const handleGoogleLogin = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    loginWithGoogle();
  };
  return (
    <div className={classes.LoginPage}>
      <h1> LOGIN </h1>
      <Underline/>
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
              type="submit"
            >
              LOGIN
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={handleGoogleLogin}
            >
              LOGIN W/ GOOGLE
            </Button>
            {IS_REGISTRATION_OPEN && 
              <Link to="/register" className={classes.registerLink}>
               Don't have an account? Register
              </Link>
            }
            <Link to="/reset_password" className={classes.resetPasswordLink}>
              Forgot your password? Reset it
            </Link>
          </form>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  isSubmitting: state.core.loginForm.isSubmitting
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginWithGoogle: () => {
    dispatch<any>(loginWithGoogle());
  },
  loginWithPassword: ({ email, password }: FormValues) => {
    dispatch<any>(loginWithPassword({ email, password }));
  }
});

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);
