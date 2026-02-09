import './toast.css';
import { SuccessIcon, FailureIcon, WarningIcon, CloseIcon } from './icon/icon';

export default function Toast({ message, type, onClose }:
    { message: string, type: 'success' | 'failure' | 'warning', onClose: () => void }) {

    const iconMap = {
        success: <SuccessIcon />,
        failure: <FailureIcon />,
        warning: <WarningIcon />
    };

    const toastIcon = iconMap[type] || null;

    return (
        <div className={`toast toast-${type}`} role="alert">
            <div className="toast-message">
                {toastIcon && (
                    <div className="icon icon--lg icon--thumb">{toastIcon}</div>
                )}
                <p>{message}</p>
            </div>
            <button className="toast-close-btn" onClick={onClose}>
                <span className="icon">
                    <CloseIcon />
                </span>
            </button>
        </div>
    );
}