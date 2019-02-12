import * as React from "react"
import Input from "./Input";
import CheckboxesContainer from "./CheckboxesContainer";
import { Field } from "react-final-form";
import InputLabel from "./InputLabel";


const EmergencyContactInfo: React.FunctionComponent = () => {
  return (
    <CheckboxesContainer>
      <InputLabel>
        Emergency contact information
      </InputLabel>

      <Field
        label="Emergency contact number"
        name="emergencyContactNumber"
        type="tel"
        render={props => <Input {...props} />}
        placeholder="1-800-867-5309"
      />

      <Field
        label="Emergency contact full name"
        name="emergencyContactName"
        render={props => <Input {...props} />}
        placeholder="Andrew Davis"
      />

      <Field
        label="Relation to emergency contact"
        name="emergencyContactRelation"
        render={props => <Input {...props} />}
        placeholder="mother, father, friend, etc..."
      />
    </CheckboxesContainer>
  );
};

export default EmergencyContactInfo;