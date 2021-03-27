import React, { FC, useCallback, useEffect, useState } from 'react';
import { startService } from 'esbuild-wasm/esm/browser';
import Editor from '../Editor';
import Preview from '../Preview';
import Dragbar from '../Dragbar';
import './style.css';

const Container: FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const transform = useCallback(async () => {
    const service = await startService({
      wasmURL: '/esbuild.wasm',
    })

    service.transform(code, {
      loader: 'ts',
      format: 'esm',
      target: 'es6',
      charset: 'utf8'
    }).then(result => {
      setOutput(result.code)
    }).catch(err => {
      console.info('---------')
      console.info(JSON.stringify(err.errors[0].notes, null, 2))
    });
  }, [code])

  useEffect(() => {
    transform()
  }, [transform]);

  return (
    <main className="container">
      <Editor value={code} onChange={setCode} />
      <Dragbar />
      <Preview code={output} />
    </main>
  )
}

export default Container;
