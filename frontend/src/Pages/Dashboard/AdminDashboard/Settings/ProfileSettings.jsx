import React from 'react';

const ProfileSettings = () => {
    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            type="button"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;