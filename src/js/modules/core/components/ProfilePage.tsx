import * as React from "react";
import injectSheet, { WithStyles} from "react-jss";
import { User } from "firebase";
import { bindActionCreators, compose, Dispatch } from "redux";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import Button from "../../forms/components/Button";
import PasswordForm from "../../forms/components/UpdatePasswordForm";
import ProfilePic from "./ProfilePic";
import { Theme } from "../../ThemeInjector";
import { ApplyFormData } from "../../types";
import { ReduxState } from "../../../reducers";
import { Link } from "react-router-dom";

interface Props extends WithStyles<typeof styles> {
  user: User;
  application: ApplyFormData
}

interface State {
  isPasswordFormVisible: boolean;
}

const styles = (theme: Theme) => ({
  ProfilePage: {
    width: "100%",
    maxWidth: theme.containerMaxWidth,
    height: "100vh",
    paddingTop: "3em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    borderRadius: "5px",
    color: theme.secondFont
  },
  name: {
    paddingBottom: "5%"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    ProfilePage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ProfilePage: {
      width: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    ProfilePage: {
      width: theme.containerMobileWidth
    }
  }
});

class ProfilePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPasswordFormVisible: false
    };
  }

  togglePasswordForm = () => {
    const { isPasswordFormVisible } = this.state;
    this.setState({ isPasswordFormVisible: !isPasswordFormVisible });
  };

  render() {
    let { user, classes, application } = this.props;
    let userInfo = {
      photoURL: user.photoURL || "/img/blank-profile.png",
      displayName: user.displayName || "Add your name to the application!"
    };

    if ("firstName" in application && "lastName" in application) {
      const { firstName, lastName } = application;
      userInfo.displayName = `${firstName} ${lastName}`;
    }

    return (
      <div className={classes.ProfilePage}>
        <h1 className={classes.name}>
          { userInfo.displayName}
        </h1>
        <ProfilePic photoURL={userInfo.photoURL} uid={user.uid}/>
        <Button onClick={this.togglePasswordForm}>CHANGE PASSWORD</Button>
        {this.state.isPasswordFormVisible && <PasswordForm />}
        <Link to="/status"><Button> ADMISSION STATUS </Button></Link>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  application: state.core.applyForm.formData
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ push }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePage);
