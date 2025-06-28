
import { Navbar } from "@/components/Navbar";
interface LayoutProps {
    children : React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
    return (
        <div className="bg-[#1C2029]">
            <div className="">
                {children}
            </div>
        </div>
    )
}

export default Layout; 