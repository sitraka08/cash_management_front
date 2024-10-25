import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import "./modal.css";
import Buttons from "../button/Buttons";

const Modals = ({
  header,
  open,
  onHide,
  style,
  children,
  className,
  hideFooter,
  parent = "form",
  btnAction = () => {},
  onSubmit = () => {},
  ...props
}) => {
  const submitBtnRef = useRef(null);
  const modalFooter = () => {
    return (
      <div>
        <Buttons
          label="Valider"
          severity="info"
          type="button"
          onClick={() => {
            submitBtnRef.current.click();
          }}
        />
        {/* <Buttons label="Fermer" severity="secondary" onClick={props.onHide} /> */}
      </div>
    );
  };
  return (
    <Dialog
      header={header}
      visible={open}
      style={style}
      footer={hideFooter || modalFooter}
      onHide={onHide}
      resizable={false}
      className={`${className} min-h-[95%]`}
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      {...props}
    >
      {parent === "form" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="w-full">{children}</div>
          <button
            ref={submitBtnRef}
            type="submit"
            style={{ display: "none" }}
            onClick={btnAction}
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <div className="w-full">{children}</div>
          <button
            ref={submitBtnRef}
            type="button"
            style={{ display: "none" }}
            onClick={() => btnAction()}
          >
            Submit
          </button>
        </div>
      )}
    </Dialog>
  );
};

export default Modals;
