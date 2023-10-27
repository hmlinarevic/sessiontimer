import clsx from "clsx";

type Props = {
    label: string;
    className?: string;
    onClick?: () => void;
};

export default function Button(props: Props) {
    return (
        <button
            className={clsx(
                "p-1.5 hover:bg-black hover:text-white",
                props.className,
            )}
            onClick={props.onClick}
        >
            [{props.label}]
        </button>
    );
}
