import { SearchResult, UserInfo } from "./spotify";

export interface User {
    info: UserInfo;
    recentResults: SearchResult[];
}
