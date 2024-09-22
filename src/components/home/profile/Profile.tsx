import styles from "./Profile.module.scss";

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { displayName, profilePictureUrl } = useAppSelector(
        (state) => state.user.info
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const deleteCookie = () => {
        Cookies.remove("access_token");
        dispatch(clearUserInfo());
        router.push("/");
    };

    return (
        <div className={styles.userInfo}>
            <span>Hi, {displayName}!</span>
            <a onClick={handleClick}>
                <img className={styles.pfp} src={profilePictureUrl} />
            </a>
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
        </div>
    );
};
