import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css'

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
    <ul className="mainList">
    {files ? (
      files.map(fname => {
        return <li><Link to={`/read/${fname}`}>{fname}</Link></li>
      })
    ) : <></>}
    </ul>
  )
}

export default List
