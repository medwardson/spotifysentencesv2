"use client";

import noBgLogo from "../../public/no-bg-logo.svg";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Profile } from "./Profile";

interface HeaderProps {
    back?: boolean;
    logout?: boolean;
}

export default function Header({ back, logout }: HeaderProps) {
    const router = useRouter();

    return (
        <div className="grid grid-cols-6 mt-8 text-white">
            <div className="col-span-1 flex justify-center">
                {back && (
                    <button onClick={router.back}>
                        <ArrowBackIosIcon />
                    </button>
                )}
            </div>
            <div className="col-span-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    onClick={() => router.push("/home")}
                    className="w-8/12 cursor-pointer"
                    src={noBgLogo.src}
                    alt="Logo"
                />
            </div>
            <div className="col-span-1 flex items-center">
                {logout && <Profile />}
            </div>
        </div>
    );
}
