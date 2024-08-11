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
    const open = Boolean(anchorEl);

    const getInitials = (name: string): string => {
        const initials = name.match(/\b\w/g) || [];
        return (
            (initials.shift() || "") + (initials.pop() || "")
        ).toUpperCase();
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

    return (
        <>
            {" "}
            <button
                className="border rounded-full flex"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {displayName ? (
                    <p className="p-1">{getInitials(displayName)}</p>
                ) : (
                    <AccountCircleIcon />
                )}
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
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
