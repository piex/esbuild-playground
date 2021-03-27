import React, {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  MouseEventHandler,
} from 'react';
import './style.css';

interface DragbarProps {

}

const Dragbar: FC<DragbarProps> = () => {
  const [draging, setDraging] = useState(false);
  const xRef = useRef(0);

  const handleDragStart: MouseEventHandler<HTMLDivElement> = useCallback((evt) => {
    setDraging(true);
    xRef.current = evt.pageX;
    document.body.style.userSelect = 'none';
  }, [])

  useEffect(() => {
    const sidebarEl = document.getElementsByClassName('playground-sidebar')[0] as HTMLDivElement;
    const editorEl = document.getElementsByClassName('editor-container')[0] as HTMLDivElement;
    const width = sidebarEl.getBoundingClientRect().width;

    const drag = (evt: MouseEvent) => {
      const nextWidth = width - (evt.pageX - xRef.current);

      editorEl.style.width = `calc(100vw - ${nextWidth + 8}px)`;
      sidebarEl.style.width = `${nextWidth}px`;
      sidebarEl.style.maxWidth = `${nextWidth}px`;
      sidebarEl.style.flexBasis = `${nextWidth}px`;
    }

    const stop = (evt: MouseEvent) => {
      if (!evt) {
        return
      }

      const to: any = evt.relatedTarget;
      if (!to || to.nodeName === "HTML") {
        setDraging(false);
      }
    }

    if (draging) {
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseout', stop);
      document.addEventListener('mouseup', stop);
    }

    return () => {
      document.body.style.userSelect = 'auto';
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseout', stop);
      document.removeEventListener('mouseup', stop);
    }
  }, [draging])

  return (
    <div
      className="dragbar"
      onMouseDown={handleDragStart}
    />
  );
};

export default memo(Dragbar);
