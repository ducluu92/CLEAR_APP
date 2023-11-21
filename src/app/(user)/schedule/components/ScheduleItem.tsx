import React from "react";

type Props = {
    item: IAppointment;
};
export default function ScheduleItem(props: Props) {
    const { item } = props;
    return (
        <div className="bg-white rounded-xl shadow-lg py-3 relative overflow-hidden pr-2">
            <div className="absolute top-3 bottom-3 w-[5px] bg-primary rounded-r-xl" />
            <div className="pl-4">
                <div className="text-primary text-[16px]">
                    {item?.test_panel}
                </div>

                <div className="card-info-body space-y-1">
                    <div className="flex flex-row items-center text-sm space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-black-text"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                        </svg>

                        <div className="text-[13px] text-black-text"> November 21, 2023 </div>
                    </div>
                    <div className="flex flex-row items-center text-sm space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-black-text"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <div className="text-[13px] text-black-text"> 08:15 AM </div>
                    </div>
                    <div className="flex flex-row items-center text-sm space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-black-text"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>

                        <div className="text-[13px] text-black-text">Las Vegas</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
