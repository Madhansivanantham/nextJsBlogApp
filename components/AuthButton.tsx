"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <img
                    src={session.user?.image || ""}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                />
                <p>Welcome {session.user?.name}</p>


                <button
                    className="bg-black text-white px-4 py-1.5 rounded-md text-sm"
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <></>
        // <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm" onClick={() =>
        //     signIn("google", {
        //         prompt: "consent",
        //     })
        // }>
        //     Login with Google
        // </button>
    );
}