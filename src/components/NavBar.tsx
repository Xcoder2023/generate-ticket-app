import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-[#0F172A text-[#B3B3B3] py-4 px-6 flex justify-between items-center border border-borderColor rounded-full w-[80%] mx-auto my-8">
     <div className="flex justify-center items-center">
     <Image
        src="/images/logo2.svg"
        alt="event logo"
        width={64}
        height={64}
        className=""
      />
     </div>
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:underline">Events</Link>
        <Link href="/" className="hover:underline">My Tickets</Link>
        <Link href="/" className="hover:underline">About Project</Link>
      </div>
      <button type="button" className="bg-white text-black px-4 py-2 rounded-md text-sm" aria-label="get ticket button">
        GET TICKETS →
      </button>
    </nav>
  );
};

export default Navbar;
