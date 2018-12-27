import * as React from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { Styles } from "jss";
import { User } from "firebase";
import { bindActionCreators, compose } from "redux";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Theme } from "../../types";
import Button from "./Button";
import PasswordForm from "./UpdatePasswordForm";
import { Link } from "react-router-dom";

interface ProfilePageStyles extends Styles {
  ProfilePage: object;
  profilePic: object;
  roundImg: object;
  name: object;
}

interface Props {
  classes: { [s: string]: string };
  user: User;
}

interface State {
  isPasswordFormVisible: boolean;
}

const styles = (theme: Theme): ProfilePageStyles => ({
  ProfilePage: {
    width: "80vw",
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground
  },
  name: {
    paddingBottom: "5%"
  },
  profilePic: {
    display: "flex",
    maxWidth: "200px",
    paddingBottom: "5%"
  },
  roundImg: {
    borderRadius: "50%"
  }
});

class ProfilePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordFormVisible: false
    };
  }
  shouldComponentUpdate(nextProps: Props, nextState: object): boolean {
    if (!nextProps.user) {
      nextProps.push("/login");
    }
    return true;
  }

  togglePasswordForm = () => {
    const { isPasswordFormVisible } = this.state;
    this.setState({ isPasswordFormVisible: !isPasswordFormVisible });
  };
  render() {
    let { user, classes } = this.props;
    // Just in case this page renders even after a user signs out
    if (!user) {
      return (
        <div className={classes.ProfilePage}>
          Please <Link to="/login"> log in </Link> to see your profile page
        </div>
      );
    }
    return (
      <div className={classes.ProfilePage}>
        <h1 className={classes.name}> {user.displayName} </h1>
        <div className={classes.profilePic}>
          <img src={user.photoURL} className={classes.roundImg} />
        </div>

        <Button onClick={this.togglePasswordForm}>Change Password</Button>
        {this.state.isPasswordFormVisible && <PasswordForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.core.user
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePage);
