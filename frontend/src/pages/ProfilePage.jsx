import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import { Camera } from 'lucide-react'

const ProfilePage = () => {
  const {authUser , isUpdatingProfile , updateProfile } = useAuthStore();
  const {name , email , profilePicture } = authUser.user;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select a file");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePicture: base64Image });
      toast.success("Profile picture updated successfully");
    };
  }

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Profile</h2>
          <p className="text-sm text-base-content/70 text-center mb-8">Your profile information</p>
          
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={selectedImage || profilePicture || "/avatar.png"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <label 
                htmlFor="avatar-upload" 
                className={`btn btn-circle btn-sm absolute bottom-0 right-0 bg-primary hover:bg-primary-focus ${
                  isUpdatingProfile ? "loading..." : "pointer-events-auto"
                }`}
              >
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                      onChange={handleImageUpload}
                  accept="image/*"
                />
                <Camera className="w-4 h-4" />
              </label>
            </div>
            <p className="text-xs text-base-content/70 mt-2">{isUpdatingProfile ? "Updating..." : "Click the camera icon to update your photo"}</p>
          </div>

          {/* Form Section */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input 
              type="text" 
              value={name}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input 
              type="email" 
              value={email}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage