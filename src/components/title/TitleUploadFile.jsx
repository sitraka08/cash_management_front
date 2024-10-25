import { FileUpload } from "primereact/fileupload";

const TitleUploadFile = ({
  title,
  onUpload = () => {},
  url = "",
  name = "",
  onProgress = () => {},
  onError = () => {},
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <FileUpload
        mode="basic"
        name={name}
        url={url}
        accept="text/plain"
        maxFileSize={1000000000000}
        onUpload={onUpload}
        chooseLabel="Ajouter"
        onProgress={onProgress}
        onError={onError}
      />
      <h1 className="text-title text-secondary font-bold">{title}</h1>
    </div>
  );
};

export default TitleUploadFile;
