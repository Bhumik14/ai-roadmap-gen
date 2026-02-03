import { Outlet } from 'react-router-dom'
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function Layout () {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 py-8">
                <div className="app-container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}