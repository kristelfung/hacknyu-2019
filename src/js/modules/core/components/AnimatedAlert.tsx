import * as React from "react";
import { delay } from "../../utils";
import Notification from "./Alert";
import { ALERT_TIME_INTERVALS } from "../../constants";

export enum States {
  Mounting,
  Mounted,
  Unmounting
}


interface Props {
  message: string;
  isError: boolean;
  type: string;
  clear: (type: string) => any
}

interface State {
  componentState: States;
}

class AnimatedAlert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      componentState: States.Mounting
    };
  }

  componentDidMount() {
    const { clear, type } = this.props;
    const {
      ANIMATION_BUFFER,
      DISPLAY_TIME,
      ANIMATION_TIME
    } = ALERT_TIME_INTERVALS;
    delay(ANIMATION_BUFFER)
      .then(() => this.setState({ componentState: States.Mounted }))
      .then(() => delay(DISPLAY_TIME))
      .then(() => this.setState({ componentState: States.Unmounting }))
      .then(() => delay(ANIMATION_TIME))
      .then(() => clear(type));
  }

  render() {
    // Ugh, hate having to create a state wrapper for this.
    // Damn react-jss
    const { message, isError } = this.props;
    return (
      <Notification
        message={message}
        isError={isError}
        componentState={this.state.componentState}
      />
    );
  }
}

export default AnimatedAlert;
