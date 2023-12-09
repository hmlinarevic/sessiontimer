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
                "p-1.5",
                props.className,
                props.buttonType === "control" ? "hover:bg-orange-400" : "",
                props.isStart
                    ? "hover:bg-transparent hover:font-normal hover:text-inherit"
                    : "hover:bg-emerald-400 hover:font-bold hover:text-black",
            )}
            onClick={props.onClick}
            disabled={props.isStart}
        >
            {props.children}
        </button>
    );
}
