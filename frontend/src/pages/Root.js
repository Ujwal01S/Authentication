import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function Root () {
    return (
        <>
            <MainNavigation />
            <main>
                < Outlet />
            </main>
        </>
    );
};

export default Root;