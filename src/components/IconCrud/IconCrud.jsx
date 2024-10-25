import { Confirm } from "notiflix";
import { Button } from "primereact/button";

const IconCrud = ({
  deleteAction,
  validateAction,
  detailsAction,
  downloadAction,
  closeAction,
  editAction,
  cancelAction,
  changeStatus,
  banAction,
  viewsAction,
  changePack,
  rowData,
  listAction = [
    "details",
    "check",
    "delete",
    "edit",
    "close",
    "cancel",
    "status",
    "ban",
    "views",
  ],
}) => {
  return (
    <div className="flex gap-x-1">
      {listAction.includes("pack") && (
        <Button
          icon="pi pi-plus-circle"
          severity="help"
          size="small"
          raised
          tooltip="Change pack"
          tooltipOptions={{ position: "bottom" }}
          onClick={() => changePack(rowData)}
        />
      )}
      {listAction.includes("details") && (
        <Button
          icon="pi pi-file"
          severity="secondary"
          size="small"
          raised
          tooltip="Détails"
          tooltipOptions={{ position: "bottom" }}
          onClick={() => detailsAction(rowData)}
        />
      )}
      {listAction.includes("cancel") && (
        <Button
          icon="pi pi-history"
          severity="warning"
          size="small"
          raised
          tooltip="Annuler "
          tooltipOptions={{ position: "bottom" }}
          onClick={() => cancelAction(rowData)}
        />
      )}
      {listAction.includes("status") && (
        <Button
          icon="pi pi-exclamation-triangle"
          severity="info"
          size="small"
          raised
          tooltip="Changer status"
          tooltipOptions={{ position: "bottom" }}
          onClick={() => changeStatus(rowData)}
        />
      )}
      {listAction.includes("check") && (
        <Button
          icon="pi pi-check"
          raised
          tooltipOptions={{ position: "bottom" }}
          tooltip="Valider"
          onClick={() => validateAction(rowData)}
        />
      )}
      {listAction.includes("close") && (
        <Button
          icon="pi pi-lock"
          raised
          severity="info"
          tooltipOptions={{ position: "bottom" }}
          tooltip="Cloturer/Activer"
          onClick={() => closeAction(rowData)}
        />
      )}
      {listAction.includes("edit") && (
        <Button
          icon="pi pi-pencil"
          severity="warning"
          aria-label="User"
          tooltip="Modifier"
          raised
          tooltipOptions={{ position: "bottom" }}
          onClick={() => editAction(rowData)}
        />
      )}

      {listAction.includes("delete") && (
        <Button
          icon="pi pi-trash"
          severity="danger"
          aria-label="User"
          tooltip="Supprimer"
          raised
          tooltipOptions={{ position: "bottom" }}
          onClick={() =>
            Confirm.show(
              "Suppression",
              "Voulez-vous vraiment supprimer cet élément?",
              "Oui",
              "Non",
              () => deleteAction(rowData)
            )
          }
        />
      )}

      {listAction.includes("download") && (
        <Button
          icon="pi pi-download"
          tooltip="Télécharger CV"
          raised
          tooltipOptions={{ position: "bottom" }}
          onClick={() => downloadAction(rowData)}
        />
      )}
      {listAction.includes("views") && (
        <Button
          icon="pi pi-eye"
          severity="info"
          aria-label="User"
          tooltip="Voir"
          raised
          tooltipOptions={{ position: "bottom" }}
          onClick={() => viewsAction(rowData)}
        />
      )}

      {listAction.includes("ban") && (
        <Button
          icon="pi pi-ban"
          severity="danger"
          aria-label="User"
          tooltip="Bloquer"
          raised
          tooltipOptions={{ position: "bottom" }}
          onClick={() => banAction(rowData)}
        />
      )}
    </div>
  );
};

export default IconCrud;
