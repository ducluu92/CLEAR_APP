import React, { useCallback } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { PATH_ORGANIZATION } from "../Organization";
type Props = {
    item: IOrganizationUser;
};
export default function OrganizationUserItem(props: Props) {
    const { item } = props;
    const router = useRouter();
    const handleShowDetail = useCallback(() => {
        router.push(`${PATH_ORGANIZATION}/${item.organization_id}/${item.id}`);
    }, []);
    return (
        <div
            className="bg-white rounded-xl shadow-lg py-3 relative overflow-hidden pr-2 cursor-pointer"
            onClick={handleShowDetail}
        >
            <div className="absolute top-3 bottom-3 w-[5px] bg-primary rounded-r-xl" />
            <div className="pl-4 flex flex-row justify-between items-center">
                <div>
                    <div className="flex flex-row items-center gap-1">
                        <UserOutlined
                            className={
                                !!item?.invitation_accepted
                                    ? "text-pink-500"
                                    : "text-yellow-400"
                            }
                        />
                        <div className="text-primary text-[16px]">
                            {item?.name} ({item?.email})
                        </div>
                    </div>
                    <div className="card-info-body space-y-1">
                        <div className="flex flex-col text-sm">

                            <div className="text-[13px] text-gray-text">
                                Role: {item?.organization_role?.name}
                            </div>
                        </div>
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </div>
        </div>
    );
}
