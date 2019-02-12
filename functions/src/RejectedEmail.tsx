import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

const renderRejectedEmail = (name: string) => {
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
                minHeight: "100px",
                backgroundColor: "#57068c",
                color: "white",
                backgroundSize: "contain",
                textAlign: "center",
                backgroundImage:
                  "url('https://hacknyu.org/img/pattern-email.png')"
              }}
            >
              <h1 style={{ paddingLeft: "10%" }}>
                Thank You for Your Application
              </h1>
            </div>
          </tr>
          <tr>
            <div style={{ padding: "40px", fontSize: "1.1em" }}>
              <p>{name ? ` Dear ${name}` : "Hello"},</p>
              <p>Thank you for submitting your application to HackNYU.</p>
              <p>
                We regret to inform you that, due to limited capacity, we are not
                able to take any more participants for HackNYU 2019.
              </p>
              <p>
                This year, we received over 2000 applications (our most ever) 
                making us the largest university hackathon in New York!
              </p>
              <p>
                You can check up on HackNYU 2019 from our twitter feed{" "}
                <a href="https://twitter.com/hacknyu">here</a>.
              </p>
              <p>We hope to see you next year!</p>
              <p>All the best,</p>
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

export default renderRejectedEmail;
