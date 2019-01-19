import * as React from "react";
import SubwayIcon from "./SubwayIcon";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules, Theme } from "../../types";
import Track from "./Track";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedkit,
  faHeartbeat,
  faRunning,
  faSolarPanel,
  faTree,
  faGlobeAmericas,
  faBullhorn,
  faGraduationCap,
  faLaptop,
  faChalkboardTeacher,
  faCode,
  faDollarSign,
  faPiggyBank,
  faHeart,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEthereum
} from "@fortawesome/free-brands-svg-icons";

interface TrackInfoStyles<T> extends Styles {
  TrackInfo: T;
  header: T;
  tracks: T;
  description: T;
  bullet: T;
  icon: T;
  [s: string]: T;
}

interface Props {
  classes: TrackInfoStyles<string>;
}

const styles = (theme: Theme): TrackInfoStyles<JssRules> => ({
  TrackInfo: {
    width: "80vw",
    marginBottom: "5%",
    backgroundColor: theme.secondBackground,
  },
  header: {
    fontSize: "2em"
  },
  tracks: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",
    minHeight: "750px"
  },
  description: {
    maxWidth: "800px"
  },
  info: {
    fontSize: "1.4rem",
    lineHeight: "1.4rem",
    maxWidth: "750px",
    paddingLeft: "20px"
  },
  bullet: {
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: "10px"
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50px",
    paddingRight: "20px"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    tracks: {
      display: "flex",
      flexDirection: "column"
    },
    header: {
      paddingLeft: "20px"
    }
  }
});

const TrackInfo: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.TrackInfo}>
      <h1 className={classes.header}> TRACKS </h1>
      <p className={classes.info}>
        Every year, HackNYU provides several tracks centered around social good.
        Each team submits their project to exactly one track. We are proud to
        present our four tracks for 2019: Health &amp; Well Being,
        Sustainability, Education, and Financial Development. Note that these
        descriptions are only to help you brainstorm! You can create whatever
        you want, as long as it falls into one of these tracks. Ask an organizer
        if you aren't sure!
      </p>
      <div className={classes.tracks}>
        <Track
          id={0}
          key={0}
          name="Health & Well-Being"
          icons={[
            <SubwayIcon key={1} color="red" radius={15}>
              1
            </SubwayIcon>,
            <SubwayIcon key={2} color="red" radius={15}>
              2
            </SubwayIcon>,
            <SubwayIcon key={3} color="red" radius={15}>
              3
            </SubwayIcon>
          ]}
        >
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faMedkit} />
            </div>
            Find new and innovative solutions to personal health.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faHeartbeat} />
            </div>
            Disrupt the way we practice self care.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            Ensure millions get the nutrition and care they deserve.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faRunning} />
            </div>
            Educate people on staying active and healthy, both physically and
            mentally.
          </div>
        </Track>

        <Track
          id={1}
          key={1}
          name="Sustainability"
          icons={[
            <SubwayIcon key={1} color="#6dc066" radius={15}>
              4
            </SubwayIcon>,
            <SubwayIcon key={2} color="#6dc066" radius={15}>
              5
            </SubwayIcon>,
            <SubwayIcon key={3} color="#6dc066" radius={15}>
              6
            </SubwayIcon>
          ]}
        >
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faTree} />
            </div>
            Teach people how to be environmentally conscious.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faSolarPanel} />
            </div>
            Invent new ways to create and distribute clean energy.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faGlobeAmericas} />
            </div>
            Have your hack change the world for the better.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faBullhorn} />
            </div>
            Raise awareness about important environmental issues.
          </div>
        </Track>

        <Track
          id={2}
          key={2}
          name="Education"
          icons={[
            <SubwayIcon key={1} color="#007fcc" radius={15}>
              A
            </SubwayIcon>,
            <SubwayIcon key={2} color="#007fcc" radius={15}>
              C
            </SubwayIcon>,
            <SubwayIcon key={3} color="#007fcc" radius={15}>
              E
            </SubwayIcon>
          ]}
        >
          <div className={classes.description}>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              Help educate the next generation of students.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faLaptop} />
              </div>
              Hack student engagement with technology.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
              </div>
              Work with teachers and educators to bring the classroom into the
              21st century.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faCode} />
              </div>
              Spread tech knowledge to underrepresented minorities.
            </div>
          </div>
        </Track>

        <Track
          id={3}
          key={3}
          name="Financial Empowerment"
          icons={[
            <SubwayIcon key={1} color="orange" radius={15}>
              B
            </SubwayIcon>,
            <SubwayIcon key={2} color="orange" radius={15}>
              D
            </SubwayIcon>,
            <SubwayIcon key={3} color="orange" radius={15}>
              F
            </SubwayIcon>,
            <SubwayIcon key={4} color="orange" radius={15}>
              M
            </SubwayIcon>
          ]}
        >
          <div className={classes.description}>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              Educate people on being financially responsible.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faPiggyBank} />
              </div>
              Invent innovative ways to save money.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faEthereum} />
              </div>
              Combine finance and engineering to build new products.
            </div>

            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              Change people's perception of finance with technology.
            </div>
          </div>
        </Track>
      </div>
    </div>
  );
};

export default injectSheet(styles)(TrackInfo);
