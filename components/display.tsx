const formatToMinutes = (seconds: number) => {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
	`;
};

export default function Display({ secondsLeft }: { secondsLeft: number }) {
    return (
        <span className="block text-center ">
            {formatToMinutes(secondsLeft)}
        </span>
    );
}
