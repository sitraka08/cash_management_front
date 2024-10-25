import { CATEGORIE } from "./bareme";
import * as yup from "yup";
import { DISTRICT } from "./localisation";

const isNumber = (value) => {
  return !isNaN(value) && value !== "";
};

export const AGENT_FORM = [
  {
    label: "Nom et prenom(s)",
    name: "nom_agent",
    required: true,
  },
  {
    label: "Matricule",
    name: "matricule",
    required: true,
  },

  {
    label: "Localité de service",
    name: "localite",
    type: "textarea",
    required: true,
  },
  {
    label: "Code corps actuel",
    name: "code_corps",
    required: true,
    type: "select",
  },

  {
    label: "Grade",
    name: "code_grade",
    required: true,
    type: "select",
  },

  {
    label: "District",
    name: "district",
    required: true,
    type: "select",
    options: DISTRICT,
    optionLabel: "libelle_district",
    optionValue: "id",
  },

  {
    label: "Ministère",
    name: "ministere",
    required: true,
    type: "select",
    optionLabel: "libelle_ministere",
    optionValue: "id",
  },
];

export const YUP_SCHEMA_AGENT_FORM = yup.object({
  nom_agent: yup.string().required("Nom et prénom(s) est obligatoire"),
  matricule: yup.string().required("Matricule est obligatoire"),
  localite: yup.string().required("Localité de service est obligatoire"),
  code_corps: yup.object().required("Code corps est obligatoire"),
  code_grade: yup.object().required("Grade est obligatoire"),
  district: yup.object().required("District est obligatoire"),
  ministere: yup.object().required("Ministère est obligatoire"),
});

// ----------------------------------------------------------------------------------------------------------------------------

export const BGT1_FORM = [
  {
    label: "Date de prise de service",
    name: "BG.date_debut_service",
    type: "date",
    required: true,
  },
  {
    label: "Corps",
    name: "BG.code_corps_agent_1",
    required: true,
    type: "select",
  },
  {
    label: "Grade",
    name: "BG.code_grade_agent_1",
    required: true,
    select: true,
    type: "select",
  },
  {
    label: "Indice/Categorie",
    name: "BG.indice_agent_id1",
    disabled: true,
    required: true,
  },
  {
    label: "Date bareme",
    name: "BG.date_bareme_1",
    required: true,
    type: "select",
  },
  {
    label: "Traitement annuel (T1)",
    name: "BG.traitement1",
  },
];

export const BGT2_FORM = [
  {
    label: "Date à la veille de l’intégration",
    name: "BG.date_fin_service",
    required: true,
    type: "date",
  },
  {
    label: "Corps",
    name: "BG.code_corps_agent_2",
    required: true,
    type: "select",
  },
  {
    label: "Grade",
    name: "BG.code_grade_agent_2",
    required: true,
    select: true,
    type: "select",
  },
  {
    label: "Indice/Categorie",
    name: "BG.indice_agent_id2",
    disabled: true,
    required: true,
  },
  {
    label: "Date bareme",
    name: "BG.date_bareme_2",
    required: true,
    type: "select",
  },
  {
    label: "Traitement annuel (T2)",
    name: "BG.traitement2",
  },
];

export const BGT3_FORM_INTEGRATION = [
  {
    label: "Date de l’intégration",
    name: "date_integration_agent",
    required: true,
    type: "date",
  },
  {
    label: "Ref arrteté intégration",
    name: "reference",
    required: true,
    type: "textarea",
  },

  {
    label: "Corps",
    name: "code_corps_agent_3",
    required: true,
    type: "select",
  },
  {
    label: "Grade d’intégration",
    name: "code_grade_agent_3",
    required: true,
    select: true,
    type: "select",
  },
  {
    label: "Indice d’intégration",
    name: "indice_agent_id3",
    disabled: true,
  },
];

export const BGT3_FORM_TITULARISATION = [
  {
    label: "Date de la titularisation ",
    name: "date_titularisation_agent",
    required: true,
    type: "date",
  },
  {
    label: "Référence Titularisation",
    name: "reference_titularisation",
    required: true,
    type: "textarea",
  },
  {
    label: "Corps",
    name: "code_corps_titularisation_agent_3",
    required: true,
    type: "select",
  },
  {
    label: "Grade de titularisation",
    name: "code_grade_titularisation_agent_3",
    required: true,
    select: true,
    type: "select",
    placeholder: "D'abord, veuillez choisir un corps",
  },
  {
    label: "Indice de titularisation",
    name: "indice_titularisation_agent_id3",
    disabled: true,
  },
  {
    label: "Date bareme",
    name: "date_bareme_titularisation_3",
    required: true,
    type: "select",
  },
];

export const DATE_DEPOT_NOTIFICATION_FORM = [
  {
    label: "Date de depot de dossier",
    name: "date_depot_dossier",
    required: true,
    type: "date",
  },
  {
    label: "Date Notification intégration",
    name: "date_notification",
    required: true,
    type: "date",
  },
];

