import React, { useState, useEffect } from 'react';
import axios from 'axios';

function List() {
  const [ files, setFiles ] = useState<[string]>();

  useEffect(() => {
    axios.get("/ls")
    .then(res => res.data)
    .then((data: {files: [string]}) => {
      setFiles(data.files);
    });
  }, []);

  return (
    <div>
    {files ? (
      files.map(fname => {
        return <div>{fname}</div>
      })
    ) : <></>}
    </div>
  )
}

export default List
