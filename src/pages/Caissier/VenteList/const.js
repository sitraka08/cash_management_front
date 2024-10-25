import * as yup from "yup";
const tabHeader = ["Id Matériel", "Id Client", "Date", "Action"];

export const FORM = [
  {
    name: "id",
    label: "Id Matériel",
    type: "text",
    placeholder: "Id",
    required: true,
  },
  {
    name: "id_client",
    label: "Id Client",
    type: "text",
    placeholder: "Id Client",
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
