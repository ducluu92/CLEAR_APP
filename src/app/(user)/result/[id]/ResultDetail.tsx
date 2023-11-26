"use client";
import { Button, Input, Skeleton, message } from "antd";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons";
import { PATH_RESULT } from "../Result";
import { useParams, useRouter } from "next/navigation";
import nProgress from "nprogress";
import ResultApi from "../services/ResultApi";
import PDFViewer from "@/components/Viewer/PDFViewer";
export default function ResultDetail() {
    const params = useParams();
    const [pdfUrl, setPdfUrl] = useState("");
    const getResult = () => {
        nProgress.start();
        ResultApi.viewResult(+params.id)
            .then((res: any) => {
                console.log(123, res);
                // var blob = new Blob(res, { type: "application/pdf" });
                var blobURL = URL.createObjectURL(res);
                setPdfUrl(blobURL);
            })
            .catch((err) => {
                message.error(err?.message || "Error");
                console.log(err);
            })
            .finally(() => {
                nProgress.done();
            });
    };
    useEffect(() => {
        if (params.id) {
            getResult();
        }
    }, [params]);
    return (
        <div className="space-y-4">
            <div className="flex flex-row justify-between">
                <Link href={PATH_RESULT}>
                    <Button
                        className="!text-xs !p-0 text-primary"
                        size="small"
                        type="link"
                        icon={<ArrowLeftOutlined />}
                    >
                        Back to result
                    </Button>
                </Link>
                <Button
                    onClick={() => {
                        window.open(pdfUrl);
                    }}
                    className="!text-xs"
                    size="small"
                    type="link"
                    icon={<ExportOutlined />}
                >
                    Open
                </Button>
            </div>

            <div className="flex">
                {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : <Skeleton active />}
            </div>
        </div>
    );
}
