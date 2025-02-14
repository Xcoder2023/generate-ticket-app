"use client";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const TicketConfirmation = () => {
  const [name, setName] = useState("User Name");
  const [email, setEmail] = useState("user@example.com");
  const [ticketCount, setTicketCount] = useState("0");
  const [project, setProject] = useState("fest25");
  const [selectedTicket, setSelectedTicket] = useState("ticket");
  const [profileImage, setProfileImage] = useState("");
  const router = useRouter();
  const ticketRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const ticketCount = localStorage.getItem("ticketCount");
    const selectedTicket = localStorage.getItem("selectedTicket");
    const project = localStorage.getItem("project");
    const profileImage = localStorage.getItem("imageUrl");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (ticketCount) setTicketCount(ticketCount);
    if (project) setProject(project);
    if (selectedTicket) setSelectedTicket(selectedTicket);
    if (profileImage) setProfileImage(profileImage);
  }, []);

  const qrValue = `Email: ${email} | Name: ${name} | Project: ${project} | Ticket Type: ${selectedTicket} | Ticket No: ${ticketCount}`;

  const bookAnotherTicket = () => {
    router.push("/");
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `Ticket-${name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error capturing ticket:", error);
    }
  };
  return (
    <div className="w-[100%] max-w-2xl mx-auto text-white p-6 rounded-[20px] border border-borderColor my-6 ">
      <div className="flex justify-between border-b-2 border-borderColor my-5">
        <div className="border-b-2 border-[#24A0B5] relative top-[2px] w-[35%]">
          <h2 className="text-xl font-bold">Ready</h2>
        </div>
        <p className="text-sm text-center mb-4">Step 3/3</p>
      </div>
      <div className="text-center flex flex-col items-center">
        {/* Ticket Confirmation Message */}
        <div className="flex flex-col gap-5 my-5">
          <p className=" font-bold text-[20px]">Your Ticket is Booked!</p>
          <p className="text-sm text-gray-300 ">
            Please download or check your email for a copy.
          </p>
        </div>

        <section
          ref={ticketRef}
          className="flex md:w-[500px] border-2 rounded-[20px]"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="bg-[#0E464F] text-white rounded-tl-[20px] flex md:w-[360px]  overflow-hidden border-r-2">
              <div className="p-4 bg-whit">
                <QRCodeCanvas
                  value={qrValue}
                  size={100}
                  className="bg-white p-1 rounded-[4px]"
                  aria-label="QR Code for Ticket"
                />

                <div className="md:hidden  items-center relative top-4  left-5 rig rounded-[10px]">
                  {profileImage && profileImage !== "" && (
                    <Image
                      src={profileImage}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-[10px]"
                    />
                  )}
                </div>
              </div>

              <div className="p-4 flex-1">
                <div className="flex items-center">
                  <p className="md:text-[28px] font-bold italic text-white">
                    Techember Fest &apos;25
                  </p>

                  <div className="hidden md:block  items-center relative  md:left-2 rig rounded-[20px]">
                    {profileImage && profileImage !== "" && (
                      <Image
                        src={profileImage}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-[10px]"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-gray-300 text-[12px] flex items-center mt-1">
                    📍 04 Rumens Road, Ikoyi, Lagos
                  </p>
                  <p className="text-gray-300 text-[12px] flex items-center ">
                    📅 March 15, 2025 | 7:00 PM
                  </p>
                </div>
              </div>
            </div>
            <div className=" text-start flex w-full p-2 rounded-bl-[20px] border-r-2 bg-[#617d87]">
              <p className="text-sm font-bold text-[#0E464F]">
                Ticket for {ticketCount} entry only
              </p>
            </div>
          </div>

          <section className="flex justify-center items-center ">
            <div className="flex flex-col items-center gap-2 rounded-md">
              {/* Steps */}
              {[...Array(20)].map((_, index) => (
                <div key={index} className="w-[18px] h-[2px] bg-white"></div>
              ))}
            </div>
          </section>

          {/* Side Ticket */}
          <div className="bg-[#0E464F] text-white text-sm flex items-center rounded-r-[20px] border-l-2 w-full ">
            <div className=" md:-rotate-90 text-[12px] w-full ">
              <p> Techember Fest &apos;25</p>
              <p className="mt-2 text-[10px] font-bold">User Name: {name}</p>

              <Image
                src="/images/reg2.svg"
                alt="Event logo"
                width={24}
                height={24}
                className="relative md:right-10 md:bottom-10 "
              />
            </div>
            <div>
              <Image
                src="/images/lines.svg"
                alt="Decoration"
                width={12}
                height={24}
                className="relative md:right-5 right-2"
              />
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col md:flex-row justify-center md:bg-[#041E23] items-center gap-5 w-full border-0  md:border md:border-[#0E464F] rounded-full">
          <button
            title="click to download your ticket"
            onClick={downloadTicket}
            className="p-3 rounded-md border border-[#24A0B5] text-[#24A0B5] w-full md:w-[40%] text-sm hover:underline"
            aria-label="Download Ticket"
            onKeyDown={(e) => e.key === "Enter" && downloadTicket()}
          >
            Download Ticket
          </button>
          <button
            onClick={bookAnotherTicket}
            className="p-3 rounded-md bg-buttonBg text-white w-full md:w-[40%] text-sm hover:underline"
            aria-label="Book Another Ticket"
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;
