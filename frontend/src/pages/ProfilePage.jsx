import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import { Camera, User, Mail, Palette, UserCircle } from 'lucide-react'
import Themes from '../components/Themes'
import ImageWithFallback from '../components/ImageWithFallback'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
  // Add a check to ensure authUser exists before destructuring
  // Also handle both possible structures: authUser directly containing properties or having a nested user object
  const name = authUser?.name || authUser?.user?.name || '';
  const email = authUser?.email || authUser?.user?.email || '';
  const profilePicture = authUser?.profilePicture || authUser?.user?.profilePicture || '/avatar.png';
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Reset selectedImage when profilePicture from authUser changes
  useEffect(() => {
    if (profilePicture && profilePicture !== '/avatar.png') {
      setSelectedImage(null);
    }
  }, [profilePicture]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    // Check file size (limit to 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image is too large. Please select an image under 5MB");
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please select a JPEG, PNG, GIF, or WebP image");
      return;
    }

    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const base64Image = event.target.result;
          setSelectedImage(base64Image);
          
          // Show loading toast
          const loadingToast = toast.loading("Uploading profile picture...");
          
          await updateProfile({ profilePicture: base64Image });
          
          // Dismiss loading toast and show success
          toast.dismiss(loadingToast);
        } catch (error) {
          console.error("Error in image upload:", error);
          setSelectedImage(null); // Reset the selected image on error
        }
      };
      
      reader.onerror = () => {
        toast.error("Failed to read the image file");
        console.error("FileReader error:", reader.error);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to process the image");
      console.error("Image processing error:", error);
    }
  }

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/20 p-2 rounded-lg">
          <UserCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Profile Settings</h1>
          <p className="text-xs sm:text-sm text-base-content/70">
            Manage your profile and preferences
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Profile */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-lg overflow-hidden">
            <div className="card-body p-0">
              {/* Header */}
              <div className="bg-base-300 p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Profile Information</h2>
                </div>
                <p className="text-sm text-base-content/70">Manage your personal information</p>
              </div>
              
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center justify-center py-8 px-4 border-b border-base-300">
                <div className="relative mb-4">
                  <div className="avatar">
                    <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <ImageWithFallback 
                        src={selectedImage || profilePicture}
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        fallbackSrc="/avatar.png"
                      />
                    </div>
                  </div>
                  <label 
                    htmlFor="avatar-upload" 
                    className={`btn btn-circle btn-sm absolute bottom-0 right-0 bg-primary hover:bg-primary-focus border-none ${
                      isUpdatingProfile ? "loading" : ""
                    }`}
                  >
                    <input 
                      type="file" 
                      id="avatar-upload" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={isUpdatingProfile}
                    />
                    <Camera className="w-4 h-4 text-primary-content" />
                  </label>
                </div>
                <p className="text-sm text-base-content/70">
                  {isUpdatingProfile ? "Updating profile picture..." : "Click the camera icon to update your photo"}
                </p>
              </div>

              {/* Account Information */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-lg font-bold">Account Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      readOnly
                      className="input input-bordered w-full bg-base-100"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Email Address</span>
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      readOnly
                      className="input input-bordered w-full bg-base-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Theme Settings */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-lg h-full">
            <div className="card-body p-0">
              <div className="bg-base-300 p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Palette className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold">Appearance</h2>
                </div>
                <p className="text-sm text-base-content/70">Customize your interface</p>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Theme</h3>
                  <p className="text-sm text-base-content/70">Choose a theme for your interface</p>
                </div>
                
                <Themes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage