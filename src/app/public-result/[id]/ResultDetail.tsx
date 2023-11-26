"use client";
import { Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PDFViewer from "@/components/Viewer/PDFViewer";
import nProgress from "nprogress";
import ResultApi from "@/app/(user)/result/services/ResultApi";

export default function ResultDetail() {
    const params = useParams();
    const [pdfUrl, setPdfUrl] = useState("");
    const getResult = () => {
        nProgress.start();
        ResultApi.viewResultPublic(+params.id)
            .then((res: any) => {
                console.log(123, res)
                // var blob = new Blob(res, { type: "application/pdf" });
                var blobURL = URL.createObjectURL(res);
                setPdfUrl(blobURL);
            })
            .catch((err) => {
                message.error(err?.message || "Error");
                console.log(err)
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
            {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : <Skeleton active />}
        </div>
    );
}
