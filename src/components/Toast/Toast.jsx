import React, { useRef, useEffect } from 'react';
import "./Toast.css"

import {
    SuccessIcon,
    FailureIcon,
    CloseIcon,
} from "../Icons/Icons";
import { createPortal } from 'react-dom';

const Toast = ({ message, type, onClose }) => {
    const iconMap = {
        success: <SuccessIcon />,
        failure: <FailureIcon />,
    };

    const toastIcon = iconMap[type] || null;

    return (
        <>
            <div className={`toast toast--${type}`} role="alert">
                <div className="toast-message">
                    {toastIcon && (
                        <div className="icon--lg icon--thumb">{toastIcon}</div>
                    )}
                    <p>{message}</p>
                </div>
                <button className="toast-close-btn" onClick={onClose}>
                    <span className="icon">
                        <CloseIcon />
                    </span>
                </button>
            </div>
        </>
    )
};

const ToastList = ({ data, position, removeToast }) => {
    const listRef = useRef(null);

    const handleScrolling = (el) => {
        const isTopPosition = ["top-left", "top-right"].includes(position);
        if (isTopPosition) {
            el?.scrollTo(0, el.scrollHeight);
        } else {
            el?.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        handleScrolling(listRef.current);
    }, [position, data]);

    const sortedData = position.includes("bottom")
        ? [...data].reverse()
        : [...data];

    return (
                sortedData.length > 0 && (
                    <div
                        className={`toast-list toast-list--${position}`}
                        aria-live="assertive"
                        ref={listRef}
                    >
                        {sortedData.map((toast) => (
                            <Toast
                                key={toast.id}
                                message={toast.message}
                                type={toast.type}
                                onClose={() => removeToast(toast.id)}
                            />
                        ))}
                    </div>
                )
    );
};


export { Toast, ToastList };

