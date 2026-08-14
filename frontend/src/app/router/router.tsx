import {
    createBrowserRouter,
} from "react-router-dom";

import LoginPage from "../../features/auth/pages/LoginPage";

function HomePage() {
    return <div>Home</div>;
}

function RegisterPage() {
    return <div>Register</div>;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);