"use client"

import Link from "next/link";
// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";

export default function SignInPage(){
    //calls custom hook
    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();

    //have to use function to handle the sign in and sign out
    async function handleSignIn(){
        try {
            await gitHubSignIn()
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut(){
        try {
            await firebaseSignOut()
        } catch (error) {
            console.log(error);
        }
    }

    //console.dir(user);

    //"{user ? () : () }" single line if statement essentially (if user exists "user ?"" then "()" if not (:), then the second "()")
    return(
        <main className="flex flex-col items-center justify-center h-screen w-screen bg-slate-700">
            <header className="text-center mb-5 text-red-200">
                <h1 className="text-5xl mb-5">Shopping List App</h1>
                <p>
                    <Link href="/week-8/shopping-list/" className="text-lg hover:underline"> Click Here To Access Shopping List</Link>
                </p>
            </header>
            {user ? (
                //user IS logged in
                <div className="text-center text-red-200">
                    <p>Welcome {user.displayName}</p>
                    <p>{user.email}</p>
                    <img className="w-8 h-8 mx-auto" src={user.photoURL} />
                    <button onClick={handleSignOut} className="text-lg m-2 hover:underline">Sign Out</button>
                </div>
            ) : (
                //user IS NOT logged in
                <div className="text-red-200">
                    <button onClick={handleSignIn} className="text-lg m-2 hover:underline">Sign In</button>
                </div>
            ) }

        </main>

    );
}