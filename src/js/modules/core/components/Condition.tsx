import * as React from "react";
import { Field } from "react-final-form";
import { ReactNodeLike } from "prop-types";

interface Props {
  when: string;
  is?: string;
  isNot?: string;
  children: ReactNodeLike
}

const Condition: React.FunctionComponent<Props> = ({ when, is, isNot, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is || (isNot && value !== isNot) ? children : null)}
    </Field>
);

export default Condition;