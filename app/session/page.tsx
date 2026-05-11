"use client"
import { signIn } from "next-auth/react"

const page = () => {
    return (
        <div>
            <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                />
                <span className="font-medium">Continue with Google</span>
            </button>
        </div>
    )
}

export default page