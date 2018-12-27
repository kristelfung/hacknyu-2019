import * as React from "react";
import { delay, getRandomInteger } from "../../utils";
import { STOPS_COUNT } from "../../constants";
import SubwayLine from "./SubwayLine";

interface State {
  lineStep: number;
  currentStop: number;
  stopOffsets: number[];
  lineOffset: number;
}

interface Props {
  color: string;
}

class AnimatedSubwayLine extends React.Component<Props, State> {
  isMounted: boolean;

  constructor(props: Props) {
    super(props);
    let stopOffsets = [];
    for (let i = 0; i < STOPS_COUNT; i++) {
      stopOffsets.push(getRandomInteger(5) + 3);
    }
    this.isMounted = true;
    this.state = {
      lineStep: 0,
      currentStop: 0,
      lineOffset: getRandomInteger(5) + 3,
      stopOffsets
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  async animate() {
    while (this.isMounted) {
      while (this.state.lineStep < STOPS_COUNT) {
        await delay(500 + getRandomInteger(1000));
        this.setState({ lineStep: this.state.lineStep + 1 });
        await delay(750);
        this.setState({ currentStop: this.state.currentStop + 1 });
      }
      await delay(1000);
      while (this.state.lineStep > 0) {
        await delay(750);
        this.setState({ currentStop: this.state.currentStop - 1 });
        await delay(500 + getRandomInteger(1000));
        this.setState({ lineStep: this.state.lineStep - 1 });
      }
    }
  }

  render() {
    const { color } = this.props;
    const { lineStep, stopOffsets, lineOffset, currentStop } = this.state;
    return (
      <SubwayLine
        lineOffset={lineOffset}
        color={color}
        stopOffsets={stopOffsets}
        lineStep={lineStep}
        currentStop={currentStop}
      />
    );
  }
}

export default AnimatedSubwayLine;
