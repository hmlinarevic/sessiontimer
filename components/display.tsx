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
}: {
    secondsLeft: number;
    className?: string;
}) {
    return (
        <span className={clsx("block text-center", className)}>
            [{formatToMinutes(secondsLeft)}]
        </span>
    );
}
