import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

const render = () => {
  const body = ReactDOMServer.renderToString(
    <div
      style={{
        fontFamily: "mr-eaves-xl-modern, Helvetica, sans-serif",
        maxWidth: "800px"
      }}
    >
      <style>@import url("https://use.typekit.net/hjh3sxe.css");</style>
      <table>
        <tbody>
          <tr>
            <div
              style={{
                padding: "10px",
                display: "flex",
                position: "relative",
                fontSize: "1.2em",
                height: "100px",
                // In case background image doesn't render
                backgroundColor: "#57068c",
                color: "white",
                backgroundSize: "contain",
                backgroundImage:
                  "url('https://hacknyu.org/img/pattern-email.png')"
              }}
            >
              <div>
                <h1
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    paddingLeft: "15px"
                  }}
                >
                  Confirmation Closing Soon!
                </h1>
              </div>
            </div>
          </tr>
          <tr>
            <div style={{ padding: "40px", fontSize: "1.1em" }}>
              <p>
                Wow! We're stunned by the sheer volume of applications that
                we've received. Over 2000 people applied, setting a new record
                for HackNYU.
              </p>
              <p>
                If you haven't already, please confirm your spot at HackNYU! We
                will be closing the form in 24 hours, and you will be unable to
                confirm that you are coming after that time. If you can no
                longer make the event, please update your status on the
                confirmation form.
              </p>
              <p>
                By informing us that you cannot attend HackNYU, you help us out
                so we can make room for more people who want to come. We are
                reaching our capacity for the event, and we want to make sure
                everyone who wants to come has a chance!
              </p>
              <p>
                HackNYU 2019 is from February 15th to the 17th. It takes place
                simultaneously in New York, Shanghai and Abu Dhabi over 48
                hours. It is completely free, thanks to our wonderful sponsors
                and volunteers.
              </p>
              <p>We hope to see you there!</p>
            </div>
          </tr>
          <tr>
            <th>
              <div style={{ paddingLeft: "40px" }}>
                <img
                  style={{ maxWidth: "100px" }}
                  alt="HackNYU Logo!"
                  src="https://hacknyu.org/img/logo.png"
                />
                <p> Your friends at HackNYU </p>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <p style={{ padding: "40px", paddingTop: "100px" }}>
        Copyright © HackNYU 2019
      </p>
    </div>
  );
  return body;
};

export default render;
