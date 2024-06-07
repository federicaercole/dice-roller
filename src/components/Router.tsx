import App from '../App';
import About from './About';
import Home from "./Home";
import Settings from './Settings';
import ErrorPage from './ErrorPage';
import Guide from './Guide';
import { createHashRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

const Router = () => {
    const router = createHashRouter(
        createRoutesFromElements(
            <Route element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="*" element={<ErrorPage />} />
            </Route >
        ));

    return <RouterProvider router={router} />;
}

export default Router;