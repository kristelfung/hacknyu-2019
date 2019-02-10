import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";
import Sponsor from "./Sponsor";
import { ASSET_DIR, SPONSORS_INFO, NYU_SPONSOR } from "../../constants";
import Underline from "./Underline";

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  SponsorshipSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.secondBackground,
    fontSize: "1.4rem",
    textAlign: "center",
    padding: "5%"
  },
  header: {
    maxWidth: "750px"
  },
  acknowledgementSection: {
    lineHeight: "1.2em",
    display: "inline-block"
  },
  departmentList: {
    listStyleType: "none",
    paddingLeft: "0px"
  },
  nyuLogoSection: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    placeContent: "center",
    margin: "20px"
  },
  nyuLogo: {
    height: "20vh",
    width: "50vw"
  },
  link: {
    textDecoration: "underline",
    color: "rgb(247, 193, 93)",
    "&:hover": {
      color: theme.backgroundColor
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    sponsorRow: {
      flexWrap: "wrap"
    } 
  }
});

const SponsorshipSection: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.SponsorshipSection}>
      <header className={classes.header}>
        <h2>SPONSORS</h2>
        <Underline />
        <p>
          HackNYU is made possible thanks to the support of our gracious
          sponsors! We are proud to have sponsors represented from a wide
          variety of industries, sizes, and specializations.
        </p>
        <p>
          Interested in sponsoring HackNYU 2019? Contact us at{" "}
          <a className={classes.link} href="mailto:sponsorship.hack@nyu.edu">
            {" "}
            sponsorship.hack@nyu.edu{" "}
          </a>
          , and please find our sponsorship opportunities{" "}
          <a className={classes.link} href="pdf/hacknyu-sponsor-deck-2019.pdf">
            {" "}
            here!{" "}
          </a>
        </p>
      </header>
      <div>
        {SPONSORS_INFO.map(sponsor => (
          <Sponsor
            isSquareLogo={sponsor.square}
            key={sponsor.name}
            name={sponsor.name}
            link={sponsor.url}
            source={ASSET_DIR + sponsor.src}
          />
        ))}
      </div>
      <div className={classes.nyuLogoSection}>
        <Sponsor
          className={classes.nyuLogo}
          isSquareLogo={NYU_SPONSOR.square}
          key={NYU_SPONSOR.name}
          name={NYU_SPONSOR.name}
          link={NYU_SPONSOR.url}
          source={ASSET_DIR + NYU_SPONSOR.src}
        />
      </div>
      <div className={classes.acknowledgementSection}>
        <h2 className={classes.header}>Special thanks to:</h2>
        <ul className={classes.departmentList}>
          <li>NYU Tandon Undergraduate Student Council</li>
          <li>NYU Tandon Computer Science & Engineering Department</li>
          <li>NYU Information Technology</li>
          <li>NYU Violet 100</li>
        </ul>
      </div>
    </div>
  );
};

export default injectSheet(styles)(SponsorshipSection);
