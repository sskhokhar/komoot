import { DragDropItem, DragDropList } from '@komoot/drag-drop';
import styled from 'styled-components';

import { ReactComponent as DeleteIco } from '../../../assets/delete-icon.svg';
import { ReactComponent as DragIco } from '../../../assets/drag-icon.svg';

export const Title = styled.h1`
  color: #fff;
  border-bottom: 3px solid #747474;
  padding-bottom: 12px;
`;

export const StyledDragDropList = styled(DragDropList)`
  height: 75vh;
  overflow: auto;
`;

export const PanelContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  z-index: 9999;
  height: 100%;
  width: 300px;
  background-color: #383838;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  justify-content: space-between;
`;

export const StyledDragDropItem = styled(DragDropItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Left = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Label = styled.span`
  padding: 0 12px;
  font-weight: bold;
`;

export const DragIcon = styled(DragIco)`
  width: 25px;
  height: 25px;
  path {
    stroke: #747474;
  }
`;

export const DeleteIcon = styled(DeleteIco)`
  cursor: pointer;
  width: 20px;
  height: 20px;

  path {
    fill: #747474;
  }
  &:hover {
    transition: 0.2s;
    path {
      fill: #c4c4c4;
    }
  }
`;

export const DownloadBtn = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #c3e451;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem;
  color: #383838;
  cursor: pointer;
  margin-bottom: 14px;
`;
