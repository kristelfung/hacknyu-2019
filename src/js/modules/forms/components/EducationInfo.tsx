import * as React from "react";
import { Field } from "react-final-form";
import SchoolInput from "./SchoolInput";
import { schools } from "../../core/schools";
import Condition from "./Condition";
import Select from "./Select";
import Input from "./Input";

const EducationInfo = () => {
  return (
    <div>
      <Field
        name="school"
        render={props => (
          <SchoolInput schools={schools} {...props} label="School:" />
        )}
      />

      <Condition when="school" is="New York University">
        <Field
          label="NYU School:"
          name="nyuSchool"
          render={props => <Select {...props} />}
        >
          <option value="">Select an option</option>
          <option value="tandon">Tandon School of Engineering</option>
          <option value="cas">College of Arts and Science</option>
          <option value="gsas">Graduate School of Arts and Science</option>
          <option value="stern">Leonard N. Stern School of Business</option>
          <option value="nursing">Rory Meyers College of Nursing</option>
          <option value="steinhardt">
            Steinhardt School of Culture, Education, and Human Development
          </option>
          <option value="tisch">Tisch School of the Arts</option>
          <option value="dentistry">College of Dentistry</option>
          <option value="sps">School of Professional Studies</option>
          <option value="silver">Silver School of Social Work</option>
          <option value="ls"> Liberal Studies </option>
          <option value="gallatin">
            Gallatin School of Individualized Study
          </option>
          <option value="global-health">College of Global Public Health</option>
          <option value="abu-dhabi"> Abu Dhabi </option>
          <option value="shanghai"> Shanghai </option>
          <option value="other">Other (please specify):</option>
        </Field>
      </Condition>
      <Condition when="nyuSchool" is="other">
        <label>
          <Field name="nyuSchoolOther" component="input" />
        </label>
      </Condition>
      <Field
        label="Current year of study:"
        name="yearOfStudy"
        render={props => <Select {...props} />}
      >
        <option value=""> Select an option </option>
        <option value="high-school">High School </option>
        <option value="freshman">First-year (Freshman)</option>
        <option value="sophomore"> Sophomore </option>
        <option value="junior"> Junior </option>
        <option value="senior"> Senior </option>
        <option value="graduate">
          Graduate Student (Masters or Doctorate)
        </option>
        <option value="post-grad">
          {" "}
          Post Graduate (must be within 12 months of graduation to be eligible)
        </option>
      </Field>
      <Field
        label="Major:"
        name="major"
        render={props => <Input {...props} />}
      />

      <Field
        label="Anticipated graduation year:"
        name="gradYear"
        render={props => <Select {...props} />}
      >
        <option value=""> Select an option </option>
        <option value="2019"> 2019 </option>
        <option value="2020"> 2020 </option>
        <option value="2021"> 2021 </option>
        <option value="2022"> 2022 </option>
        <option value="2023"> 2023 </option>

        <option value="2024-plus"> 2024 or later </option>
      </Field>
    </div>
  );
};

export default EducationInfo;