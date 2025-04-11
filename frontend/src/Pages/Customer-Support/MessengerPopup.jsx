import React, { useState, useEffect } from "react";

import { FacebookProvider, MessengerCheckbox } from 'react-facebook';
const MessengerChat = ({ pageId }) => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Load Facebook SDK (Only once)
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v17.0",
        });
      };

      (function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src =
          "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  useEffect(() => {
    if (showChat && window.FB) {
      window.FB.XFBML.parse(); // Re-render chat plugin when opened
    }
  }, [showChat]);

  return (
    <FacebookProvider appId="416252791547243" chatSupport>
    <CustomChat pageId="123456789" minimized={false}/>
  </FacebookProvider>    
  );
};

export default MessengerChat;
