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
import Underline from "./Underline";

const styles = (theme: Theme): object => ({
  ResetPasswordPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.containerSmallWidth,
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    paddingTop: "3em",
    paddingBottom: "3em",
    borderRadius: "0.5em"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  button: {
    marginRight: "20px"
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

  return (
    <div className={classes.ResetPasswordPage}>
      <h1> Reset Password </h1>
      <Underline />
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
            <Button
              className={classes.button}
              disabled={invalid || isSubmitting}
              width="160px"
              type="submit"
            >
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
