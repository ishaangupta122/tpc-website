import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
    viewPassword: false,
  });
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users/678e1af82244a66c11e36d36"
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        console.log(data);

        setFormData({ name: data.name, email: data.email, phone: "xxxxxxx" });
        setAdminPassword(data.password);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = async () => {
    if (formData.currentPassword !== adminPassword) {
      setErrors({ currentPassword: "Current password is incorrect." });
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setErrors({ newPassword: "New password must be at least 6 characters." });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password: formData.newPassword || adminPassword,
        }),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading)
    return (
      <section className="h-screen overflow-hidden flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-green-600" />
          <p className="text-green-600 font-medium">Loading Settings...</p>
        </div>
      </section>
    );

  return (
    <section id="settings" className="p-6 space-y-6 max-w-7xl">
      <div
        className={`bg-white p-4 rounded-lg border ${
          isEditing ? "border-red-300" : "border-neutral-200/60"
        }`}>
        <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
        <p className={isEditing ? "text-red-500" : "text-neutral-500"}>
          Manage account details
        </p>
      </div>

      <div
        className={`bg-white rounded-lg border p-6 ${
          isEditing ? "border-red-300" : "border-neutral-200/60"
        }`}>
        <h2
          className={`text-xl font-semibold mb-4 ${
            isEditing ? "text-red-500" : "text-green-600"
          }`}>
          {isEditing ? "Update Admin Credentials" : "Admin Credentials"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500"
                placeholder="Name"
              />
            ) : (
              <p className="px-4 py-2 border border-neutral-300 rounded-lg bg-gray-100">
                {formData.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500"
                placeholder="Email"
              />
            ) : (
              <p className="px-4 py-2 border border-neutral-300 rounded-lg bg-gray-100">
                {formData.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700">
              Phone
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500"
                placeholder="Phone"
              />
            ) : (
              <p className="px-4 py-2 border border-neutral-300 rounded-lg bg-gray-100">
                {formData.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700">
              {isEditing ? "Current Password" : "Password"}
            </label>
            {isEditing ? (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type={
                        passwordVisibility.currentPassword ? "text" : "password"
                      }
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500"
                      placeholder="Current Password"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-neutral-600"
                      onClick={() =>
                        togglePasswordVisibility("currentPassword")
                      }>
                      {passwordVisibility.currentPassword ? (
                        <EyeOff className="hover:cursor-pointer" />
                      ) : (
                        <Eye className="hover:cursor-pointer" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}

                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-neutral-700">
                      New Password
                    </label>
                    <input
                      type={
                        passwordVisibility.newPassword ? "text" : "password"
                      }
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500"
                      placeholder="New Password"
                    />
                    <button
                      type="button"
                      className="absolute top-[calc(50%+14px)] -translate-y-1/2 right-3 flex items-center text-neutral-600"
                      onClick={() => togglePasswordVisibility("newPassword")}>
                      {passwordVisibility.newPassword ? (
                        <EyeOff className="hover:cursor-pointer" />
                      ) : (
                        <Eye className="hover:cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-neutral-700">
                      Confirm Password
                    </label>
                    <input
                      type={
                        passwordVisibility.confirmPassword ? "text" : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-neutral-500 focus:border-neutral-500"
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className="absolute top-[calc(50%+14px)] -translate-y-1/2 right-3 flex items-center text-neutral-600"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }>
                      {passwordVisibility.confirmPassword ? (
                        <EyeOff className="hover:cursor-pointer" />
                      ) : (
                        <Eye className="hover:cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative">
                <p className="px-4 py-2 border border-neutral-300 rounded-lg bg-gray-100">
                  {passwordVisibility.viewPassword ? adminPassword : "••••••••"}
                </p>
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-neutral-600"
                  onClick={() => togglePasswordVisibility("viewPassword")}>
                  {passwordVisibility.viewPassword ? (
                    <EyeOff className="hover:cursor-pointer" />
                  ) : (
                    <Eye className="hover:cursor-pointer" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <button
                className="bg-neutral-600 text-white px-4 py-2 rounded-md hover:bg-neutral-700 cursor-pointer"
                onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                onClick={handleProfileUpdate}>
                Save Changes
              </button>
            </>
          ) : (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
              onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Settings;
