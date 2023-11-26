"use client";
import BaseConstant from "@/constants/BaseConstant";
import { QRCode } from "antd";
import React, { useRef } from "react";
import ShareResultPopup from "./ShareResultPopup";

export default function QRGuide() {
    const resultModalRef = useRef<ModalRefProp>(null);
    return (
        <>
            <div
                onClick={() => {
                    resultModalRef?.current?.present();
                }}
                className="rounded-xl shadow-lg p-2 flex flex-row justify-center items-center gap-2 cursor-pointer"
            >
                <QRCode size={100} value={`${BaseConstant.API_ENDPOINT}`} />
                <div className="space-y-2">
                    <span className="text-sm text-primary">
                        Rather keep it private?
                    </span>
                    <p className="text-xs text-primary">
                        Click here to get a QR code that anyone can scan to
                        verify your results withot access to your personal
                    </p>
                </div>
            </div>
            <ShareResultPopup item={{}} ref={resultModalRef} />
        </>
    );
}
