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
  faPrescription,
  faRunning,
  faSolarPanel,
  faTree,
  faGlobeAmericas,
  faBullhorn,
  faGraduationCap,
  faLaptop,
  faChalkboardTeacher,
  faCode,
  faUniversalAccess,
  faHandPointer,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";

interface TrackInfoStyles<T> extends Styles {
  TrackInfo: T;
  tracks: T;
  description: T;
  bullet: T;
  header: T;
  icon: T;
  "@media (max-width: 800px)": T;
}

interface Props {
  classes: TrackInfoStyles<string>;
}

const styles = (theme: Theme): TrackInfoStyles<JssRules> => ({
  TrackInfo: {
    backgroundColor: theme.secondBackground,
    margin: "0 8% 5% 11%"
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
  "@media (max-width: 800px)": {
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
      <div className={classes.tracks}>
        <Track
          id={0}
          key={0}
          name="Heathcare"
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
            Find new and innovative healthcare solutions.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faHeartbeat} />
            </div>
            Disrupt the way we distribute and pratice medicine.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faPrescription} />
            </div>
            Ensure millions get the healthcare and service they deserve.
          </div>
          <div className={classes.bullet}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faRunning} />
            </div>
            Educate people on staying active and healthy.
          </div>
        </Track>
        <Track
          id={1}
          key={1}
          name="Sustainability & Social Impact"
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
            Raise awareness about important social issues.
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
          name={"Accessibility & Assistive Technology"}
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
                <FontAwesomeIcon icon={faComment} />
              </div>
              Collaborate with different fields to help people in their day to
              day lives.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faHandPointer} />
              </div>
              Design intuitive and innovative ways to interact with technology.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faAccessibleIcon} />
              </div>
              Combine medicine, occupational therapy and engineering to build
              new products.
            </div>
            <div className={classes.bullet}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={faUniversalAccess} />
              </div>
              Change people's lives and tackle a diverse set of challenges.
            </div>
          </div>
        </Track>
      </div>
    </div>
  );
};

export default injectSheet(styles)(TrackInfo);
