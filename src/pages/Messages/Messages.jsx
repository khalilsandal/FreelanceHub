import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import users from "../../data/users.json";

const Messages = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState("");

  /*
   * Load conversations from localStorage
   */
  useEffect(() => {
    if (!currentUser) return;

    const storedMessages = JSON.parse(
      localStorage.getItem("messages") || "[]"
    );

    setConversations(storedMessages);
  }, [currentUser]);

  /*
   * Get all users except current user
   */
  const contacts = useMemo(() => {
    if (!currentUser) return [];

    return users.filter(
      (user) => user.id !== currentUser.id
    );
  }, [currentUser]);

  /*
   * Selected conversation
   */
  const selectedUser = users.find(
    (user) => user.id === selectedUserId
  );

  /*
   * Messages between current user and selected user
   */
  const selectedMessages = conversations.filter(
    (conversation) =>
      (conversation.senderId === currentUser?.id &&
        conversation.receiverId === selectedUserId) ||
      (conversation.senderId === selectedUserId &&
        conversation.receiverId === currentUser?.id)
  );

  /*
   * Send message
   */
  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedUserId || !currentUser) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      receiverId: selectedUserId,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [
      ...conversations,
      newMessage,
    ];

    setConversations(updatedMessages);

    localStorage.setItem(
      "messages",
      JSON.stringify(updatedMessages)
    );

    setMessage("");
  };

  /*
   * Get last message for a contact
   */
  const getLastMessage = (userId) => {
    const messages = conversations.filter(
      (conversation) =>
        (conversation.senderId === currentUser?.id &&
          conversation.receiverId === userId) ||
        (conversation.senderId === userId &&
          conversation.receiverId === currentUser?.id)
    );

    if (messages.length === 0) {
      return "Start a conversation";
    }

    return messages[messages.length - 1].message;
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">
          Please login to view your messages.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 p-4 sm:p-6">

      <div className="mx-auto flex h-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">

        {/* Conversations */}
        <aside
          className={`w-full border-r border-gray-200 sm:w-80 ${
            selectedUserId ? "hidden sm:block" : "block"
          }`}
        >

          {/* Header */}
          <div className="border-b border-gray-200 px-5 py-5">

            <h1 className="text-xl font-bold text-gray-900">
              Messages
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Connect with clients and freelancers
            </p>

          </div>

          {/* Contacts */}
          <div className="overflow-y-auto">

            {contacts.map((contact) => {

              const isSelected =
                selectedUserId === contact.id;

              return (
                <button
                  key={contact.id}
                  onClick={() => setSelectedUserId(contact.id)}
                  className={`flex w-full items-center gap-3 border-b border-gray-100 px-5 py-4 text-left transition ${
                    isSelected
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >

                  {/* Avatar */}
                  <img
                    src={contact.photoURL}
                    alt={contact.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  {/* User info */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between">

                      <p
                        className={`truncate font-semibold ${
                          isSelected
                            ? "text-blue-600"
                            : "text-gray-900"
                        }`}
                      >
                        {contact.name}
                      </p>

                    </div>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {getLastMessage(contact.id)}
                    </p>

                  </div>

                </button>
              );
            })}

          </div>

        </aside>

        {/* Chat */}
        <main
          className={`flex min-w-0 flex-1 flex-col ${
            selectedUserId ? "flex" : "hidden sm:flex"
          }`}
        >

          {!selectedUser ? (

            /* Empty state */
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
                💬
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Your messages
              </h2>

              <p className="mt-2 max-w-md text-gray-500">
                Select a conversation to start messaging with
                a client or freelancer.
              </p>

            </div>

          ) : (

            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">

                {/* Mobile back */}
                <button
                  onClick={() => setSelectedUserId(null)}
                  className="mr-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:hidden"
                >
                  ←
                </button>

                <img
                  src={selectedUser.photoURL}
                  alt={selectedUser.name}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>

                  <h2 className="font-semibold text-gray-900">
                    {selectedUser.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {selectedUser.role}
                  </p>

                </div>

              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5">

                {selectedMessages.length === 0 ? (

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                      👋
                    </div>

                    <p className="mt-4 font-medium text-gray-900">
                      Start a conversation
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Send a message to {selectedUser.name}
                    </p>

                  </div>

                ) : (

                  selectedMessages.map((item) => {

                    const isMine =
                      item.senderId === currentUser.id;

                    return (
                      <div
                        key={item.id}
                        className={`flex ${
                          isMine
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            isMine
                              ? "rounded-br-md bg-blue-600 text-white"
                              : "rounded-bl-md bg-white text-gray-800 shadow-sm"
                          }`}
                        >

                          <p className="text-sm leading-6">
                            {item.message}
                          </p>

                          <p
                            className={`mt-1 text-[11px] ${
                              isMine
                                ? "text-blue-100"
                                : "text-gray-400"
                            }`}
                          >
                            {new Date(
                              item.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>

                        </div>

                      </div>
                    );
                  })

                )}

              </div>

              {/* Message Input */}
              <form
                onSubmit={sendMessage}
                className="border-t border-gray-200 bg-white p-4"
              >

                <div className="flex items-center gap-3">

                  <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    placeholder={`Message ${selectedUser.name}...`}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send
                  </button>

                </div>

              </form>
            </>
          )}

        </main>

      </div>
    </div>
  );
};

export default Messages;