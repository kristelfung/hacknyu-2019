import * as React from "react";

import Autocomplete from "react-autocomplete";

interface Props {
  schools: string[],
  classes: { [s: string]: string },
  input: object
}

const menuStyle = {
  borderRadius: "3px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "2px 0",
  fontSize: "90%",
  top: "50px", // height of your input
  left: 0,
  position: "absolute",
  overflow: "auto",
  width: "100%",
  zIndex: 1000
};

const wrapperStyle = {
  display: "inline-block",
  position: "relative"
};

const isUpper = str => str === str.toUpperCase();

// given an autocomplete item and a input value, should we display the autocomplete
// item?
const doesStringMatch = (item, value) => {
  if (value !== "") {
    // if input value is all uppercase, try to compare with the acronym of the autocomplete items
    if (isUpper(value)) {
      const importantWords = item
        .split(" ")
        .filter(word => isUpper(word[0]) && word !== "The");
      const capLetters = importantWords.map(word => word[0]);
      const chars = [...value];

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
const SchoolInput: React.SFC<Props> = props => {
  const { schools, input, classes } = props;

  return (
    <Autocomplete
      {...input}
      renderInput={props => <input {...props} className={classes.input} />}
      getItemValue={item => item}
      items={schools}
      shouldItemRender={doesStringMatch}
      renderItem={(item, isHighlighted) => (
        <div style={{ background: isHighlighted ? "lightgray" : "white" }} className={classes.autocompleteItem}>
          {item}
        </div>
      )}
      onChange={val => input.onChange(val)}
      onSelect={val => input.onChange(val)}
      menuStyle={menuStyle}
      wrapperStyle={wrapperStyle}
    />
  );
};

export default SchoolInput;
