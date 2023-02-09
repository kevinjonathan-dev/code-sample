import api from 'api';
import Button from 'components/common/Button';
import ChatIcon from 'components/common/Icons/ChatIcon';
import withAuth from 'components/HOCs/withAuth';
import UploadPopup from 'components/PopUp/UploadPopup';
import MessageCard from 'components/messages/MessageCard';
import SendMessageSection from 'components/messages/SendMessageSection';
import useStore from 'hooks/useStore';
import HomeLayout from 'layouts/HomeLayout';
import React, { useEffect, useState } from 'react';

function MessagesPage() {
  const { store } = useStore();

  const [uploadPopupActive, setUploadPopupActive] = useState(false);
  const [activeMessage, setActiveMessage] = useState<MessageType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const fetchData = async () => {
    if (store.accessToken && store.company?._id) {
      try {
        const res = await api.communication.tickets.getAll(
          store.accessToken,
          store.company._id,
        );
        setMessages(res.data.items);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (store.accessToken && store.company?._id) {
      // fetch data during page initialization

      void fetchData();
    }
  }, [store.accessToken, store.company?._id]);

  useEffect(() => {
    // fetch data on any data changes
    void fetchData();
  }, [renderTrigger]);

  return (
    <>
      <HomeLayout className={`relative `}>
        <div className="w-full h-full flex">
          <div className="chat-list max-h-screen overflow-auto min-h-screen border-r h-full border-slate-200 max-w-[320px]">
            <div className="chat-header flex flex-col border-slate-200 border-b px-3 pb-3 pt-6 ">
              <Button
                onClick={() => setActiveMessage(null)}
                className="flex items-center rounded-full hover:bg-teal-500 hover:shadow-2xl duration-300  py-4 px-8"
                label={
                  <>
                    <ChatIcon className="mr-2" /> New anonymous case
                  </>
                }
              />
              {tickets.length > 0 && (
                <p className="font-bold text-slate-800 mt-8">
                  Past conversations
                </p>
              )}
            </div>
            <div className="flex flex-wrap">
              {tickets.length > 0 &&
                tickets.map((item) => (
                  <MessageCard
                    key={item._id}
                    onClick={() => setActiveMessage(item)}
                    ticket={item}
                    active={activeMessage?._id === item._id}
                    unread={Boolean(item.hasNewUser)}
                  />
                ))}
            </div>
          </div>
          <SendMessageSection
            setActiveMessage={setActiveMessage}
            setRenderTrigger={setRenderTrigger}
            ticket={activeMessage}
          />
        </div>
      </HomeLayout>
      <UploadPopup
        onClose={() => setUploadPopupActive(false)}
        active={uploadPopupActive}
      />
    </>
  );
}

export default withAuth(MessagesPage);
