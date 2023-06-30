import { TbSmartHome } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { CiDumbbell } from "react-icons/ci";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sticky top-0 h-screen">
      <div className="flex h-full w-20 flex-col items-center justify-center gap-6 rounded-r-3xl bg-[#121212] text-white/50">
        <Link href="/">
          <div className="grid place-items-center rounded-full ">
            <TbSmartHome size={25} />
          </div>
        </Link>
        <Link href="/workout">
          <div className="grid place-items-center">
            <HiOutlineQueueList size={24} />
          </div>
        </Link>
        <Link href="/exercise">
          <div className="grid place-items-center">
            <CiDumbbell size={25} />
          </div>
        </Link>
        <div className="grid place-items-center">
          <TbSmartHome size={25} />
        </div>
        <div className="grid place-items-center">
          <TbSmartHome size={25} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
