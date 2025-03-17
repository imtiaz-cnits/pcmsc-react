import { useEffect } from "react";

const useAddModal = (modalId, openBtnId, closeBtnId) => {
  useEffect(() => {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);

    if (!modal || !openBtn || !closeBtn) return;

    // Function to disable scrolling
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    // Function to enable scrolling
    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    // Open modal and hide scroll

    const openModalHandler = () => {
      modal.classList.add("show");
      disableScroll();
    };

    // Close the modal and show scroll

    const closeModalHandler = () => {
      modal.classList.remove("show");
      enableScroll();
    };

    // Close the migrate modal by clicking outside it and show scroll

    const clickOutsideHandler = (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        enableScroll();
      }
    };

    // add event listeners
    openBtn.addEventListener("click", openModalHandler);
    closeBtn.addEventListener("click", closeModalHandler);
    document.addEventListener("click", clickOutsideHandler);

    // cleanup
    return () => {
      openBtn.removeEventListener("click", openModalHandler);
      closeBtn.removeEventListener("click", closeModalHandler);
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [modalId, openBtnId, closeBtnId]);
};

export default useAddModal;
