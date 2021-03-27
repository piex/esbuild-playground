import React, { FC, useRef, useEffect } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import './style.css';
import 'highlight.js/styles/default.css';

hljs.registerLanguage('javascript', javascript);

interface EditorProps {
  code: string;
}

const Editor: FC<EditorProps> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!codeRef.current) {
      return
    }
    hljs.highlightBlock(codeRef.current);
  }, [code])

  return (
    <div className="playground-sidebar">
      <pre>
        <code ref={codeRef}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default Editor;
