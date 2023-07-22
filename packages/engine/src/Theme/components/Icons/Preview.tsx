import { FC, memo } from "react";

const PreviewUI: FC = () => {
    return (
        <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.1927 11.2724L8.12375 7.80214C7.88965 7.64176 7.65379 7.55688 7.45773 7.55688C7.0787 7.55688 6.84424 7.86108 6.84424 8.37027V15.8704C6.84424 16.379 7.07841 16.6826 7.45655 16.6826C7.6529 16.6826 7.885 16.5977 8.11961 16.4369L13.191 12.9667C13.5171 12.7432 13.6977 12.4424 13.6977 12.1194C13.6978 11.7965 13.5193 11.4958 13.1927 11.2724Z"
                fill="currentColor"
            />
            <rect
                x="14.2534"
                y="7.55688"
                width="2.28144"
                height="9.12575"
                rx="1"
                fill="currentColor"
            />
        </svg>
    );
};

export default memo(PreviewUI);
