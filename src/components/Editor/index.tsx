import React, { FC, useRef, useLayoutEffect } from 'react';
import * as monaco from 'monaco-editor';
import './style.css';

interface EditorProps {
  value: string;
  onChange: (v: string) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  const editorElRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef(onChange);
  changeRef.current = onChange;

  useLayoutEffect(() => {
    if (!editorElRef.current) {
      return
    }

    const editor = monaco.editor.create(editorElRef.current, {
      value,
      language: 'typescript',
      automaticLayout: true
    });

    editor.onDidChangeModelContent(e => {
      changeRef.current && changeRef.current(editor.getValue())
    })
  }, [])

  return (
    <div className="editor-container">
      <div className="monaco-editor-embed" ref={editorElRef} />
    </div >
  );
};

export default Editor;
