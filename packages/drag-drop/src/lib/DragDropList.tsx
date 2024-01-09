import { DragEvent, ReactNode, useEffect, useRef, useState } from 'react';

export interface DragDropListProps<T> {
  children?: ReactNode;
  className?: string;
  list?: T;
  onReOrder?: (e: T) => void;
}

export const DragDropList = <T,>({
  children,
  className,
  list,
  onReOrder,
}: DragDropListProps<T[]>) => {
  const [localList, setLocalList] = useState<T[]>([]);
  const draggingItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
    const listCopy = [...localList];
    const draggingItemContent = listCopy[draggingItem.current as number];
    listCopy.splice(draggingItem.current as number, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setLocalList(listCopy);
  };
  const handleDragOver = () => {
    onReOrder && onReOrder(localList);
  };

  useEffect(() => {
    setLocalList(list as T[]);
  }, [list]);

  return (
    <div className={className}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <div
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={() => handleDragOver()}
            key={index}
            draggable
          >
            {child}
          </div>
        ))}
    </div>
  );
};

export default DragDropList;
