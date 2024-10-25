export const CATEGORIE = [
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
];

export const BAREME_SEARCH_FORM = [
  {
    label: "Année",
    name: "date_bareme",
    required: true,
    maxLength: "4",
  },
  {
    label: "Catégorie",
    name: "categorie",
    disabled: true,
    // select: true,
    // options: CATEGORIE,
  },
  {
    label: "Indice",
    name: "indice",
    disabled: true,
    type: "number",
    maxLength: "5",
  },
];
