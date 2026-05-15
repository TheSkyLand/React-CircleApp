import React from "react";

interface CircleButtonProps {
    firstYear: (value: number) => void;
    secondYear: (value: number) => void;
    backCounter: (value: number) => void;
    backnum: number;
    num: number;
    label: string;
}

const CircleButton = (props: CircleButtonProps) => {
    const handleClick = () => {
        props.firstYear(props.num);
        props.secondYear(props.num);
        props.backCounter(props.num);
    };

    const isActive = props.num === props.backnum;

    return (
        <div
            className={isActive ? "main-square-circle-buttons-active" : "main-square-circle-buttons-single"}
            onClick={handleClick}
        >
            <div className="main-square-circle-buttons-single-digit">
                {props.num}
            </div>
            <div className="main-square-circle-buttons-single-label">
                {props.label}
            </div>
        </div>
    );
};

export default CircleButton;