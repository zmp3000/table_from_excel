import React, { useCallback } from "react";

interface TableRowProps {
  rowIndex: number;
  row: boolean[];
  isEditMode: boolean;
  isDeleteMode: boolean;
  onCellChange: (rowIndex: number, cellIndex: number) => void;
  onDeleteRequest: (rowIndex: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  rowIndex,
  row,
  isEditMode,
  isDeleteMode,
  onCellChange,
  onDeleteRequest,
}) => {
  const handleCellClick = useCallback(
    (cellIndex: number) => {
      if (isEditMode) {
        onCellChange(rowIndex, cellIndex);
      } else if (isDeleteMode) {
        onDeleteRequest(rowIndex);
      }
    },
    [rowIndex, isEditMode, isDeleteMode, onCellChange, onDeleteRequest]
  );

  return (
    <tr>
      <td>Заказ{rowIndex + 1}</td>
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className={cell ? "green-cell" : "red-cell"}
          onClick={() => handleCellClick(cellIndex)}
        >
          {cell ? "Зеленый" : "Красный"}
        </td>
      ))}
    </tr>
  );
};

export default React.memo(TableRow);
