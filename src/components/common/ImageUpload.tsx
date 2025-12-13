// src/components/common/ImageUpload.tsx
import React, { useState, useRef, useEffect } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  editable?: boolean;
  alt?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  initialImage = "",
  onImageChange,
  className = "",
  size = "md",
  rounded = false,
  editable = true,
  alt = "Image",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(initialImage);
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update image when initialImage prop changes
  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const sizeClasses = {
    sm: "w-22 h-18",
    md: "w-24 h-20",
    lg: "w-32 h-32",
  };

  const roundedClasses = rounded ? "rounded-full" : "rounded-lg";

  const handleImageClick = () => {
    if (editable) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        onImageChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image");
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage("");
    onImageChange("");
    setError(null);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${
          sizeClasses[size]
        } ${roundedClasses} overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200 relative ${
          isHovering ? "opacity-90" : ""
        }`}
        onClick={handleImageClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {image ? (
          <>
            <img src={image} alt={alt} className="w-full h-full object-cover" />
            {editable && (
              <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200`}
              >
                <FiUpload className="text-white text-xl" />
              </div>
            )}
            {editable && (
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity duration-200"
                onClick={handleRemoveImage}
                title="Remove image"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
            <FiImage className="text-gray-400 text-2xl mb-1" />
            <span className="text-xs text-gray-500">No Image</span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
