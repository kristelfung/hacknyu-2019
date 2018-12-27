import * as React from "react";
import injectSheet, { Styles } from "react-jss";
import { JssRules, Theme } from "../../types";
import AnimatedSubwayLine from "./AnimatedSubwayLine";
import ApplyButton from "./ApplyButton";
import TrackInfo from "./TrackInfo";
import Waypoint from "react-waypoint";
import AboutSection from "./AboutSection";
import Section from "./Section";
// @ts-ignore
import { Scrollama, Step } from "react-scrollama";
import { trackColors } from "../../ThemeInjector";

interface HomePageStyles<T> extends Styles {
  HomePage: T;
  aboutSection: T;
  activitiesSection: T;
  tracksSection: T;
  lines: T;
  quote: T;
  info: T;
  timeline: T;
  quoteAuthor: T;
  hiddenTrip: T;
}

interface Props {
  classes: HomePageStyles<string>;
  viewportWidth: number;
}
interface State {
  activeBlocks: number;
}

interface StepData {
  element: HTMLElement;
  data: number;
  direction: string;
}

const styles = (theme: Theme): HomePageStyles<JssRules> => ({
  HomePage: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    alignItems: "center"
  },
  aboutSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  activitiesSection: {
    background: `linear-gradient(${theme.secondBackground}, ${
      theme.thirdBackground
    })`,
    color: theme.secondFont
  },
  tracksSection: {
    backgroundColor: theme.thirdBackground,
    color: theme.secondFont
  },
  lines: {
    display: "flex",
    minHeight: "300px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px 0 0 0",
    width: "100%"
  },
  quote: {
    fontSize: "3em",
    margin: "0 5% 0 5%",
    maxWidth: "400px"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    // Small hack for Chrome. Not sure why.
    backgroundColor: theme.thirdBackground
  },
  timeline: {
    width: "20vw"
  },
  quoteAuthor: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  hiddenTrip: {
    width: "100vw",
    height: "10px",
    position: "relative",
    fontSize: "10px",
    color: theme.secondBackground,
    top: "10vh"
  }
});

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeBlocks: -1
    };
  }

  handleStepEnter = ({ element, data, direction }: StepData) => {
    if (direction === "down") {
      this.setState({ activeBlocks: data });
    }
  };

  handleStepExit = ({ element, data, direction }: StepData) => {
    if (direction === "up") {
      this.setState({ activeBlocks: data - 1 });
    }
  };

  handleTopEnter = ({
    previousPosition,
    currentPosition
  }: {
    previousPosition: string;
    currentPosition: string;
  }) => {
    if (currentPosition === "inside" && previousPosition === "above") {
      this.setState({ activeBlocks: -1 });
    }
  };

  render() {
    let { classes } = this.props;
    const { activeBlocks } = this.state;
    return (
      <div className={classes.HomePage}>
        <ApplyButton />
        <div className={classes.lines}>
          <AnimatedSubwayLine color={trackColors.green} />
          <AnimatedSubwayLine color={trackColors.red} />
          <AnimatedSubwayLine color={trackColors.blue} />
          <AnimatedSubwayLine color={trackColors.orange} />
        </div>
        <div className={classes.hiddenTrip}>
          <Waypoint onEnter={this.handleTopEnter} />
        </div>
        <div className={classes.info}>
          <Scrollama
            onStepEnter={this.handleStepEnter}
            onStepExit={this.handleStepExit}
          >
            <Step data={0} key={0}>
              <div className={classes.aboutSection}>
                <Section
                  activeBlocks={activeBlocks}
                  infoBlock={{
                    id: 0,
                    date: "January 1st",
                    text: "Sign Up",
                    color: trackColors.red
                  }}
                >
                  <AboutSection />
                </Section>
              </div>
            </Step>
            <Step data={1} key={1}>
              <div className={classes.activitiesSection}>
                <Section
                  activeBlocks={activeBlocks}
                  infoBlock={{
                    id: 1,
                    date: "January 14th",
                    text: "Get admissions result",
                    color: trackColors.orange
                  }}
                >
                  <div className={classes.quote}>
                    <p>Inspirational quote here!</p>
                    <span className={classes.quoteAuthor}>
                      --- Albert Einstein
                    </span>
                  </div>
                </Section>
              </div>
            </Step>
            <Step data={2}>
              <div className={classes.tracksSection}>
                <Section
                  activeBlocks={activeBlocks}
                  infoBlock={{
                    id: 2,
                    date: "February 15th",
                    text: "Go to hackathon!",
                    color: trackColors.green
                  }}
                >
                  <TrackInfo />
                </Section>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
