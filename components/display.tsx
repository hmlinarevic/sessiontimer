import clsx from "clsx";

const formatToMinutes = (seconds: number) => {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
	`;
};

export default function Display({
    secondsLeft,
    className,
}: {
    secondsLeft: number;
    className: string;
}) {
    return (
        <span className={clsx("block text-center", className)}>
            {formatToMinutes(secondsLeft)}
        </span>
    );
}
