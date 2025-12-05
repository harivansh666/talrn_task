import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../config/axios";
import { useParams } from "react-router-dom";

type ProfileImageProps = {
  imgUrl: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ imgUrl }) => {
  const { developerId } = useParams();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64
      const base64 = await convertToBase64(file);

      // Preview immediately
      setSelectedImg(base64);

      // Upload to backend
      const response = await axiosInstance.post(
        `/developers/upload/img/${developerId}`,
        { base64Image: base64 },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSelectedImg(response.data.imgUrl);
        alert("Profile picture updated!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const fallbackImg: string =
    "https://res.cloudinary.com/desslvu1w/image/upload/v1750687040/avatar_jnlvx7.png";
  // Helper function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={selectedImg || imgUrl || fallbackImg}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />

        <label
          htmlFor="avatar-upload"
          className={`absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-3 rounded-full cursor-pointer transition-all ${
            isUploading ? "animate-pulse pointer-events-none" : ""
          }`}
        >
          <CameraIcon className="w-5 h-5 text-white" />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      <p className="text-sm text-gray-600">
        {isUploading ? "Uploading..." : "Click camera to update photo"}
      </p>
    </div>
  );
};

export default ProfileImage;
