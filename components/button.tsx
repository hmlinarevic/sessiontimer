import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
    buttonType?: string;
    isStart?: boolean;
};

export default function Button(props: Props) {
    return (
        <button
            className={clsx(
                `p-1.5 hover:text-black`,
                props.className,
                props.buttonType === "control"
                    ? "text-violet-400 hover:bg-violet-500"
                    : "",
                props.buttonType === "main"
                    ? "text-emerald-400 hover:bg-emerald-500"
                    : "",
                props.buttonType === "display"
                    ? "text-emerald-400 hover:bg-emerald-500"
                    : "",

                props.buttonType === "display" && props.isStart
                    ? "hover:bg-opacity-0 hover:text-emerald-400"
                    : "",
            )}
            onClick={props.onClick}
            disabled={props.isStart}
        >
            {props.children}
        </button>
    );
}
