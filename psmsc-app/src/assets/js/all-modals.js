// Delate Confirmation Modal Start....................
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("confirmationModal");
  const deleteButtons = document.querySelectorAll(".deleteButton");
  const confirmButtons = [
    document.getElementById("confirmYes"),
    document.getElementById("confirmNo"),
  ];

  // Function to open modal
  const openModal = () => {
    modal.style.display = "flex";
  };

  // Function to close modal
  const closeModal = () => {
    modal.style.display = "none";
  };

  // Attach click event to all delete buttons
  deleteButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  // Attach click event to both Yes and No buttons
  confirmButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
// Delate Confirmation Modal End....................

// Edit Confirmation Modal Start....................
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("editModal");
  const deleteButtons = document.querySelectorAll(".editButton");
  const confirmButtons = [
    document.getElementById("editYes"),
    document.getElementById("editNo"),
  ];

  // Function to open modal
  const openModal = () => {
    modal.style.display = "flex";
  };

  // Function to close modal
  const closeModal = () => {
    modal.style.display = "none";
  };

  // Attach click event to all delete buttons
  deleteButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  // Attach click event to both Yes and No buttons
  confirmButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
// Edit Confirmation Modal End....................

// Quick View Modal Start....................
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quickViewModal");
  const quickButton = document.querySelectorAll(".quickButton");
  const confirmButtons = [document.getElementById("quickClose")];

  // Function to open modal
  const openModal = () => {
    modal.style.display = "flex";
  };

  // Function to close modal
  const closeModal = () => {
    modal.style.display = "none";
  };

  // Attach click event to all delete buttons
  quickButton.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  // Attach click event to both Yes and No buttons
  confirmButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
// Quick View Modal End....................

// Add Students - Pop Up Modal Start.............
document.addEventListener("DOMContentLoaded", () => {
  const studentModal = document.getElementById("studentModal");
  const studentModalBtn = document.getElementById("studentModalBtn");
  const closBtn = document.getElementById("closBtn");

  // Function to disable scrolling
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Function to enable scrolling
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  // Open the student modal and hide scroll
  studentModalBtn.addEventListener("click", () => {
    studentModal.classList.add("show");
    disableScroll();
  });

  // Close the student modal and show scroll
  closBtn.addEventListener("click", () => {
    studentModal.classList.remove("show");
    enableScroll();
  });

  // Close the modal by clicking outside it and show scroll
  document.addEventListener("click", (e) => {
    if (e.target === studentModal) {
      studentModal.classList.remove("show");
      enableScroll();
    }
  });

  // Close the modal when Esc key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      studentModal.classList.remove("show");
      enableScroll();
    }
  });
});
// Add Students - Pop Up Modal End.............

// Migrate Students Pop Up Modal Start.........
document.addEventListener("DOMContentLoaded", () => {
  const migrateModal = document.getElementById("migrateModal");
  const migrateModalBtn = document.getElementById("migrateModalBtn");
  const closeBtn = document.getElementById("closeBtn");

  // Function to disable scrolling
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Function to enable scrolling
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  // Open the migrate modal and hide scroll
  migrateModalBtn.addEventListener("click", () => {
    migrateModal.classList.add("show");
    disableScroll();
  });

  // Close the migrate modal and show scroll
  closeBtn.addEventListener("click", () => {
    migrateModal.classList.remove("show");
    enableScroll();
  });

  // Close the migrate modal by clicking outside it and show scroll
  document.addEventListener("click", (e) => {
    if (e.target === migrateModal) {
      migrateModal.classList.remove("show");
      enableScroll();
    }
  });

  // Close the student modal by clicking outside it and show scroll
  document.addEventListener("click", (e) => {
    if (e.target === studentModal) {
      studentModal.classList.remove("show");
      enableScroll();
    }
  });
});
// Migrate Students Pop Up Modal End.........

// Academic All page Pop Up Modal Start.........
document.addEventListener("DOMContentLoaded", () => {
  const createClassModal = document.getElementById("createClassModal");
  const classModalBtn = document.getElementById("classModalBtn");
  const classBtn = document.getElementById("classBtn");

  // Function to disable scrolling
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Function to enable scrolling
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  // Open the migrate modal and hide scroll
  classModalBtn.addEventListener("click", () => {
    createClassModal.classList.add("show");
    disableScroll();
  });

  // Close the migrate modal and show scroll
  classBtn.addEventListener("click", () => {
    createClassModal.classList.remove("show");
    enableScroll();
  });

  // Close the migrate modal by clicking outside it and show scroll
  document.addEventListener("click", (e) => {
    if (e.target === createClassModal) {
      createClassModal.classList.remove("show");
      enableScroll();
    }
  });
});
// Academic All page Pop Up Modal End.........

// Exam Management All page Pop Up Modal Start.........
document.addEventListener("DOMContentLoaded", () => {
  const exmModal = document.getElementById("exmModal");
  const exmModalBtn = document.getElementById("exmModalBtn");
  const exmClose = document.getElementById("exmClose");

  // Function to disable scrolling
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Function to enable scrolling
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  // Open the migrate modal and hide scroll
  exmModalBtn.addEventListener("click", () => {
    exmModal.classList.add("show");
    disableScroll();
  });

  // Close the migrate modal and show scroll
  exmClose.addEventListener("click", () => {
    exmModal.classList.remove("show");
    enableScroll();
  });

  // Close the migrate modal by clicking outside it and show scroll
  document.addEventListener("click", (e) => {
    if (e.target === exmModal) {
      exmModal.classList.remove("show");
      enableScroll();
    }
  });
});
// Exam Management All page Pop Up Modal End.........
