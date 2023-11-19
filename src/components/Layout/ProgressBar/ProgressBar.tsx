"use client";
import React, { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";

export default function ProgressBar() {
    NProgress.configure({ showSpinner: false });

    useEffect(() => {
        console.log("top ");
        const start = () => {
            console.log("1");
            NProgress.start();
        };
        const end = () => {
            console.log("2");
            NProgress.done();
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return null;
}
