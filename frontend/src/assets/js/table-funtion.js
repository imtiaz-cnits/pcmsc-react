/* eslint-disable */

// .............Table action three dot toggle Start................ //

document.addEventListener("DOMContentLoaded", function () {
  let currentOpenMenu = null; // Track the currently open menu

  // Function to close a specific menu
  function closeMenu(menuWrap) {
    const toggler = menuWrap.querySelector(".toggler");
    if (toggler) {
      toggler.checked = false; // Uncheck the checkbox
    }
  }

  // Function to initialize dropdown behavior for a specific menu
  function initDropdown(menuWrap) {
    const toggler = menuWrap.querySelector(".toggler");
    const links = menuWrap.querySelectorAll(".link"); // Select all dropdown links

    // Event listener to detect clicks outside the menu
    document.addEventListener("click", function (event) {
      if (!menuWrap.contains(event.target) && currentOpenMenu !== menuWrap) {
        if (currentOpenMenu) {
          closeMenu(currentOpenMenu);
        }
      }
    });

    // Prevent closing the menu if the menu itself is clicked
    menuWrap.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    // Close menu when clicking on a dropdown link
    links.forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu(menuWrap);
        currentOpenMenu = null; // Reset the current open menu
      });
    });

    // Toggle menu open/close
    toggler.addEventListener("change", function () {
      if (toggler.checked) {
        if (currentOpenMenu && currentOpenMenu !== menuWrap) {
          closeMenu(currentOpenMenu);
        }
        currentOpenMenu = menuWrap;
      } else {
        if (currentOpenMenu === menuWrap) {
          currentOpenMenu = null;
        }
      }
    });
  }

  // Initialize all dropdowns
  const allMenus = document.querySelectorAll("#menu-wrap");
  allMenus.forEach(initDropdown);
});

// .............Table action three dot toggle End................ //

// .............Dashboard Table Search filter Start................ //
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".heading input");
  const tableRows = document.querySelectorAll("#printTable tbody tr");

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    tableRows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(filter) ? "" : "none";
    });
  });
});

// .............Dashboard Table Search filter End................ //

// ..............Function Table searchbar filter Start.......................//

const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", function () {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#printTable tbody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let isMatch = false;

    cells.forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(filter)) {
        isMatch = true;
      }
    });

    row.style.display = isMatch ? "" : "none";
  });

  // Update table and pagination after filtering
  updateTable();
  updatePagination();
});

// ..............Function Table searchbar filter End.......................//

// .............Table copy,csv,pdf,xlse,print all file Start...............//

