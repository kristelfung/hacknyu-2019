import * as React from "react";
import injectSheet, {WithStyles} from "react-jss";
import Underline from "./Underline";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  FAQ: {
    backgroundColor: theme.backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5%",
    fontSize: "1.1em"
  },
  questions: {
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "auto auto"
  },
  question: {
    maxWidth: "500px",
    padding: "20px",
    fontSize: "1.1em",
    lineHeight: "1.2em"
  },
  additionalQuestions: {
    fontSize: "1.1em"
  },
  link: {
    color: theme.fontColor,
    textDecoration: "underline"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    questions: {
      gridTemplateColumns: "50% 50%"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    questions: {
      display: "flex",
      flexDirection: "column"
    }
  }
});

type Props = WithStyles<typeof styles>;

const FAQ: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.FAQ}>
      <h1> Questions </h1>
      <Underline />
      <p className={classes.additionalQuestions}>
        {/*I considered adding a mailto link, but do people actually like those?
          they just open my system mail client for me, which sucks.
         */}
        For any additional questions, please email ask.hack@nyu.edu!
      </p>
      <div className={classes.questions}>
        <div className={classes.question}>
          <h2> Do I need prior experience?</h2>
          <p>
            Nope! HackNYU welcomes people of all skill levels. In fact, part of
            the fun of HackNYU is seeing beginners learn from hackathon
            veterans&mdash;and hopefully vice versa! We will also provide a a
            mentoring service to help guide new hackers.
          </p>
        </div>
        <div className={classes.question}>
          <h2> Where and when is it?</h2>
          <p>
            HackNYU takes place on NYU campuses in New York, Abu Dhabi, and
            Shanghai. The New York event is hosted at the 
            <a className={classes.link} href="https://goo.gl/maps/BnPFgbb9irv"> NYU Tandon School of
            Engineering, 6 MetroTech Center, Brooklyn, NY 11201</a>, which is easily
            accessible via NYC's public transportation. Students enrolled in NYU
            Shanghai and NYU Abu Dhabi can participate in the event on their
            respective campuses.
          </p>
          <p>
            Unfortunately, we cannot provide free parking, but there are several parking 
            garages in the surrounding area that are available for daily rates. 
            When possible, we recommend using public transportation.
          </p>
        </div>
        <div className={classes.question}>
          <h2> Who can attend?</h2>
          <p>
            For our event in New York, any student can attend! You don't have to
            be a part of the NYU community. However, priority will be given to
            members of the NYU community. In addition, students who have
            graduated within the last year may participate. If you are under 18,
            you will be required to bring a liability waiver signed by your
            parent or guardian during check-in. This form will be made available
            upon acceptance to our event. Attendees in Shanghai and Abu Dhabi
            must be enrolled at NYU.
          </p>
        </div>
        <div className={classes.question}>
          <h2> Will there be travel reimbursements? </h2>
          <p>
            Unfortunately, we are unable to provide travel reimbursements or
            send buses to nearby cities this year. We apologize for the
            inconvenience, and hope you can still make it!
          </p>
        </div>
        <div className={classes.question}>
          <h2> Will there be a place to shower? </h2>
          <p>
            Yep! We will have showers available during certain hours of the
            event. If you are planning to use them, make sure to bring your own
            towel and a change of clothes.
          </p>
        </div>
        <div className={classes.question}>
          <h2> How will projects be judged?</h2>
          <p>
            Each of the four tracks will have their own judges and prizes.
            Judges will select three winning teams from each track. You can only
            submit your project to one track, so choose wisely!
          </p>
        </div>
        <div className={classes.question}>
          <h2> What should I bring? </h2>
          <p>
            Because the hackathon is overnight, we encourage bringing sleeping
            gear (sleeping bags, pillows, blankets, etc) and toiletries. There
            will be a designated sleeping area for participants to nap. We
            recommend bringing warm clothes, as the venue can get cold. Also
            make sure to bring your laptop and charger, as well as any other
            gear you plan on using. Lastly, if you are under 18, please bring
            your liability form! The form will be sent out after acceptance.
          </p>
        </div>
        <div className={classes.question}>
          <h2> What about teams? </h2>
          <p>
            Teams are limited to 5 people. You do NOT have to come with a team
            to the hackathon. There will be a place where hackers can form teams
            and brainstorm ideas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(FAQ);
