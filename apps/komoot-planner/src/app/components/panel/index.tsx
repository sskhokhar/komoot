import { useRouteData } from '../../providers/RouteDataContext';
import { downloadFile, pointsToGpx } from '../../utils';
import {
  DeleteIcon,
  DownloadBtn,
  DragIcon,
  Label,
  Left,
  PanelContainer,
  StyledDragDropItem,
  StyledDragDropList,
  Title,
} from './styles';

export default function Panel() {
  const { points, setPoints } = useRouteData();

  const handleDelete = (index: number) => {
    const copy = [...points];
    copy.splice(index, 1);
    setPoints(copy);
  };

  const handleDownload = () => {
    downloadFile('export.gpx', pointsToGpx(points));
  };

  return (
    <PanelContainer>
      <div>
        <Title>Route Planner</Title>
        <StyledDragDropList list={points} onReOrder={(e: any) => setPoints(e)}>
          {points.map((x, i) => (
            <StyledDragDropItem key={i}>
              <Left>
                <DragIcon />
                <Label>Waypoint {i + 1}</Label>
              </Left>
              <DeleteIcon
                data-testid="delete-icon"
                onClick={() => handleDelete(i)}
              />
            </StyledDragDropItem>
          ))}
        </StyledDragDropList>
      </div>
      <DownloadBtn onClick={() => handleDownload()}>Download Route</DownloadBtn>
    </PanelContainer>
  );
}
