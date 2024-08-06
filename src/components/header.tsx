"use client";

import { redirect } from "next/navigation";
import noBgLogo from "../../public/no-bg-logo.svg";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    return (
        <div className="flex justify-center" onClick={() => redirect("/")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                onClick={() => router.push("/home")}
                className="w-8/12 mt-8 cursor-pointer"
                src={noBgLogo.src}
                alt="Logo"
            />
        </div>
    );
}
