import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

const render = (name: string) => {
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
                fontSize: "1.3em",
                height: "100px",
                // In case background image doesn't render
                backgroundColor: "#57068c",
                color: "white",
                backgroundSize: "contain",
                backgroundImage:
                  "url('https://hacknyu.org/img/pattern-email.png')"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <h1 style={{ paddingLeft: "15px" }}> You're In! 🎉🎉🎉 </h1>
              </div>
            </div>
          </tr>
          <tr>
            <div style={{ padding: "40px", fontSize: "1.1em" }}>
              <p>
                Congrats{name ? ` ${name}` : ""}! You've been accepted to
                HackNYU 2019. Please{" "}
                <a href="https://hacknyu.org/status">
                  confirm your acceptance
                </a>{" "}
                by January 30th.
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
