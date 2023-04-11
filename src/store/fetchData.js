export const getTableData = async ([start, end]) => {
  const response = await fetch(
    `http://go-dev.greedygame.com/v3/dummy/report?startDate=${start}&endDate=${end}`
  );
  return response.json();
};

export const getAppData = async () => {
  const response = await fetch(`http://go-dev.greedygame.com/v3/dummy/apps`);
  return response.json();
};
