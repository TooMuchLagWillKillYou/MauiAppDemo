import apiConfig from '@/api/config';
import type { ClosureDay } from '@/types/closureDay';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';

const useGetRange = (from: Date, to: Date) => {
  const dateOnlyFrom = format(from, 'yyyy-MM-dd');
  const dateOnlyTo = format(to, 'yyyy-MM-dd');

  return useQuery<ClosureDay[]>({
    queryKey: ['closureDays', dateOnlyFrom, dateOnlyTo],
    queryFn: async () => {
      const response = await axios.get(
        `${apiConfig.baseURL}/closureDay/getRange?from=${dateOnlyFrom}&to=${dateOnlyTo}`
      );
      return (Array.isArray(response.data) ? response.data : []).map(
        (d: ClosureDay) => ({
          from: d.from,
          to: d.to,
          reason: d.reason,
        })
      );
    },
  });
};

export { useGetRange };
