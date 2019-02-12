import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { emailRegex } from "../../constants";
import { Field, Form } from "react-final-form";
import { bindActionCreators, compose, Dispatch } from "redux";
import { resetPassword, clearEmailState } from "../../core/coreActions";
import Input from "./Input";
import { connect } from "react-redux";
import Button from "./Button";
import Underline from "../../core/components/Underline";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";

const styles = (theme: Theme) => ({
  ResetPasswordPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.containerMediumWidth,
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
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ResetPasswordPage: {
      width: theme.containerSmallWidth
    }
  },
  [`@media(max-width: ${theme.mobileBreakpoint})`]: {
    ResetPasswordPage: {
      width: theme.containerMobileWidth
    }
  },
});

interface Props extends WithStyles<typeof styles> {
  resetPassword: (s: string) => any;
  passwordEmailSent: boolean;
  clearEmailState: () => any;
  isSubmitting: boolean;
}

const ResetPasswordPage: React.FunctionComponent<Props> = ({
  classes,
  resetPassword,
  passwordEmailSent,
  clearEmailState,
  isSubmitting
}) => {
  const handleSubmit = (values: any) => {
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
          <form onSubmit={handleSubmit}>
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ resetPassword, clearEmailState }, dispatch);

const mapStateToProps = (state: ReduxState) => ({
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
