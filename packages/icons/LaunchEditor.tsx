import { FC, memo } from "react";

import { SvgIcon, SvgIconProps } from "../ui/src/components/atoms/Icon/Icon";

type Props = SvgIconProps;

const LaunchEditor: FC<Props> = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d="M22.1876 13.4532L20.6968 12.6209C20.743 12.2493 20.8118 11.8845 20.8118 11.5003C20.8118 11.1178 20.743 10.7508 20.6968 10.3783L22.1876 9.54801C22.5585 9.33863 22.8299 8.9962 22.9447 8.59358C23.0576 8.18868 22.995 7.76221 22.7816 7.40167L20.8062 4.09861C20.5067 3.59422 19.9615 3.31266 19.4006 3.31266C19.1252 3.31266 18.8466 3.38059 18.5919 3.5231L17.1085 4.3514C16.487 3.8927 15.8236 3.48434 15.0959 3.1876V1.57216C15.0959 0.702837 14.367 0 13.4701 0H9.52544C8.62791 0 7.90385 0.702704 7.90385 1.57216V3.1876C7.17498 3.48447 6.50999 3.8927 5.8892 4.3514L4.40722 3.5211C4.1594 3.38298 3.87991 3.31279 3.59988 3.31279C3.45807 3.31279 3.31571 3.33104 3.17445 3.3666C2.76072 3.47355 2.40414 3.7358 2.18949 4.09674L0.216144 7.40167C-0.228421 8.15392 0.0337191 9.11488 0.812155 9.54801L2.30101 10.3783C2.25406 10.7508 2.18674 11.1178 2.18674 11.5003C2.18674 11.8845 2.25406 12.2493 2.30101 12.6199L0.812155 13.4512C0.0337191 13.8841 -0.228558 14.8462 0.216144 15.5976L2.18949 18.9025C2.40427 19.262 2.76072 19.5258 3.17445 19.6336C3.31419 19.6701 3.456 19.6886 3.5963 19.6886C3.87923 19.6886 4.15803 19.6152 4.40722 19.4748L5.88562 18.6489C6.50986 19.1099 7.17484 19.5172 7.90372 19.8116V21.43C7.90372 22.2973 8.62791 23 9.5253 23H13.4699C14.3669 23 15.0958 22.2973 15.0958 21.43V19.8116C15.8262 19.517 16.487 19.1097 17.1084 18.6489L18.5917 19.4748C18.8395 19.6153 19.1203 19.6886 19.4018 19.6886C19.5423 19.6886 19.6834 19.6701 19.8204 19.6336C20.2355 19.5257 20.594 19.262 20.806 18.9025L22.7814 15.5976C23.2304 14.8481 22.9626 13.8863 22.1876 13.4532ZM11.4967 15.832C9.0258 15.832 7.02202 13.8917 7.02202 11.5003C7.02202 9.10848 9.0258 7.16833 11.4967 7.16833C13.9733 7.16833 15.9769 9.10848 15.9769 11.5003C15.9769 13.8917 13.9734 15.832 11.4967 15.832Z"
                fill="#A5A5A5"
            />
            <circle cx="18.4917" cy="16.6863" r="5.86275" fill="#292929" />
            <path
                d="M19.915 16.3973L16.6175 14.1399C16.4652 14.0356 16.3118 13.9803 16.1842 13.9803C15.9377 13.9803 15.7852 14.1782 15.7852 14.5095V19.3885C15.7852 19.7193 15.9375 19.9168 16.1835 19.9168C16.3112 19.9168 16.4622 19.8616 16.6148 19.7569L19.9138 17.4996C20.126 17.3541 20.2435 17.1585 20.2435 16.9483C20.2435 16.7383 20.1274 16.5427 19.915 16.3973Z"
                fill="#A5A5A5"
            />
            <rect
                x="20.6084"
                y="13.9803"
                width="1.48412"
                height="5.93648"
                rx="0.742059"
                fill="#A5A5A5"
            />
        </SvgIcon>
    );
};

export default memo(LaunchEditor);