$(document).ready(function () {
  // Copy table to clipboard
  $("#copyBtn").click(function () {
    const range = document.createRange();
    range.selectNode(document.querySelector("table"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Table copied to clipboard!");
  });

  // Export table to CSV
  $("#csvBtn").click(function () {
    let csv = [];
    const rows = document.querySelectorAll("table tr");

    rows.forEach((row) => {
      const cols = row.querySelectorAll("td, th");
      let rowData = [];
      cols.forEach((col) => rowData.push(col.innerText));
      csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = "data.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.click();
  });

  // Export table to PDF
  $("#pdfBtn").click(function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add the table content to the PDF
    doc.autoTable({
      html: "table",
      startY: 10,
    });

    // Save the PDF
    doc.save("data.pdf");
  });

  // Export table to XLSX
  $("#xlsxBtn").click(function () {
    const wb = XLSX.utils.table_to_book(document.querySelector("table"));
    XLSX.writeFile(wb, "data.xlsx");
  });
});

// Print table
function printTable() {
  const tableElement = document.getElementById("printTable");
  const originalContent = document.body.innerHTML;

  // Replace the body's content with the table
  document.body.innerHTML = tableElement.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;
}
// .............Table copy,csv,pdf,xlse,print all file End...............//

// ...............Filter Dropdown functionality Start...................//
document.addEventListener("click", function (event) {
  const dropdownMenu = document.querySelector(".dropdown-menus");
  const dropdownButton = document.querySelector(".dropdown-button");

  // Check if the click is outside the dropdown menu and button
  if (
    !event.target.closest(".dropdown-custom") &&
    !event.target.closest(".dropdown-button")
  ) {
    dropdownMenu.style.display = "none";
  }
});

document
  .querySelector(".dropdown-button")
  .addEventListener("click", function () {
    const dropdownMenu = document.querySelector(".dropdown-menus");
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

// Add click event listeners to each dropdown link to close the menu
document.querySelectorAll(".dropdown-menus a").forEach(function (link) {
  link.addEventListener("click", function () {
    const dropdownMenu = document.querySelector(".dropdown-menus");
    dropdownMenu.style.display = "none";
  });
});

// ...............Filter Dropdown Daynamic functionality Start...................//

document.addEventListener("DOMContentLoaded", function () {
  const filterLinks = document.querySelectorAll(".dropdown-menus a");
  const tableRows = document.querySelectorAll("#printTable tbody tr");
  const displayInfo = document.getElementById("display-info");

  function updateTable() {
    let visibleCount = 0;

    tableRows.forEach((row) => {
      if (row.style.display !== "none") {
        visibleCount++;
      }
    });

    // Update the display-info span with the count of visible entries
    displayInfo.textContent = `Showing ${visibleCount} entries`;
  }

  filterLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const filterValue = this.getAttribute("data-filter");

      tableRows.forEach((row) => {
        const rowDate = new Date(row.getAttribute("data-date"));
        const today = new Date();
        let shouldShow = true;

        switch (filterValue) {
          case "all":
            shouldShow = true;
            break;
          case "today":
            shouldShow = rowDate.toDateString() === today.toDateString();
            break;
          case "7":
            shouldShow = (today - rowDate) / (1000 * 60 * 60 * 24) <= 7;
            break;
          case "30":
            shouldShow = (today - rowDate) / (1000 * 60 * 60 * 24) <= 30;
            break;
          case "365":
            shouldShow = (today - rowDate) / (1000 * 60 * 60 * 24) <= 365;
            break;
          default:
            shouldShow = true;
        }

        row.style.display = shouldShow ? "" : "none";
      });

      updateTable(); // Update the table view based on new filter
    });
  });

  updateTable(); // Initial call to set the correct count on page load
});

// ...............Filter Dropdown functionality End...................//

// ................ Entries and Pagination Start.....................//
document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#printTable");
  const entriesSelect = document.querySelector("#entries");
  const displayInfo = document.querySelector("#display-info");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const paginationContainer = document.querySelector("#pagination");

  let currentPage = 1;
  let entriesPerPage = parseInt(entriesSelect.value);
  let totalEntries = table.querySelectorAll("tbody tr").length;
  let totalPages = Math.ceil(totalEntries / entriesPerPage);
  const pageLinksToShow = 3;

  function updateTable() {
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      row.style.display =
        index >= (currentPage - 1) * entriesPerPage &&
        index < currentPage * entriesPerPage
          ? ""
          : "none";
    });

    displayInfo.textContent = `Showing ${Math.min(
      entriesPerPage * currentPage,
      totalEntries,
    )} of ${totalEntries} entries`;
  }

  function updatePagination() {
    totalPages = Math.ceil(totalEntries / entriesPerPage);
    paginationContainer.innerHTML = "";

    const startPage = Math.max(
      1,
      currentPage - Math.floor(pageLinksToShow / 2),
    );
    const endPage = Math.min(totalPages, startPage + pageLinksToShow - 1);

    if (totalPages > 1) {
      if (currentPage > 1) {
        paginationContainer.innerHTML +=
          '<button id="prevBtn" class="btn">Prev</button>';
      }

      for (let i = startPage; i <= endPage; i++) {
        paginationContainer.innerHTML += `<a href="#" class="page-link page-link--${i}">${i}</a>`;
      }

      if (currentPage < totalPages) {
        paginationContainer.innerHTML +=
          '<button id="nextBtn" class="btn">Next</button>';
      }
    }

    // Add event listeners for new pagination links
    document.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = parseInt(e.target.textContent);
        updateTable();
        updatePagination();
      });
    });

    document.querySelector("#prevBtn")?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateTable();
        updatePagination();
      }
    });

    document.querySelector("#nextBtn")?.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateTable();
        updatePagination();
      }
    });

    // Highlight active page link
    document.querySelectorAll(".page-link").forEach((link) => {
      link.classList.toggle(
        "active",
        parseInt(link.textContent) === currentPage,
      );
    });
  }

  entriesSelect.addEventListener("change", (e) => {
    entriesPerPage = parseInt(e.target.value);
    totalEntries = table.querySelectorAll("tbody tr").length;
    currentPage = 1; // Reset to the first page
    updateTable();
    updatePagination();
  });

  // Initial setup
  updateTable();
  updatePagination();
});
// ................ Entries and Pagination End.....................//

