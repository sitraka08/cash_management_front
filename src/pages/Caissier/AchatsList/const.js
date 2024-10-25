import * as yup from "yup";

export const FORM = [
  {
    name: "montant",
    label: "Montant",
    type: "text",
    placeholder: "Montant",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Description",
    required: true,
  },
];

export const SCHEMA = yup.object().shape({});
