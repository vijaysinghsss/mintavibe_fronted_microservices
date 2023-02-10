import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ handleFileChange, accept = [] }) {
    const handleChange = (file) => {
        handleFileChange(file);
      };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      multiple={true}
      types={accept|| fileTypes}
    />
  );
}

export default DragDrop;
