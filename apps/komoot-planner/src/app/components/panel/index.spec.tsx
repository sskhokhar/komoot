import '@testing-library/jest-dom'; // for additional matchers

import { fireEvent, render, screen } from '@testing-library/react';

import * as RouteProviderContext from '../../providers/RouteDataContext';
import * as Utils from '../../utils';
import Panel from '.';

// Mock the useRouteData hook
jest.mock('../../providers/RouteDataContext', () => ({
  useRouteData: jest.fn(() => ({ points: [], setPoints: jest.fn() })),
}));

// Mock the downloadFile and pointsToGpx functions
jest.mock('../../utils', () => ({
  downloadFile: jest.fn(),
  pointsToGpx: jest.fn(),
}));

describe('Panel Component', () => {
  const mockSetPoints = jest.fn();
  beforeEach(() => {
    RouteProviderContext.useRouteData.mockReturnValue({
      points: [{ latitude: 10, longitude: 20 }],
      setPoints: mockSetPoints,
    });
  });
  test('renders the panel with waypoints and download button', () => {
    render(<Panel />);

    expect(screen.getByText('Route Planner')).toBeInTheDocument();

    expect(screen.getByText('Waypoint 1')).toBeInTheDocument();

    expect(screen.getByText('Download Route')).toBeInTheDocument();
  });

  test('calls handleDelete when delete icon is clicked', () => {
    render(<Panel />);

    fireEvent.click(screen.getByTestId('delete-icon'));

    expect(mockSetPoints).toHaveBeenCalledWith([]);
  });

  test('calls handleDownload when download button is clicked', () => {
    render(<Panel />);
    fireEvent.click(screen.getByText('Download Route'));
    expect(Utils.downloadFile).toHaveBeenCalled();
  });
});
