import styled from 'styled-components';

export const MapContainer = styled.div`
  heigth: 100%;
  width: 100%;
`;

export const Marker = styled.span`
  z-index: 1000000;
  margin-left: 1px;
  border: 1px solid #373737;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display:inline-flex;
  justify-content:center;
  align-items:center";
  position: absolute;
  left: -4px;
  top: -5px;
  color: white;
  font-weight: bold;
  background:#373737;
`;
