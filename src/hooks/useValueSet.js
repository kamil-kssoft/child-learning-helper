import { useMemo } from 'react';

export function useValueSet() {
  return useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get('start');
    const stop = urlParams.get('stop');

    // If no start/stop provided, return range 1-10
    if (!start || !stop) {
      return Array.from({ length: 10 }, (_, i) => String(i + 1));
    }

    // Handle numeric ranges
    if (!isNaN(start) && !isNaN(stop)) {
      const startNum = parseInt(start);
      const stopNum = parseInt(stop);
      return Array.from(
        { length: stopNum - startNum + 1 },
        (_, i) => String(startNum + i)
      );
    }

    // Handle single character ranges
    if (start.length === 1 && stop.length === 1) {
      const startCode = start.charCodeAt(0);
      const stopCode = stop.charCodeAt(0);
      return Array.from(
        { length: stopCode - startCode + 1 },
        (_, i) => String.fromCharCode(startCode + i)
      );
    }

    // Handle word lists (comma-separated)
    return start.split(',').map(word => word.trim());
  }, []);
}