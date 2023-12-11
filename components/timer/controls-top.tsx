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
        <div className="flex items-center justify-between pl-1.5">
            {toggleUi.top && (
                <>
                    <span className="text-neutral-600">timer:</span>
                    <Button
                        buttonType="control"
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
                            className="w-[88.8px]  bg-transparent text-violet-500 text-center outline-none placeholder-violet-400 placeholder-opacity-40"
                            placeholder="minutes"
                            onBlur={handleCustomTimer}
                            onKeyDown={handleCustomTimer}
                        />
                    ) : (
                        <Button
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
            )}
        </div>
    );
}
