import './icon.css';
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";

const CloseIcon = () => (
    <IoCloseCircle />
);

const SuccessIcon = () => (
    <FaCheckCircle />
);

const FailureIcon = () => (
    <FaExclamationCircle />
);

const WarningIcon = () => (
    <FaExclamationTriangle />
);

export { CloseIcon, SuccessIcon, FailureIcon, WarningIcon };