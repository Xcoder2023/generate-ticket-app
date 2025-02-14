"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "pairlance");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dahhmqvix/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log('Cloudinary Response:', data);

    if (data.secure_url) {
      return data.secure_url; 
    } else {
      throw new Error('Image upload failed: No URL returned.');
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw new Error("Image upload failed");
  }
};


const Details = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [project, setProject] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedProject = localStorage.getItem("project");

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedProject) setProject(savedProject);

    const ticket = localStorage.getItem("selectedTicket");
    if (ticket) {
      setSelectedTicket(ticket);
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleBack(); 
      }
      if (event.key === "ArrowRight") {
        handleNextClick(); 
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

 
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImage(file);
      
      
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleNextClick = async () => {
    const validationErrors: { [key: string]: string } = {};
    if (!name) validationErrors.name = "Name is required.";
    if (!email) validationErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = "Please enter a valid email.";
    if (!image) validationErrors.image = "Avatar upload is required.";
    if (!project) validationErrors.project = "Project description is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(image!);

      
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("project", project);
      localStorage.setItem("imageUrl", imageUrl); // Store the image URL

      router.push("/ticketconfirmation");
    } catch (error) {
      console.error("Error uploading image or saving data", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-xl mx-auto border border-borderColor text-white p-6 rounded-[20px] shadow-lg mt-6">
      <div className="flex justify-between border-b-2 border-borderColor my-5">
        <div className="border-b-2 border-[#24A0B5] relative top-[2px] w-[35%]">
          <h2 className="text-xl font-bold">Attendee Details</h2>
        </div>
        <p className="text-sm text-center mb-4">Step 2/3</p>
      </div>

      <div className="p-5 rounded-[20px] bg-[#052228] border border-borderColor">
        <div className="text-sm">
          <p>Upload Profile Photo</p>
        </div>
        <div className="bg-[#02191D] px-5 my-5 h-[150px]">
          <div className="bg-[#0E464F] rounded-[16px] p-6 flex justify-center items-center text-center cursor-pointer w-[55%] md:w-[40%] h-[150px] mx-auto" aria-label="Profile photo upload">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Uploaded profile"
                  className="w-full h-full object-cover rounded-[16px]"
                  onClick={() => document.getElementById('fileUpload')?.click()} 
                />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
              </>
            ) : (
              <>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="block text-gray-300 cursor-pointer"
                >
                  Drag & drop or{" "}
                  <span className="text-blue-400">click to upload</span>
                </label>
              </>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
      </div>

      <div className="h-[2px] w-full bg-[#07373F] mt-10"></div>

      <div className="mt-4">
        <div className="flex flex-col gap-2 mt-10">
          <label htmlFor="name" className="block text-gray-300">Enter your name</label>
          <input
            id="name"
            type="text"
            className="w-full p-3 rounded-[8px] bg-transparent border border-borderColor outline-none mt-1 hover:border-[#24A0B5]"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="email" className="block text-gray-300 mt-3">Enter your email</label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded-[8px] bg-transparent border border-borderColor outline-none mt-1 hover:border-[#24A0B5]"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="project" className="block text-gray-300 mt-3">About the project</label>
          <textarea
            id="project"
            className="w-full p-3 rounded-[8px] bg-transparent border border-borderColor h-[240px] mt-1 outline-none hover:border-[#24A0B5]"
            placeholder="Write something..."
            value={project}
            onChange={(e) => setProject(e.target.value)}
            aria-label="About the project"
          ></textarea>
          {errors.project && <p className="text-red-500 text-sm">{errors.project}</p>}
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-5 w-full">
          <button
            onClick={handleBack}
            className="p-3 rounded-md border border-[#24A0B5] text-[#24A0B5] text-sm w-full"
            aria-label="Go back to previous step"
          >
            Back
          </button>
          <button
            onClick={handleNextClick}
            className="p-3 rounded-md bg-buttonBg text-white text-sm w-full"
            aria-label="Submit attendee details"
          >
            {selectedTicket ? `Get My ${selectedTicket} Ticket` : "Get My Free Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
