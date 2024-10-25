import Buttons from "../button/Buttons";

const Search = ({
  children,
  onSubmit,
  onReset = () => {},
  disableReset,
  isEdited,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[100%]  my-3 border border-zinc-300 px-5 p-4 gap-x-3 rounded-[5px] "
      noValidate
    >
      {children}
      <div className="mb-[2px] flex items-center gap-2">
        <Buttons
          type="submit"
          label={isEdited ? "Modifier" : "Ajouter"}
          icon={isEdited ? "pi pi-check" : "pi pi-plus"}
        />

        {isEdited && (
          <Buttons
            type="button"
            label="Annuler"
            icon="pi pi-times"
            severity="secondary"
            onClick={onReset}
          />
        )}
      </div>
    </form>
  );
};

export default Search;
