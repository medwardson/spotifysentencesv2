import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export function useAuth() {
    const { id } = useAppSelector((state) => state.user.info);
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            router.push("/loading");
        }
    }, [id, router]);

    return { id };
}

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const AuthComponent: React.FC<P> = (props) => {
        const { id } = useAuth();

        if (!id) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    AuthComponent.displayName = `withAuth(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return AuthComponent;
};

export default withAuth;
