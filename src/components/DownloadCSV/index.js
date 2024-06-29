import React from "react";

const DownloadCSV = ({ data, title, fileName }) => {
  const convertToCSV = (text) => {
    const arr = text
      .replace(/[∶]/g, ":")
      .replace(/((\n)+)?(-)((\n)+)?/g, "-;")
      .split(";");
    const result = arr.map((item) =>
      item.match(
        /(.*)?\s*?(.*)\s*(\d{2}\/\d{2}\/\d{4})\s*((\d{2})[:∶](\d{2}))\s*((-?R\$?)\s*((\d*)[,.]?)+)\s*((R\$)\s*((\d*)[,.]?)+)\s*(-)$/
      )
    );

    const list = result
      .map((item) => {
        const description = item?.[1] ? `${item?.[1]}${item?.[2]}` : item?.[2];
        const dateTime = `${item?.[3] || ''} ${item?.[4] || ''}`;
        const date = item?.[3];
        const time = item?.[4];
        const value = item?.[7].replace("\n", " ");
        const total = item?.[11].replace("\n", " ");
        const card = item?.[15];

        return [description, dateTime, date, time, value, total, card].join(";");
      })
      .join("\n");

    return `${title}\n${list}`;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={downloadCSV}>Download CSV</button>;
};

export default DownloadCSV;
