import DateTimeUtils from "@/utils/DateTimeUtils";
import { Button } from "antd";
import Image from "next/image";
import {
    QrcodeOutlined,
    QuestionCircleFilled,
    CalendarOutlined,
    RightOutlined,
    PhoneOutlined,
    MailOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import ButtonFill from "@/components/Button/ButtonFill";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col space-y-16">
            <div className="flex flex-col space-y-2 items-center mt-24">
                <Image
                    width={60}
                    height={76}
                    src={"/drop-logo.png"}
                    alt="Clear"
                />
                <Image
                    width={200}
                    height={60}
                    src={"/clear-text.png"}
                    alt="Clear"
                />
            </div>

            <div className="flex flex-col space-y-4 items-center">
                <h2 className="text-primary text-2xl">Welcome</h2>
                <ButtonFill
                    href="/register"
                    className="bg-gradient-to-r from-primary from-30% to-secondary mt-2 !px-14 !py-3 !rounded-3xl "
                    labelClassName="!text-xl"
                    title="Create Your Account"
                    showIcon={false}
                />
            </div>

            <div className="flex flex-col space-y-4 items-center">
                <p className="text-gray-500">Already have an account?</p>
                <Link className="text-secondary" href="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}
