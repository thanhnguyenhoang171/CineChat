import { createBrowserRouter } from 'react-router';
// import { MainLayout } from './layouts/main-layout';
import RegisterPage from './pages/register-page';
import { RouterProvider } from 'react-router/dom';

export default function App() {
    const router = createBrowserRouter([
        // {
        // path: '/',
        // element: <MainLayout></MainLayout>,

        // children: [
        //         {
        //             index: true,
        //             element: <HomePage isAuthenticated={isAuthenticated} />,
        //         },
        //         {
        //             path: 'flashcard',
        //             element: (
        //                 <PrivateRoute isAuthenticated={isAuthenticated}>
        //                     <FlashcardList />
        //                 </PrivateRoute>
        //             ),
        //         },
        //         {
        //             path: 'post',
        //             element: (
        //                 <PrivateRoute isAuthenticated={isAuthenticated}>
        //                     <PostOwnerList />
        //                 </PrivateRoute>
        //             ),
        //         },
        //         {
        //             path: 'comment',
        //             element: (
        //                 <PrivateRoute isAuthenticated={isAuthenticated}>
        //                     <CommentOwner />
        //                 </PrivateRoute>
        //             ),
        //         },
        //     ],
        // },

        // {
        //     path: '/login',
        //     element: <LoginPage />,
        // },

        {
            path: '/register',
            element: <RegisterPage />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
