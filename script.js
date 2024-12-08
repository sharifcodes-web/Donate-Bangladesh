document.addEventListener("DOMContentLoaded", () => {
    const donationTab = document.getElementById("donation-tab");
    const historyTab = document.getElementById("history-tab");
    const donationSection = document.getElementById("donation-section");
    const historySection = document.getElementById("history-section");
    const accountBalanceElem = document.getElementById("account-balance");
    const donateButtons = document.querySelectorAll(".donate-btn");
    const historyList = document.getElementById("history-list");
    const modal = document.getElementById("success-modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModal = document.getElementById("close-modal");
  
    let accountBalance = 5500;
    donationTab.classList.add('bg-green-500')


  
    function toggleActive(tab) {
      document.querySelectorAll(".tab").forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");
    }
  
    function showModal(message) {
      modalMessage.textContent = message;
      modal.classList.remove("hidden");
    }
  
    donationTab.addEventListener("click", () => {
      donationTab.classList.add('bg-green-500')
      historyTab.classList.remove('bg-green-500')
      donationSection.classList.remove("hidden");
      historySection.classList.add("hidden");
      toggleActive(donationTab);
    });
  
    historyTab.addEventListener("click", () => {
      donationTab.classList.remove('bg-green-500')
      historyTab.classList.add('bg-green-500')
      historySection.classList.remove("hidden");
      donationSection.classList.add("hidden");
      toggleActive(historyTab);
    });
  
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  
    donateButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const parent = e.target.closest(".hero-content");
        const inputField = parent.querySelector(".donation-input");
        const donationSpan = parent.querySelector(".current-donation");
        const donationAmount = parseFloat(inputField.value);

        if (isNaN(donationAmount) || donationAmount <= 0) {
          alert("Please enter a valid donation amount.");
          return;
        }
  
        if (donationAmount > accountBalance) {
          alert("Insufficient balance!");
          return;
        }
  
        accountBalance -= donationAmount;
        donationSpan.dataset.amount = parseFloat(donationSpan.dataset.amount) + donationAmount;
        donationSpan.textContent = `${donationSpan.dataset.amount} BDT`;
        accountBalanceElem.textContent = `${accountBalance} BDT`;
  

        const currentDate = new Date().toLocaleString();
        const donationName = parent.querySelector("h1").textContent;
        const historyItem = document.createElement("li");
        historyItem.textContent = `${currentDate}: Donated ${donationAmount} BDT to "${donationName}".`;
        historyList.appendChild(historyItem);
  
        
        inputField.value = "";
  
        
        showModal(`Successfully donated ${donationAmount} BDT to "${donationName}".`);
      });
    });
  });
  