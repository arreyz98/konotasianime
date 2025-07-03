import Image from "next/image";
const DataNotFound = () => {
    return(
            <div className="flex items-center justify-center min-h-screen px-2">
                <div className="text-center">
                <Image src={"https://i0.hdslb.com/bfs/static/laputa-search/assets/nodata.67f7a1c9.png"} alt="" width={400} height={400} />
                <p className="text-2xl font-bold text-[#25388C] mt-4">Data tidak ditemukan !</p>
                </div>
            </div>
    )
}

export default DataNotFound;