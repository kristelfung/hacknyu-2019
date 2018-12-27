import * as React from "react";
import { Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { emailRegex } from "../../constants";
import { Field, Form } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { resetPassword, clearEmailState } from "../coreActions";
import Input from "./Input";
import { connect } from "react-redux";
import Button from "./Button";

const styles = (theme: Theme): object => ({
  ResetPasswordPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5%",
    width: "100vw",
    backgroundColor: theme.formBackground
  }
});

interface Props {
  classes: { [s: string]: string };
  resetPassword: (s: string) => any;
  passwordEmailSent: boolean;
  clearEmailState: () => any;
  isSubmitting: boolean;
}

const ResetPasswordPage: React.SFC<Props> = ({
  classes,
  resetPassword,
  passwordEmailSent,
  clearEmailState,
  isSubmitting
}) => {
  const handleSubmit = (values: object) => {
    resetPassword(values.email);
  };

  if (passwordEmailSent) {
    return (
      <div className={classes.ResetPasswordPage}>
        <h1> Reset Password </h1>
        <div>
          You already reset your password.
          <a href="#" onClick={clearEmailState}>
            Reset again?
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.ResetPasswordPage}>
      <h1> Reset Password </h1>
      <Form
        onSubmit={handleSubmit}
        validate={values => {
          let errors: { email?: string } = {};
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
            <Button disabled={invalid || isSubmitting} type="submit">
              Reset Password
            </Button>
          </form>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPassword, clearEmailState }, dispatch);

const mapStateToProps = state => ({
  passwordEmailSent: state.core.passwordEmailSent,
  isSubmitting: state.core.resetPasswordForm.isSubmitting
});

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResetPasswordPage);
