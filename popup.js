
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start").addEventListener("click", () => {
    console.log("clicked start");
    chrome.runtime.sendMessage({ action: "startTracking" }, (response) => {
      console.log(response.status);
    });
  });

  document.getElementById("stop").addEventListener("click", () => {
    console.log("clicked stop");
    chrome.runtime.sendMessage({ action: "stopTracking" }, (response) => {
      console.log(response.status);
    });
  });
});
