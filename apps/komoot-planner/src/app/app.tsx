import './global.css';

import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Map from './components/map/index';
import Panel from './components/panel';
import { RouteDataProvider } from './providers/RouteDataContext';

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
`;

export function App() {
  return (
    <>
      <Helmet>
        <title>Route Planner | Komoot</title>
      </Helmet>
      <RouteDataProvider>
        <StyledApp>
          <Panel />
          <Map />
        </StyledApp>
      </RouteDataProvider>
    </>
  );
}

export default App;
