import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        return <Link to={`/read/${fname}`}>{fname}</Link>
      })
    ) : <></>}
    </div>
  )
}

export default List
