export const formatToInput = (date) => {
  //12/02/2025
  return date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
};

export const dateYYYYMMDDtoDDMMYYYY = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};
export const dateToInput = (date) => {
  //"2000-01-01T00:00:00.000000Z"
  if (date && date.includes("T")) {
    const [dateValide, time] = date.split("T");
    return dateValide;
  }

  if (!date) {
    return "2000-01-01";
  }
  return date;
};

export const JJMMAAAAToinput = (date, separator = "-") => {
  //12/02/2025
  if (date === null || date === undefined) return null;
  const [day, month, year] = date.split(separator);
  return `${year}-${month}-${day}`;
};

export const getYear = (date) => {
  if (!date) return "";
  return date.split("-")[0];
};
