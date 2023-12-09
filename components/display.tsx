import clsx from "clsx";

const formatToMinutes = (seconds: number) => {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    const minutesLeftStr = `${
        minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
    }`;
    const secondsLeftStr = `${
        secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
    }`;

    return `${minutesLeftStr}:${secondsLeftStr}`;
};

export default function Display({
    secondsLeft,
    className,
    isStart,
}: {
    secondsLeft: number;
    className?: string;
    isStart: boolean;
}) {
    return (
        <span className={clsx("block text-center  ", className)}>
            <span
                className={clsx(
                    "transition-opacity duration-500",
                    isStart ? "opacity-0" : "",
                )}
            >
                [
            </span>
            {formatToMinutes(secondsLeft)}
            <span
                className={clsx(
                    "transition-opacity duration-500",
                    isStart ? "opacity-0" : "",
                )}
            >
                ]
            </span>
        </span>
    );
}
