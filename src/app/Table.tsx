import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchColumns, fetchRows } from "@features/GenerateTableFunctions";
import Modal from "@shared/components/Modal";
import HeaderButtons from "@widgets/HeaderButtons";
import TableContent from "@widgets/TableContent";
import "./App.css";

interface ITableProps {
  columns: string[];
  rows: boolean[][];
}

const Table = () => {
  const [table, setTable] = useState<ITableProps>({ columns: [], rows: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const columns = await fetchColumns();
        const rows = await fetchRows(columns.length);
        setTable({ columns, rows });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRow = useCallback(() => {
    const newRow = Array.from(
      { length: table.columns.length },
      () => Math.random() >= 0.5
    );
    setTable((prev) => ({
      ...prev,
      rows: [...prev.rows, newRow],
    }));
  }, [table.columns.length]);

  const confirmDelete = useCallback(() => {
    if (rowToDelete !== null) {
      setTable((prev) => ({
        ...prev,
        rows: prev.rows.filter((_, i) => i !== rowToDelete),
      }));
    }
    setShowModal(false);
    setRowToDelete(null);
  }, [rowToDelete]);

  const cancelDelete = useCallback(() => {
    setShowModal(false);
    setRowToDelete(null);
  }, []);

  const handleRowChange = useCallback((rowIndex: number, newRow: boolean[]) => {
    setTable((prev) => ({
      ...prev,
      rows: prev.rows.map((row, index) => (index === rowIndex ? newRow : row)),
    }));
  }, []);

  const handleDeleteRequest = useCallback((rowIndex: number) => {
    setRowToDelete(rowIndex);
    setShowModal(true);
  }, []);

  const headerButtons = useMemo(
    () => (
      <HeaderButtons
        addRow={handleAddRow}
        isEditMode={isEditMode}
        isDeleteMode={isDeleteMode}
        setIsEditMode={setIsEditMode}
        setIsDeleteMode={setIsDeleteMode}
      />
    ),
    [handleAddRow, isEditMode, isDeleteMode, setIsEditMode, setIsDeleteMode]
  );

  const tableContent = useMemo(
    () => (
      <TableContent
        columns={table.columns}
        rows={table.rows}
        isEditMode={isEditMode}
        isDeleteMode={isDeleteMode}
        onRowChange={handleRowChange}
        onDeleteRequest={handleDeleteRequest}
      />
    ),
    [table.columns, table.rows, isEditMode, isDeleteMode, handleRowChange, handleDeleteRequest]
  );

  return (
    <div>
      {loading ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <>
          {headerButtons}
          {tableContent}
          {showModal && (
            <Modal>
              <div className="modal">
                <div className="modal-content">
                  <p>Вы сейчас удалите строку, вы уверены, что хотите этого?</p>
                  <button onClick={confirmDelete}>Да</button>
                  <button onClick={cancelDelete}>Нет</button>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
