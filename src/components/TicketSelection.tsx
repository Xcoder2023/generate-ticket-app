"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TicketSelection = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [numTickets, setNumTickets] = useState<number>(1);
  const [errors, setErrors] = useState<{
    ticketType?: string;
    ticketCount?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { ticketType?: string; ticketCount?: string } = {};

    if (!selectedType) {
      newErrors.ticketType = "Please select a ticket type.";
    }

    if (!numTickets || numTickets < 1) {
      newErrors.ticketCount = "Please select at least one ticket.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (!validateForm()) return;

    localStorage.setItem("selectedTicket", selectedType!);
    localStorage.setItem("ticketCount", numTickets.toString());

    router.push("/details");
  };

  const handleCancelClick = () => {
    router.push("/"); // Navigate to home or previous step
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "Enter") {
        handleNextClick();
      } else if (event.key === "Escape") {
        handleCancelClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedType, numTickets]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-[#041E23] border border-borderColor text-textPrimary p-6 rounded-[20px] shadow-lg max-w-lg w-full md:max-w-2xl">
        <div className="flex justify-between border-b-2 border-borderColor my-5">
          <div className="border-b-2 border-[#24A0B5] relative top-[2px] w-[35%]">
            <h2 className="text-xl font-bold">Ticket Selection</h2>
          </div>
          <p className="text-sm text-center mb-4">Step 1/3</p>
        </div>

        <div className="rounded-[20px] p-5 bg-[#08252B] border border-borderColor">
          <div className="bg-[#041E23] border border-borderColor p-4 rounded-[20px] text-center flex flex-col gap-5">
            <h3 className="text-lg font-bold">Techember Fest ‘25</h3>
            <p className="text-sm">Join us for an unforgettable experience at.</p>
            <p>HNG12 Hangout! Secure your spot now.</p>
            <p className="text-xs">
              📍 Eco Hotel | 📅 March 15, 2025 | 7:00 PM
            </p>
          </div>

          {/* Ticket Type Selection */}
          <div className="mt-4">
            <label className="font-semibold block" htmlFor="ticketType">
              Select Ticket Type:
            </label>
            <div
              id="ticketType"
              className="grid grid-cols-2 gap-5 bg-[#041E23] p-8 rounded-[20px] my-5 border border-borderColor"
              role="radiogroup"
            >
              {["Free", "VIP Access", "VIP+ Access"].map((type, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`p-3 rounded-md border focus:outline-none hover:border-[#24A0B5] ${
                    selectedType === type
                      ? "bg-buttonBg text-white"
                      : "border-borderColor"
                  }`}
                  role="radio"
                  aria-checked={selectedType === type}
                  aria-label={`${type} ticket option`}
                >
                  {type}{" "}
                  {type !== "Free" && (
                    <span>${index === 1 ? "50" : "110"}</span>
                  )}
                </button>
              ))}
            </div>
            {errors.ticketType && (
              <p className="text-red-500 text-sm">{errors.ticketType}</p>
            )}
          </div>

          {/* Ticket Count */}
          <div className="mt-4">
            <label className="block font-semibold mb-1" htmlFor="ticketCount">
              Number of Tickets
            </label>
            <div className="w-full p-4 border border-borderColor rounded-[12px] bg-[#08252B] text-textPrimary outline-none hover:border-[#24A0B5]">
              <select
                id="ticketCount"
                className="w-full bg-[#08252B] text-textPrimary outline-none "
                value={numTickets}
                onChange={(e) => setNumTickets(parseInt(e.target.value))}
                aria-label="Number of tickets selection"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.ticketCount && (
                <p className="text-red-500 text-sm">{errors.ticketCount}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-center md:bg-[#041E23] items-center gap-5 w-full border-0 md:border md:border-[#0E464F] rounded-full">
            <button
              onClick={handleCancelClick}
              className="p-3 rounded-md border border-[#24A0B5] text-[#24A0B5] w-full md:w-[40%] hover:bg-buttonBg hover:text-white"
              aria-label="Cancel ticket selection"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleNextClick}
              className="p-3 rounded-md bg-buttonBg text-white w-full md:w-[40%] hover:bg-transparent hover:border-[#24A0B5] hover:border"
              aria-label="Proceed to next step"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
