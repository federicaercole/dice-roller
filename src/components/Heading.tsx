import { useEffect, useRef } from "react";

export function Heading({ children, className }: { children: React.ReactNode, className?: string }) {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        headingRef.current?.focus();
    }, [])

    return <h1 ref={headingRef} className={className} tabIndex={-1}>{children}</h1>;
}