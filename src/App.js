import { useState, useEffect } from "react";
import DownloadCSV from "./components/DownloadCSV";

const title = "DESCRIÇÃO;DATA HORA;DATA;HORA;VALOR;SALDO;CARTÃO";

const App = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState({ data: '', name: 'empty' });
  const [count, setCount] = useState(0);
  const onChange = (event) => {
    const value = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFile({ data: event.target.result, name: value?.name || 'empty' });
    };

    reader.readAsText(value);
  };

  useEffect(() => {
    if (file?.data) {
      setFiles([...files, file?.data]);
      setFile({ ...file, data: ''});
    }
  }, [file]);

  useEffect(() => {
    setCount(files.length);
  }, [files]);

  return (
    <div>
      <input type="file" id="arquivo" onChange={onChange}></input>
      <h1>Convert Data</h1>
      <p>{count}</p>
      {files && (
        <>
          <DownloadCSV
            data={files.join("\n")}
            title={title}
            fileName={file.name.replace(/[.].*$/, '')}
          />
          <p>
            <button onClick={() => setFiles([])}>Clear</button>
          </p>
        </>
      )}
    </div>
  );
};

export default App;
