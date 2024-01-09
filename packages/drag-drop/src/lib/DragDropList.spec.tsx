import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DragDropList } from './DragDropList';

describe('DragDropList Component', () => {
  test('reorders the list on drag-and-drop', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onReOrderMock = jest.fn();

    const { getByText } = render(
      <DragDropList list={items} onReOrder={onReOrderMock}>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </DragDropList>
    );

    const item1 = getByText('Item 1');
    const item2 = getByText('Item 2');
    const item3 = getByText('Item 3');

    fireEvent.dragStart(item1);
    fireEvent.dragEnter(item2);
    fireEvent.dragEnd(item2);

    expect(onReOrderMock).toHaveBeenCalledWith(['Item 2', 'Item 1', 'Item 3']);
  });
});
