import * as React from "react";
import { Field, Form } from "react-final-form";
import Input from "./Input";
import Button from "./Button";
import { bindActionCreators, Dispatch } from "redux";
import { updatePassword } from "../coreActions";
import { connect } from "react-redux";
import injectSheet, { WithStyles } from "react-jss";
import { ReduxState } from "../../../reducers";

interface Props extends WithStyles<typeof styles> {
  updatePassword: (password: string) => any;
  isSubmitting: boolean;
}

const styles = {
  UpdatePasswordForm: {
    display: "flex",
    flexDirection: "column",
    padding: "40px"
  }
};

const UpdatePasswordForm: React.FunctionComponent<Props> = ({
  classes,
  updatePassword,
  isSubmitting
}) => {
  const handleSubmit = (values: any) => {
    updatePassword(values.password);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={({
        password,
        passwordConfirmation
      }: {
        password: string;
        passwordConfirmation: string;
      }) => {
        let errors: { password?: string; passwordConfirmation?: string } = {};
        if (!password) {
          errors.password = "Password is required";
        } else if (password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        }

        if (!passwordConfirmation) {
          errors.passwordConfirmation = "Password confirmation is required";
        }

        if (password && passwordConfirmation) {
          if (password !== passwordConfirmation) {
            errors.passwordConfirmation =
              "Password must be the same as password confirmation";
          }
        }
        return errors;
      }}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit} className={classes.UpdatePasswordForm}>
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
          <Button type="submit" disabled={invalid || isSubmitting}>
            UPDATE
          </Button>
        </form>
      )}
    />
  );
};

const mapStateToProps = (state: ReduxState) => ({
  isSubmitting: state.core.updatePasswordForm.isSubmitting
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updatePassword }, dispatch);

export default injectSheet(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdatePasswordForm)
);
