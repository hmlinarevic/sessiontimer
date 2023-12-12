import { Dispatch, SetStateAction } from "react";
import Button from "../button";

type Props = {
    storage: {
        sessionsToday: number;
        setSessionsToday: Dispatch<SetStateAction<number>>;
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

export default function ControlsBottom({ storage, toggleUi }: Props) {
    const handleClearClick = () => {
        storage.setSessionsToday(0);
    };

    return (
        <div className="flex items-center justify-evenly pl-1.5">
            {toggleUi.bottom && (
                <div className="flex w-full items-center justify-between">
                    <span className="text-neutral-600">
                        today: {storage.sessionsToday}
                    </span>
                    <Button buttonType="control" onClick={handleClearClick}>
                        [clear]
                    </Button>
                </div>
            )}
        </div>
    );
}
