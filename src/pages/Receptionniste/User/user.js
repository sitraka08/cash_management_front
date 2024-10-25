import * as yup from "yup";

export const USER_FORM = [
  {
    name: "nom",
    label: "Nom",
    type: "text",
    placeholder: "Nom",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  // {
  //   name: "password",
  //   label: "Mot de passe",
  //   type: "password",
  //   placeholder: "Mot de passe",
  //   required: true,
  // },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Role",
    required: true,
    options: [
      {
        value: "admin",
      },
      {
        value: "Caissier",
      },
      {
        value: "Récéptionniste",
      },
    ],
    optionValue: "value",
    optionLabel: "value",
  },
];

export const USER_SCHEMA = yup.object().shape({});
