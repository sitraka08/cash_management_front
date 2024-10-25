import * as yup from "yup";
const tabField = ["matricule", "id_formation", "date", "action"];

export const FORM = [
  {
    name: "matricule",
    label: "Matricule",
    type: "select",
    placeholder: "Matricule",
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
    name: "date",
    label: "Date",
    type: "date",
    placeholder: "Date",
    required: true,
  },
];

export const SCHEMA = yup.object().shape({});
