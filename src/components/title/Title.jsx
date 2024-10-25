import { useRef } from "react";
import Buttons from "../button/Buttons";

const Title = ({ title, onClick, hideBtn, onImport, isAgent }) => {
  const refFile = useRef(null);
  return (
    <div className="w-full flex justify-between items-center mt-8">
      {hideBtn || (
        <div className="flex items-center gap-2">
          <Buttons
            label="Ajouter"
            onClick={onClick}
            icon="pi pi-plus-circle"
            severity="info"
          />
          {isAgent && (
            <>
              <Buttons
                label="Importer"
                onClick={() => refFile.current.click()}
                icon="pi pi-upload"
                severity="success"
              />
              <input
                type="file"
                ref={refFile}
                onChange={onImport}
                className="hidden"
                // excel et csv
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </>
          )}
        </div>
      )}
      <h1 className="text-title text-secondary font-bold">{title}</h1>
    </div>
  );
};

export default Title;
