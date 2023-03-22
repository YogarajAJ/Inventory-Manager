import React from "react";
import { FORM_TYPES } from "../../constants";
import DateComponent from "./DateComponent";
import SelectComponent from "./SelectComponent";
import TextFieldComponent from "./TextFieldComponent";

const Form = ({ formData = {} }) => {
  const generateFormElement = (formElement = null) => {
    if (!formElement) return <></>;
    switch (formElement.type) {
      case FORM_TYPES.text:
      case FORM_TYPES.number:
        return <TextFieldComponent {...formElement} />;
      case FORM_TYPES.select:
        return <SelectComponent {...formElement} />;
      case FORM_TYPES.date:
        return <DateComponent {...formElement} />;
      default:
        return <></>;
    }
  };

  const form = generateFormElement(formData);

  return form;
};

export default Form;
