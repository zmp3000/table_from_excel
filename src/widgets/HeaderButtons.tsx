import React, { useCallback } from "react";

interface HeaderButtonsProps {
  addRow: () => void;
  isEditMode: boolean;
  isDeleteMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  addRow,
  isEditMode,
  isDeleteMode,
  setIsEditMode,
  setIsDeleteMode,
}) => {
  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
    setIsDeleteMode(false);
  }, [setIsEditMode, setIsDeleteMode]);

  const toggleDeleteMode = useCallback(() => {
    setIsDeleteMode((prev) => !prev);
    setIsEditMode(false);
  }, [setIsDeleteMode, setIsEditMode]);

  return (
    <div className="header">
      <button onClick={addRow}>Add Row</button>
      <button onClick={toggleEditMode} className={isEditMode ? "active" : ""}>
        {isEditMode ? "Stop Editing" : "Edit"}
      </button>
      <button onClick={toggleDeleteMode} className={isDeleteMode ? "active" : ""}>
        {isDeleteMode ? "Stop Deleting" : "Delete"}
      </button>
    </div>
  );
};

export default React.memo(HeaderButtons);
