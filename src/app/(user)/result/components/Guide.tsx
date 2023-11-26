import React from "react";
import { PlayCircleFilled } from "@ant-design/icons";
type Guide = {
    title: string;
    link: string;
};
const guides: Guide[] = [
    {
        title: "How performers can share their results with my organization",
        link: "https://www.getclrd.com/faq?questionId=df8a7d10-835e-4d9c-9f92-c5a8d0ad4cc2&appDefId=14c92d28-031e-7910-c9a8-a670011e062d",
    },
    {
        title: "How to revoke access to my results",
        link: "https://www.getclrd.com/faq?questionId=f54fba12-608a-4847-9f02-d4b30c80d0c4&appDefId=14c92d28-031e-7910-c9a8-a670011e062d",
    },
    {
        title: "How to share my clearance with other performers",
        link: "https://www.getclrd.com/faq?questionId=435ea06b-371f-4039-8269-2a78660693fd&appDefId=14c92d28-031e-7910-c9a8-a670011e062d",
    },
    {
        title: "How to validate a CLEAR results by scanning a QR code",
        link: "https://www.getclrd.com/faq?questionId=435ea06b-371f-4039-8269-2a78660693fd&appDefId=14c92d28-031e-7910-c9a8-a670011e062d",
    },
];
export default function Guide() {
    return (
        <div className="grid grid-cols-4 gap-2 fixed bottom-20 max-w-[480px] py-2 bg-white">
            {guides.map((item) => (
                <a
                    key={item.title}
                    className="flex flex-col items-center gap-1 text-primary"
                    href={item.link}
                >
                    <PlayCircleFilled className="text-2xl" />
                    <p className="text-xs text-primary text-center">
                        {item.title}
                    </p>
                </a>
            ))}
        </div>
    );
}
