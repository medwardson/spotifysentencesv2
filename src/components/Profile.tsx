import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem } from "@mui/material";
import { clearUserInfo } from "@/lib/store/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { displayName } = useAppSelector((state) => state.user.info);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const getInitials = (name: string): string | null => {
        const initials = name.match(/\b\w/g) || [];
        const result =
            (initials.shift() || "") + (initials.pop() || "").toUpperCase();

        if (result.length > 1) return result;
        return null;
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteCookie = () => {
        Cookies.remove("access_token");
        dispatch(clearUserInfo());
        router.push("/");
    };

    const open = Boolean(anchorEl);
    const initials = getInitials(displayName ?? "");

    return (
        <>
            {" "}
            <button className="border rounded-full flex" onClick={handleClick}>
                {initials ? (
                    <p className="p-1">{initials}</p>
                ) : (
                    <AccountCircleIcon />
                )}
            </button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem dense onClick={handleClose}>
                    {" "}
                    <button
                        className="flex items-center"
                        onClick={deleteCookie}
                    >
                        <LogoutIcon className="mr-2" />
                        <p>Logout</p>
                    </button>
                </MenuItem>
            </Menu>
        </>
    );
};
