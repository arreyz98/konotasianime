"use client"

const Header = () => {
    return(
        <header className="flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5 ">
            <div>
                <h2 className="text-2xl font-bold text-[#25388C]">
                    Konotasianime Web
                </h2>
                <p className="text-base text-slate-500">
                    Monitor all of your post here
                </p>

                {/* <p>search</p> */}
            </div>
        </header>
    )
}

export default Header;