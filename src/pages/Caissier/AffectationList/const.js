import * as yup from "yup";

export const FORM = [
  {
    name: "id_prof",
    label: "Prof",
    type: "select",
    placeholder: "Prof",
    required: true,
  },
  {
    name: "id_formation",
    label: "Formation",
    type: "select",
    placeholder: "Formation",
    required: true,
  },
  {
    name: "salaires",
    label: "Salaires",
    type: "text",
    placeholder: "Salaires",
    required: true,
  },
  {
    name: "date_affectation",
    label: "Date d'affectation",
    type: "date",
    placeholder: "Date d'affectation",
    required: true,
  },
];

export const SCHEMA = yup.object().shape({});
