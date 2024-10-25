export const showToastSuccess = (detail = "", refer = null) => {
  refer.current.show({
    severity: "success",
    summary: "Succès",
    detail: detail,
    life: 3000,
  });
};
export const showToastError = (detail = "", refer = null) => {
  refer.current.show({
    severity: "error",
    summary: "Erreur",
    detail: detail,
    life: 3000,
  });
};
