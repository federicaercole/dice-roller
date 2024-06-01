import ErrorMessage from "./ErrorMessage";

interface FormProps {
    children: React.ReactNode;
    callback: (e: React.FormEvent<Element>) => void;
}

export function Form({ children, callback }: FormProps) {

    return (<form noValidate method="post" onSubmit={callback}>
        {children}
    </form>)
}

interface FieldProps {
    label: string;
    name: string;
    handle: {
        value: string;
        onChange: {
            (str: string): void;
            (e: React.FormEvent<Element>): void;
        }
    }
    error: string;
}

export function Field({ label, name, handle, error }: FieldProps) {

    return (<>
        <label htmlFor={name}>{label}</label>
        <ErrorMessage id={`error-${name}`} errorMessage={error} />
        <input type="text" id={name} {...handle} aria-invalid={error ? true : false} aria-describedby={`error-${name}`} aria-required="true" />
    </>)
}