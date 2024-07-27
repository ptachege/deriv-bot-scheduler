chrome.runtime.onInstalled.addListener(() => {
  // Clear any existing alarms on installation
  console.log("Extension installed");
  chrome.alarms.clear("clickButtons");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTracking") {
    chrome.alarms.create("clickButtons", { periodInMinutes: 60 });

    triggerClickAction();
    sendResponse({ status: "Tracking started" });
  } else if (message.action === "stopTracking") {
    chrome.alarms.clear("clickButtons");
    sendResponse({ status: "Tracking stopped" });
  }
});


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "clickButtons") {
    triggerClickAction();
  }
});


function triggerClickAction() {
  console.log('here are the tabs');
  chrome.tabs.query(
    { url: "*://app.deriv.com/*" },
    (tabs) => {
      console.log("Found tabs:", tabs);
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        });
      }else{
        console.log("No tabs found with the specified URL");
      }
    }
  );
}
