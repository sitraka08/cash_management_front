import React from "react";
import { confirmDialog } from "primereact/confirmdialog";

const ConfirmDialogs = (message) => {

  return new Promise((resolve) => {
    confirmDialog({
      message:message ? message : "Etes vous sûr de la suppresion ?" ,
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      rejectLabel: "Non",
      acceptLabel: "Oui",
      accept: resolve,
    });
  });
};

export default ConfirmDialogs;
