import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
    className?: string;
    onClick?: () => void;
    children?: ReactNode
    buttonType: string
};

export default function Button(props: Props) {
    return (
        <button
            className={clsx(
                "p-1.5 dark:hover:bg-violet-400 hover:bg-black hover:text-white",
                props.className,
                props.buttonType === "main" ? "hover:bg-transparent" : ""
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