// YUP ALL BG1 BG2
export const YUP_SCHEMA_BG_FORM = yup.object({
  BG: yup.object({
    date_debut_service: yup
      .string("Date invalide")
      .required("Date de prise de service est obligatoire"),

    date_fin_service: yup
      .string("Date invalide")
      .required("Date à la veille de l’intégration est obligatoire"),

    code_corps_agent_1: yup.object().required("Corps est obligatoire"),
    code_grade_agent_1: yup.object().required("Grade est obligatoire"),
    date_bareme_1: yup.object().required("Date bareme est obligatoire"),
    traitement1: yup
      .string("Traitement annuel (T1) est obligatoire")
      .required("Traitement annuel (T1) est obligatoire")
      .test("is-number", "Entrez un nombre", isNumber),

    code_corps_agent_2: yup.object().required("Corps est obligatoire"),
    code_grade_agent_2: yup.object().required("Grade est obligatoire"),
    date_bareme_2: yup.object().required("Date bareme est obligatoire"),
    traitement2: yup
      .string()
      .required("Traitement annuel (T2) est obligatoire")
      .test("is-number", "Entrez un nombre", isNumber),
  }),
});

export const YUP_SCHEMA_T3_FORM = yup.object({
  date_integration_agent: yup
    .string()
    .required("Date de l’intégration est obligatoire"),
  reference: yup.string().required("Ref arrêté intégration est obligatoire"),
  code_corps_agent_3: yup.object().required("Corps est obligatoire"),
  code_grade_agent_3: yup.object().required("Grade est obligatoire"),
  // date_bareme_3: yup.object().required("Date bareme est obligatoire"),
  traitement3: yup
    .string()
    .required("Traitement annuel (T3) est obligatoire")
    .test("is-number", "Entrez un nombre", isNumber),
});

export const YUP_SCHEMA_DATE_DEPOT_NOTIFICATION_FORM = yup.object({
  date_depot_dossier: yup
    .string()
    .required("Date de depot de dossier est obligatoire"),
  date_notification: yup
    .string()
    .required("Date Notification intégration est obligatoire"),
});

//  ----------------------------------------------------------- CNAPS PRIVE ---------------------------------------------------------------------------------

export const CNAPS_PRIVE_FORM_LEFT = [
  {
    label: "Date début de service",
    name: "CNAPS_PRIVE.date_debut_service",
    type: "date",
    required: true,
  },

  {
    label: "Taux CNAPS",
    name: "CNAPS_PRIVE.taux_cnaps",
    required: true,
  },
];

export const CNAPS_PRIVE_FORM_RIGHT = [
  {
    label: "Date fin de service",
    name: "CNAPS_PRIVE.date_fin_service",
    required: true,
    type: "date",
  },
  {
    label: "Cotisation CNAPS",
    name: "CNAPS_PRIVE.cotisation_cnaps",
    required: true,
  },
];

export const YUP_SCHEMA_CNAPS_PRIVE = yup.object({
  CNAPS_PRIVE: yup.object({
    date_debut_service: yup
      .string("Date invalide")
      .required("Date de prise de service est obligatoire"),
    taux_cnaps: yup
      .mixed()
      .test(
        "is-number",
        "Entrez un nombre",
        (value) => !isNaN(value) && value !== ""
      )
      .required("Taux CNAPS est obligatoire"),
    cotisation_cnaps: yup
      .mixed()
      .test(
        "is-number",
        "Entrez un nombre",
        (value) => !isNaN(value) && value !== ""
      )
      .required("Cotisation CNAPS est obligatoire"),
    date_fin_service: yup
      .string("Date invalide")
      .required("Date fin de service est obligatoire")
      .test(
        "date_fin_superieur",
        "La date de fin doit être supérieure à la date de début",
        function (value) {
          const { date_debut_service } = this.parent;
          return new Date(date_debut_service) < new Date(value);
        }
      ),
  }),
});

export const CNAPS_PRIVE_DATE_VALIDATION = [
  {
    label: "Date début",
    name: "date_deb",
    required: true,
    type: "date",
  },
  {
    label: "Date fin",
    name: "date_fin",
    required: true,
    type: "date",
  },
];
export const YUP_SCHEMA_CNAPS_PRIVE_DATE_VALIDATION = yup.object({
  date_deb: yup.string().required("Date début est obligatoire"),
  date_fin: yup.string().required("Date fin est obligatoire"),
});

//  ----------------------------------------------------------- CNAPS ECD ---------------------------------------------------------------------------------

export const CNAPS_ECD_FORM_LEFT = [
  {
    label: "Date début de service",
    name: "CNAPS_ECD.date_debut_service",
    type: "date",
    required: true,
  },

  {
    label: "Taux CNAPS",
    name: "CNAPS_ECD.taux_cnaps",
    required: true,
  },
  {
    label: "Cotisation CNAPS",
    name: "CNAPS_ECD.cotisation_cnaps",
    required: true,
  },
];

export const CNAPS_ECD_FORM_RIGHT = [
  {
    label: "Date fin de service",
    name: "CNAPS_ECD.date_fin_service",
    required: true,
    type: "date",
  },

  {
    label: "Taux CNAPS Individuel",
    name: "CNAPS_ECD.taux_cnaps_individuel",
    required: true,
  },
  {
    label: "Taux CNAPS Patronal",
    name: "CNAPS_ECD.taux_cnaps_patronal",
    required: true,
  },
];

export const CNAPS_ECD_DATE_VALIDATION = [
  {
    label: "Date début",
    name: "date_deb_ecd",
    required: true,
    type: "date",
  },
  {
    label: "Date fin",
    name: "date_fin_ecd",
    required: true,
    type: "date",
  },
];
