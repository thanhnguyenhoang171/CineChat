import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { accountQueries } from '~/queries/account.queries';
import { useBoundStore } from '~/store';

export function useAccount() {
  // Lấy action setAccount
  const setAccount = useBoundStore((state) => state.setAccount);

  const existingAccount = useBoundStore((state) => state.account);

  const query = useQuery({
    ...accountQueries.detail(),

    // Inject dữ liệu từ Account Store vào làm Initial Data
    initialData: existingAccount || undefined,
  });

  // Đồng bộ
  useEffect(() => {
    if (query.data) {
      // So sánh data mới từ API (query.data) với data đang có trong Store (existingAccount)
      // Lưu ý: existingAccount có thể null lúc đầu, nên cần check kỹ
      const currentStoreData = JSON.stringify(existingAccount);
      const newApiData = JSON.stringify(query.data);

      const isDifferent = currentStoreData !== newApiData;

      if (isDifferent) {
        console.log('Detect change! Updating account store...');
        setAccount(query.data);
      }
    }
  }, [query.data, setAccount, existingAccount]);

  return query;
}
