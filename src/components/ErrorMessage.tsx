import Error from "../assets/svg/error.svg";

function ErrorMessage({ errorMessage, id }: { [key: string]: string }) {

    if (errorMessage) {
        return <span id={id} className="warning" aria-live="off"><Error />{errorMessage}</span>
    }
}

export default ErrorMessage;