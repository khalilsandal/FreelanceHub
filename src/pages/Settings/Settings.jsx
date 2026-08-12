import React, { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();

    // Later save these settings to Firebase
    console.log({
      notifications,
      emailNotifications,
      profileVisible,
    });

    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account preferences and privacy settings.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">

          {/* Account Settings */}
          <section className="rounded-xl bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Account
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your basic account information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue="John Smith"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  defaultValue="john@example.com"
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-gray-500"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Email is managed by your authentication provider.
                </p>
              </div>

            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-xl bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose how you want to receive notifications.
              </p>
            </div>

            <div className="space-y-5">

              {/* Push notifications */}
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3 className="font-medium text-gray-900">
                    Notifications
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Receive notifications about jobs, proposals and messages.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    notifications
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      notifications
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>

              </div>

              <div className="border-t" />

              {/* Email notifications */}
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3 className="font-medium text-gray-900">
                    Email Notifications
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Receive important updates by email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    emailNotifications
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      emailNotifications
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>

              </div>

            </div>
          </section>

          {/* Privacy */}
          <section className="rounded-xl bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Privacy
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Control who can see your profile.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">

              <div>
                <h3 className="font-medium text-gray-900">
                  Public Profile
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Allow employers to find and view your freelancer profile.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setProfileVisible(!profileVisible)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  profileVisible
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    profileVisible
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>
          </section>

          {/* Save */}
          <div className="flex justify-end">

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>

          </div>

        </form>

        {/* Danger Zone */}
        <section className="mt-8 rounded-xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-red-600">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              These actions can permanently affect your account.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="font-medium text-gray-900">
                Delete Account
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Permanently delete your account and all associated data.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete your account?"
                );

                if (confirmed) {
                  console.log("Delete account");
                  // Later delete the Firebase account
                }
              }}
              className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Delete Account
            </button>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Settings;