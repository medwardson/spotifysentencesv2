"use client";

import { redirect } from "next/navigation";
import noBgLogo from "../../public/no-bg-logo.svg";

export default function Header() {
  return (
    <div className="flex justify-center" onClick={() => redirect("/")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-8/12 mt-8" src={noBgLogo.src} alt="Logo" />
    </div>
  );
}
