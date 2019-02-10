import * as React from "react";
import { ThemeProvider } from "theming";
import { ReactNodeLike } from "prop-types";

interface Props {
  children: ReactNodeLike;
}

export const trackColors = {
  red: "#d14d4d",
  orange: "#f7c15d",
  green: "#619b5b",
  blue: "#63a0c6"
};

export interface Theme {
  backgroundColor: string;
  secondBackground: string;
  secondBackgroundHighlight: string;
  thirdBackground: string;
  fontColor: string;
  secondFont: string;
  secondFontHover: string;
  highlightColor: string;
  highlightColorHover: string;
  formBackground: string;
  submitButton: string;
  submitButtonHover: string;
  submitButtonDeactivated: string;
  errorBorder: string;
  errorText: string;
  errorBackground: string;
  notificationBackground: string;
  notificationBorder: string;
  overlayColor: string;
  fontFamily: string;
  inputPadding: string;
  red: string;
  green: string;
  blue: string;
  orange: string;
  containerMaxWidth: string;
  containerMobileWidth: string;
  containerSmallWidth: string;
  containerMediumWidth: string;
  containerLargeWidth: string;
  largeBreakpoint: string;
  mediumBreakpoint: string;
  smallBreakpoint: string;
  mobileBreakpoint: string;
  bodyLineHeight: string;
  bodyFontSize: string;
  titleFontSize: string;
  formElementMaxWidth: string;
}

const theme: Theme = {
  backgroundColor: "#57068c",
  secondBackground: "#f5f5f5",
  secondBackgroundHighlight: "#fcfcfc",
  thirdBackground: "#57068c",
  fontColor: "#fefefe",
  secondFont: "#202020",
  secondFontHover: "#f0f0f0", 
  highlightColor: "#fefefe",
  highlightColorHover: "#eeeeee",
  formBackground: "#fafafa",
  submitButton: "#9c68b1",
  submitButtonHover: "#b773cd",
  submitButtonDeactivated: "#D2AFDB",
  fontFamily: "mr-eaves-xl-modern, sans-serif",
  inputPadding: "7px 10px",
  errorText: "#444444",
  errorBackground: "#ffc0c0",
  errorBorder: "red",
  notificationBackground: "#fefefe",
  notificationBorder: "#000000",
  containerMobileWidth: "18em",
  containerSmallWidth: "21em",
  containerMediumWidth: "40em",
  containerLargeWidth: "45em",
  containerMaxWidth: "62.5rem",
  overlayColor: "#696969",
  largeBreakpoint: "1100px",
  mediumBreakpoint: "800px",
  smallBreakpoint: "600px",
  mobileBreakpoint: "500px",
  bodyFontSize: "1.3rem",
  titleFontSize: "2em",
  bodyLineHeight: "1.2",
  formElementMaxWidth: "500px",
  ...trackColors
};

class ThemeInjector extends React.Component<Props> {
  render() {
    let { children } = this.props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
}

export default ThemeInjector;
