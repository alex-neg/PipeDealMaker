document.addEventListener("DOMContentLoaded", () => {
  const jobForm = document.getElementById("jobForm");
  const createButton = document.querySelector(".create");

  jobForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    createButton.style.backgroundColor = "#D2122E";
    createButton.textContent = "Request Sent";

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(
        "https://pipedealmaker.onrender.com/api/create-deal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Response:", response);

      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create deal. Please try again.");
    }
  });
});
