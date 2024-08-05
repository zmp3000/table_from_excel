export const fetchColumns = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const columnCount = Math.floor(Math.random() * 99) + 2;
      const columns = Array.from({ length: columnCount }, (_, i) => `Обработка${i + 1}`);
      resolve(columns);
    }, 1500);
  });
};

export const fetchRows = async (columnCount: number): Promise<boolean[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rowCount = Math.floor(Math.random() * 99) + 2;
      const rows = Array.from({ length: rowCount }, () =>
        Array.from({ length: columnCount }, () => Math.random() >= 0.5)
      );
      resolve(rows);
    }, 1500);
  });
};