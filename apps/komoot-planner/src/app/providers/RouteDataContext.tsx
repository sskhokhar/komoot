import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type TRouteData = {
  points: number[][];
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>;
};
export const RouteDataContext = createContext<TRouteData>({
  points: [],
  setPoints: () => undefined,
});

export const useRouteData = () => useContext(RouteDataContext);

export function RouteDataProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [points, setPoints] = useState<number[][]>([]);

  const value = useMemo(
    () => ({
      points,
      setPoints,
    }),
    [points]
  );

  useEffect(() => {
    setSearchParams({ path: points.map((point) => `${point[0]}_${point[1]}`) });
  }, [points, setSearchParams]);

  useEffect(() => {
    const arr = searchParams.getAll('path');
    if (arr.length > 0) {
      setPoints(
        arr.map((point) => {
          const split = point.split('_');
          return [parseFloat(split[0]), parseFloat(split[1])];
        })
      );
    }
  }, []);

  return (
    <RouteDataContext.Provider value={value}>
      {children}
    </RouteDataContext.Provider>
  );
}
