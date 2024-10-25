import * as yup from "yup";

export const CLIENT_FORM = [
  {
    name: "nom",
    label: "Nom",
    type: "text",
    placeholder: "Nom",
    required: true,
  },
  {
    name: "prenom",
    label: "Prénom(s)",
    type: "text",
    placeholder: "Prénom(s)",
    required: true,
  },

  {
    name: "adresse",
    label: "Adresse",
    type: "text",
    placeholder: "Adresse",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
];

export const CLIENT_SCHEMA = yup.object().shape({});
export const CLIENT_SEARCH_SCHEMA = yup.object().shape({
  search: yup.string().notRequired(),
});
