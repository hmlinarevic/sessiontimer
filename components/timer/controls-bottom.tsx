import { Dispatch, SetStateAction } from "react";
import Button from "../button";

type Props = {
    sessions: {
        today: number;
        setToday: Dispatch<SetStateAction<number>>;
    };
    toggleUi: {
        top: boolean;
        bottom: boolean;
        customTimerInput: boolean;
    };
    setToggleUi: Dispatch<
        SetStateAction<{
            top: boolean;
            bottom: boolean;
            customTimerInput: boolean;
        }>
    >;
};

export default function ControlsBottom({
    sessions,
    toggleUi,
    setToggleUi,
}: Props) {
    return (
        <div className="flex items-center justify-evenly pl-1.5">
            {toggleUi.bottom && (
                <div className="flex w-full items-center justify-between">
                    <span className="text-neutral-600">
                        today: {sessions.today}
                    </span>
                    <Button
                        buttonType="control"
                        onClick={() => {
                            const date = new Date().toLocaleDateString(); // e.g. "23/10/2023"
                            sessions.setToday(0);
                            localStorage.setItem(
                                "sessions",
                                JSON.stringify({ [date]: "0" }),
                            );
                            setToggleUi((prevState) => ({
                                ...prevState,
                                bottom: false,
                            }));
                        }}
                    >
                        [clear]
                    </Button>
                </div>
            )}
        </div>
    );
}
