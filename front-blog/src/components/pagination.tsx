import React, { useState, useEffect } from "react";

interface PaginationProps {
        showPerPage: number;
        onPaginationChange: (start: number, end: number) => void;
        total: number;
}

const Pagination: React.FC<PaginationProps> = ({
                                                       showPerPage,
                                                       onPaginationChange,
                                                       total,
                                               }) => {
        const [counter, setCounter] = useState<number>(1);

        useEffect(() => {
                const value = showPerPage * counter;
                onPaginationChange(value - showPerPage, value);
        }, [counter, showPerPage, onPaginationChange]);

        const onButtonClick = (type: "prev" | "next"): void => {
                if (type === "prev") {
                        if (counter === 1) {
                                setCounter(1);
                        } else {
                                setCounter((prevCounter) => prevCounter - 1);
                        }
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                } else if (type === "next") {
                        if (Math.ceil(total / showPerPage) === counter) {
                                setCounter(counter);
                        } else {
                                setCounter((prevCounter) => prevCounter + 1);
                        }
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
        };

        return (
            <div className="d-flex justify-content-between p70 m70">
                    <button
                        className="btn btn-outline-dark"
                        style={{ filter: "drop-shadow(16px 16px 10px black)" }}
                        onClick={() => onButtonClick("prev")}
                    >
                            Newer
                    </button>
                    <button
                        className="btn btn-outline-dark"
                        style={{ filter: "drop-shadow(16px 16px 10px black)" }}
                        onClick={() => onButtonClick("next")}
                    >
                            Older
                    </button>
            </div>
        );
};

export default Pagination;