// ..................... Mark Sheet Print Function Start..............//
function printMarksheet() {
  const marksheet = document.querySelector(".marksheet-container");

  // Save the current visibility state of the body
  const originalContent = document.body.innerHTML;

  // Set the body to only contain the marksheet
  document.body.innerHTML = marksheet.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;

  // Rebind any event listeners (if necessary)
  location.reload(); // Reload the page to restore functionality
}
// ..................... Mark Sheet Print Function End..............//

// ................Admit Card Print Function Start...............//
function printMarkAdmit() {
  const admitcard = document.querySelector(".admit-container");

  // Save the current visibility state of the body
  const originalContent = document.body.innerHTML;

  // Set the body to only contain the marksheet
  document.body.innerHTML = admitcard.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;

  // Reload the page to restore functionality
  location.reload();
}
// .................Admit Card Print Function End...............//

// ................Tabulation Sheet Print Function Start...............//
function printTbSheet() {
  const tabulation = document.querySelector(".tabulation");

  // Save the current visibility state of the body
  const originalContent = document.body.innerHTML;

  // Add CSS for horizontal A4 page printing
  const printStyle = `
    <style>
      @page {
        size: A4 landscape;
    margin: 0 !important;
    padding: 30px;
      }
    </style>
  `;

  // Set the body to only contain the tabulation and the style
  document.body.innerHTML = printStyle + tabulation.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;

  // Reload the page to restore functionality
  location.reload();
}

// .................Tabulation Sheet Print Function End...............//

// ................1st, 2nd, 3rd All Exam Sheet Print Function Start...............//
function printAllExamSheet() {
  const allexammarksheet = document.querySelector(".allexammarksheet");

  // Save the current visibility state of the body
  const originalContent = document.body.innerHTML;

  // Add CSS for horizontal A4 page printing
  const printStyle = `
    <style>
      @page {
        size: A4 landscape;
    margin: 0 !important;
    padding: 30px;
      }
    </style>
  `;

  // Set the body to only contain the tabulation and the style
  document.body.innerHTML = printStyle + allexammarksheet.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;

  // Reload the page to restore functionality
  location.reload();
}

// .................1st, 2nd, 3rd All Exam Sheet Print Function End...............//

// .................Seat Plan Sheet Print Function Start...............//
function printSeatPlan() {
  const printSeatPlan = document.querySelector(".seat-plan-container");

  // Save the current visibility state of the body
  const originalContent = document.body.innerHTML;

  // Set the body to only contain the printSeatPlan
  document.body.innerHTML = printSeatPlan.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;

  // Reload the page to restore functionality
  location.reload();
}
// .................Seat Plan Sheet Print Function End...............//

// .................Generate ID Card Print Function Start...............//
function printIdCard() {
  const printIdCard = document.querySelector(".generate-id-container");

  // Save the current visibility state of the body
  const originalContent = document.body.innerHTML;

  // Set the body to only contain the printIdCard
  document.body.innerHTML = printIdCard.outerHTML;

  // Trigger the print dialog
  window.print();

  // Restore the original content
  document.body.innerHTML = originalContent;

  // Reload the page to restore functionality
  location.reload();
}
// .................Generate ID Card Print Function End...............//
