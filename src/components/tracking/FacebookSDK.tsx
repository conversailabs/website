'use client';

import Script from 'next/script';

export default function FacebookSDK() {
  return (
    <>
      <Script
        id="facebook-sdk-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function() {
              if (typeof FB !== 'undefined') {
                FB.init({
                  appId      : '959200569594555',
                  xfbml      : true,
                  version    : 'v23.0'
                });
                FB.AppEvents.logPageView();
              }
            };
          `,
        }}
      />
      <Script
        id="facebook-sdk"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
              }
            }(document, 'script', 'facebook-jssdk'));
          `,
        }}
      />
    </>
  );
}