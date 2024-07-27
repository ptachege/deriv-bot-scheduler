console.log("Executing content.js");

// Function to click a button by its selector
function clickButton(selector) {
  return new Promise((resolve, reject) => {
    const button = document.getElementById(selector);
    console.log("Button element:", button);

    if (button) {
      button.click();
      console.log("Button clicked:", selector);

      if (selector === "db-run-panel__clear-button") {
        // there is a modal that pops up after clicking the reset button
        // this code will click the confirm button on the modal
        const dialogButtons = document.querySelectorAll(
          ".dc-btn.dc-btn__effect.dc-btn--primary.dc-btn__large.dc-dialog__button"
        );

        console.log(dialogButtons.length);

        if (dialogButtons.length > 0){
          let confirmButton = dialogButtons[0];
          if (confirmButton) {
            // click the button
            confirmButton.click();
          }
        }
        // simulate a wait of 5 seconds so that the reset is done before resolving the promise
        setTimeout(() => {
          console.log("Reset done");
          resolve();
        }, 5000);
      } else {
        resolve();
      }
    } else {
      console.log("Button not clickable");
      reject(`Button with selector ${selector} not found`);
    }
  });
}

// Run the functions to click the buttons in sequence
async function runSequence() {
  try {
    await clickButton("db-run-panel__clear-button"); // Wait for the reset process to complete
    await clickButton("db-animation__run-button"); // Then run the second function
  } catch (error) {
    console.error("Error in running sequence:", error);
  }
}

runSequence(); // Start the sequence
