import Button from "../button";
import Display from "../display";

type Props = {
    secondsLeft: number;
    isStart: boolean;
    isStop: boolean;
    handleOptions: () => void;
    handleStart: () => void;
    handleStop: () => void;
    handleResume: () => void;
    handleNew: () => void;
    handleDisplay: () => void;
};

export default function ControlsMiddle({
    secondsLeft,
    isStart,
    isStop,
    handleOptions,
    handleStart,
    handleStop,
    handleResume,
    handleNew,
    handleDisplay,
}: Props) {
    return (
        <div className="flex items-center justify-between">
            <Button buttonType="main" onClick={handleOptions}>[sessions]</Button>
            {!isStart ? (
                <Button buttonType="main" onClick={handleStart}>[start]</Button>
            ) : (
                !isStop && <Button buttonType="main" onClick={handleStop}>[stop]</Button>
            )}
            {isStop && <Button buttonType="main" onClick={handleResume}>[resume]</Button>}
            {isStop && <Button buttonType="main" onClick={handleNew}>[new]</Button>}
            <Button buttonType="display" onClick={handleDisplay} isStart={isStart}>
                <Display secondsLeft={secondsLeft} isStart={isStart} />
            </Button>
        </div>
    );
}
