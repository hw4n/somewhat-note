import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Document.css';

function localeString(datestr: string) {
  return new Date(datestr).toLocaleString();
}

function Document(props: any) {
  const documentName = props.match.params.document;
  const [body, setBody] = useState<string>();
  const [meta, setMeta] = useState<{
    size: number;
    ctime: string;
    mtime: string;
    birthtime: string;
  }>();

  useEffect(() => {
    axios.get(`/note/${documentName}`)
    .then(res => res.data)
    .then((data: {
      data: string,
      meta: {
        size: number,
        ctime: string,
        mtime: string,
        birthtime: string
      }
    }) => {
      setBody(data.data);
      setMeta(data.meta);
    });
  }, [documentName]);

  return (
    <div className="article">
      {meta ? (
        <div className="metadata">
          {meta.size} bytes, time: {localeString(meta.birthtime)}
        </div>
      ) : <></>}
      <pre>
        {body}
      </pre>
    </div>
  )
}

export default Document
