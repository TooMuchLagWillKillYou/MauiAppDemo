import { apiConfig } from '@/lib/constants';
import type { TableForDropdown } from '@/types/tableForDropdown';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

const useTablesForDropdown = () => {
  return useQuery<TableForDropdown[]>({
    queryKey: ['tablesForDropdown'],
    queryFn: async () => {
      const response = await axios.get(
        `${apiConfig.baseURL}/table/getTablesForDropdown`
      );
      return Array.isArray(response.data) ? response.data : [];
    },
  });
};

export { useTablesForDropdown };
