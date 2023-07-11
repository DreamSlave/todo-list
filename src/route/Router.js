import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainLayout from "../layout/MainLayout";
import First from "../views/First";
import Main from "../views/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
            },
            {
                path: 'first',
                element: <First />,
            },
            {
                path: 'main',
                element: <Main />,
            },
        ],
    },
]);

export default router;
