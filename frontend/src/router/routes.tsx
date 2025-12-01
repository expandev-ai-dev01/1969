import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.HomePage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFoundPage }))
);
const TaskCreatePage = lazy(() =>
  import('@/pages/TaskCreate').then((module) => ({ default: module.TaskCreatePage }))
);
const TaskEditPage = lazy(() =>
  import('@/pages/TaskEdit').then((module) => ({ default: module.TaskEditPage }))
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'tasks/new',
        element: <TaskCreatePage />,
      },
      {
        path: 'tasks/:id/edit',
        element: <TaskEditPage />,
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { routes };
