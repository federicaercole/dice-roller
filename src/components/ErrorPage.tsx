import Error404 from "../assets/svg/error404.svg";
import { Heading } from "./Heading";

function ErrorPage() {

    return (<main className="flex error-page">
        <Heading>Error 404</Heading>
        <p>Page not found. <a href="/">Return to the homepage</a></p>
        <Error404 />
    </main >)
}

export default ErrorPage