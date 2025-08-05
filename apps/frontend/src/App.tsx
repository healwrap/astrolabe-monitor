import { QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';

import { router } from './router/index';
import { queryClient } from './utils/query-client';

// 时间格式化库
setDefaultOptions({
  locale: zhCN,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
