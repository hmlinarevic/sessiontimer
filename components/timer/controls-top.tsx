import { Dispatch, SetStateAction } from "react";

import Button from "../button";

type Props = {
    timers: {
        focus: number;
        work: number;
    };
    setTimer: Dispatch<SetStateAction<number>>;
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
    handleCustomTimer: (e: any) => void;
};

export default function ControlsTop({
    timers,
    toggleUi,
    setTimer,
    setToggleUi,
    handleCustomTimer,
}: Props) {
    return (
        <>
            <span className="text-neutral-500">timer:</span>
            <Button
                buttonType="control"
                className="text-orange-400"
                onClick={() => {
                    setTimer(timers.focus);
                    setToggleUi((prevState) => ({
                        ...prevState,
                        top: false,
                    }));
                }}
            >
                [25]
            </Button>
            <Button
                buttonType="control"
                className="text-orange-400"
                onClick={() => {
                    setTimer(timers.work);
                    setToggleUi((prevState) => ({
                        ...prevState,
                        top: false,
                    }));
                }}
            >
                [45]
            </Button>
            {toggleUi.customTimerInput ? (
                <input
                    type="text"
                    maxLength={2}
                    autoFocus
                    className="w-[88.8px]  bg-transparent text-center outline-none "
                    placeholder="minutes"
                    onBlur={handleCustomTimer}
                    onKeyDown={handleCustomTimer}
                />
            ) : (
                <Button
                    className="text-orange-400"
                    buttonType="control"
                    onClick={() =>
                        setToggleUi((prevState) => ({
                            ...prevState,
                            customTimerInput: true,
                        }))
                    }
                >
                    [custom]
                </Button>
            )}
        </>
    );
}
