import { SetStateAction } from "react";

const autoCloseDuration = 5;

export type Toast = {
    id: string;
    message: string;
    type: "success" | "failure" | "warning";
};

export function setToast(toast: Toast, setToasts: (value: SetStateAction<Toast[]>) => void) {
    setToasts((prevToasts) => [...prevToasts, toast]);

    setTimeout(() => {
        removeToast(toast.id, setToasts);
    }, autoCloseDuration * 1000);
}

export function removeToast(toastId: string, setToasts: (value: SetStateAction<Toast[]>) => void) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
}