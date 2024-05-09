import App from '../App';
import Home from "./Home";
import Settings from './Settings';
import { createHashRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

const Router = () => {
    const router = createHashRouter(
        createRoutesFromElements(
            <Route element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
            </Route >
        ));

    return <RouterProvider router={router} />;
}

export default Router;