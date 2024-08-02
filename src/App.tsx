import React, { useState, useEffect } from 'react';
import { fetchColumns, fetchRows } from './AsyncFunctions';
import './App.css';

interface TableProps {}

const Table: React.FC<TableProps> = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<boolean[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const columns = await fetchColumns();
      const rows = await fetchRows(columns.length);
      setColumns(columns);
      setRows(rows);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddRow = () => {
    const newRow = Array.from({ length: columns.length }, () => Math.random() >= 0.5);
    setRows([...rows, newRow]);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setIsDeleteMode(false);  
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setIsEditMode(false);  
  };

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    if (isEditMode) {
      const newRows = [...rows];
      newRows[rowIndex][cellIndex] = !newRows[rowIndex][cellIndex];
      setRows(newRows);
    } else if (isDeleteMode) {
      setRowToDelete(rowIndex);
      setShowModal(true);
    }
  };

  const confirmDelete = () => {
    if (rowToDelete !== null) {
      const newRows = rows.filter((_, i) => i !== rowToDelete);
      setRows(newRows);
    }
    setShowModal(false);
    setRowToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setRowToDelete(null);
  };


  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div>
    <div>
      <div className="header">
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={toggleEditMode} className={isEditMode ? 'active' : ''}>
          {isEditMode ? 'Stop Editing' : 'Edit'}
        </button>
        <button onClick={toggleDeleteMode} className={isDeleteMode ? 'active' : ''}>
          {isDeleteMode ? 'Stop Deleting' : 'Delete'}
        </button>
      </div>
      <table style={{marginTop: '70px'}}>
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
            <tr key={rowIndex}>
              <td>Заказ{rowIndex + 1}</td>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cell ? 'green-cell' : 'red-cell'}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                >
                  {cell ? 'Зеленый' : 'Красный'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <p>Вы сейчас удалите строку, вы уверены, что хотите этого?</p>
          <button onClick={confirmDelete}>Да</button>
          <button onClick={cancelDelete}>Нет</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Table;





