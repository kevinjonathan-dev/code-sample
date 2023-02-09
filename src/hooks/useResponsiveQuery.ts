import { useMediaQuery } from 'react-responsive';

function useResponsiveQuery(): boolean {
  const mobileWidth = 640;

  // es-lint-disable-next-line
  const isMobile: boolean = useMediaQuery({
    query: `(max-width:${mobileWidth}px)`, // es-lint-disable-line
  });

  return isMobile;
}

export default useResponsiveQuery;
