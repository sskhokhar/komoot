import { Map as KomootMap } from '@komoot/map';
import L from 'leaflet';
import { useRouteData } from '../../providers/RouteDataContext';

export default function Map() {
  const { points, setPoints } = useRouteData();

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    setPoints((prevArray) => [...prevArray, [e.latlng.lat, e.latlng.lng]]);
  };

  return <KomootMap onMapClick={handleMapClick} markers={points} />;
}
