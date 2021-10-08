import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Document.css';

function Document(props: any) {
  const documentName = props.match.params.document;
  const [body, setBody] = useState<string>();

  useEffect(() => {
    axios.get(`/note/${documentName}`)
    .then(res => res.data)
    .then((data: { data: string }) => {
      setBody(data.data);
    });
  }, [documentName]);

  return (
    <div className="article">
      <pre>
        {body}
      </pre>
    </div>
  )
}

export default Document
