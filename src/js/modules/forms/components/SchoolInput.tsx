import * as React from "react";
import * as Autocomplete from "react-autocomplete";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";
import { ChangeEvent, CSSProperties } from "react";
import { FieldRenderProps } from "react-final-form"

interface Props extends WithStyles<typeof styles> {
  schools: string[];
  label: string;
}

const styles = (theme: Theme) => ({
  label: {
    padding: "5px",
    width: "150px"
  },
  error: {
    color: "red",
    fontSize: "1rem",
    maxWidth: "200px"
  },
  textField: {
    marginLeft: "5px",
    fontFamily: theme.fontFamily,
    padding: "10px",
    fontSize: "1.5rem",
    border: "none",
    height: "40px"
  },
  Input: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.3rem",
    padding: "15px"
  },
  inputArea: {
    display: "flex"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    inputArea: {
      flexDirection: "column"
    }
  }
});

const menuStyle = {
  borderRadius: "3px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "2px 0",
  fontSize: "90%",
  top: "50px", // height of your input
  left: 0,
  position: "absolute" as "absolute",
  overflow: "auto",
  maxHeight: "50vh",
  width: "100%",
  zIndex: 1000
};

const wrapperStyle: CSSProperties = {
  display: "inline-block",
  position: "relative" as "relative"
};

const isUpper = (str: string): boolean => str === str.toUpperCase();

// given an autocomplete item and a input value, should we display the autocomplete
// item?
const doesStringMatch = (item: string, value: string): boolean => {
  if (value !== "") {
    // if input value is all uppercase, try to compare with the acronym of the autocomplete items
    if (isUpper(value)) {
      const importantWords = item
        .split(" ")
        .filter(word => isUpper(word[0]) && word !== "The");
      const capLetters = importantWords.map(word => word[0]);
      const chars: string = value.slice(0);

      for (let i = 0; i < chars.length; i++) {
        if (capLetters[i] !== chars[i]) {
          return false;
        }
      }

      return true;
    }
    // otherwise, check if is a substring
    else {
      return item.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
  } else {
    return false;
  }
};

// School input with autocomplete form of schools
const SchoolInput: React.FunctionComponent<Props & FieldRenderProps> = ({
  meta,
  schools,
  input,
  classes,
  label
}) => {
  return (
    <div className={classes.Input}>
      <div className={classes.inputArea}>
        <div className={classes.label}>{label} </div>
        <Autocomplete
          {...input}
          renderInput={props => (
            <input {...props} className={classes.textField} />
          )}
          getItemValue={item => item}
          items={schools}
          shouldItemRender={doesStringMatch}
          renderItem={(item, isHighlighted) => (
            <div
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item}
            </div>
          )}
          onChange={(e: ChangeEvent<HTMLInputElement>, val: string) =>
            input.onChange(val)
          }
          onSelect={(val: string) => input.onChange(val)}
          menuStyle={menuStyle}
          wrapperStyle={wrapperStyle}
        />
      </div>
      {meta.error && meta.touched && (
        <span className={classes.error}>{meta.error}</span>
      )}
    </div>
  );
};

export default injectSheet(styles)(SchoolInput);
