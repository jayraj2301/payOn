"use client"

import { Button } from "./button";

interface AppbarProps {
    isAuthenticated: {
      name?: string | null;
    } | undefined;
    onSignin: () => any;
    onSignout: () => any;
  }

export const Appbar = ({
    isAuthenticated,
    onSignin,
    onSignout
}: AppbarProps)=>{
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={isAuthenticated ? onSignout : onSignin}>{isAuthenticated ? "Logout" : "Login"}</Button>
        </div>
    </div>
}