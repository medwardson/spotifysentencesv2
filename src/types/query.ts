import { Mode } from "@/components/search/options/Options";

export interface Query {
    title: string;
    sentence: string;
    mode: Mode;
    isFetching: boolean;
}
