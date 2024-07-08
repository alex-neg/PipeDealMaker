document.addEventListener("DOMContentLoaded", () => {
  const jobForm = document.getElementById("jobForm");

  jobForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch("https://localhost:3000/api/create-deal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Response:", response);

      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create deal. Please try again.");
    }
  });
});
