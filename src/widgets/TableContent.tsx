import React, { useCallback } from "react";
import TableRow from "./TableRow";

interface TableContentProps {
  columns: string[];
  rows: boolean[][];
  isEditMode: boolean;
  isDeleteMode: boolean;
  onRowChange: (rowIndex: number, newRow: boolean[]) => void;
  onDeleteRequest: (rowIndex: number) => void;
}

const TableContent: React.FC<TableContentProps> = ({
  columns,
  rows,
  isEditMode,
  isDeleteMode,
  onRowChange,
  onDeleteRequest,
}) => {
  const handleCellChange = useCallback(
    (rowIndex: number, cellIndex: number) => {
      const newRow = rows[rowIndex].map((cell, index) =>
        index === cellIndex ? !cell : cell
      );
      onRowChange(rowIndex, newRow);
    },
    [rows, onRowChange]
  );

  return (
    <table style={{ marginTop: "70px" }}>
      <thead>
        <tr>
          <th></th>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            rowIndex={rowIndex}
            row={row}
            isEditMode={isEditMode}
            isDeleteMode={isDeleteMode}
            onCellChange={handleCellChange}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(TableContent);
