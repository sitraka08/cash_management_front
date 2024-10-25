import * as yup from "yup";

export const LOGIN_FORM = [
  {
    label: "Email",
    type: "text",
    name: "email",
    placeholder: "Nom d'utilisateur",
    required: true,
  },
  {
    label: "Mot de passe",
    type: "password",
    name: "password",
    placeholder: "Mot de passe",
    required: true,
  },
];

export const YUP_SCHEMA_LOGIN_FORM = yup.object({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().required("Mot de passe requis"),
});
