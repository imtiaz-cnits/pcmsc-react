// Sidebar Start.................................
$(".menu > ul > li").click(function (e) {
  // Store the active parent link in localStorage
  const activeLink = $(this).find("> a").attr("href");
  localStorage.setItem("activeSidebarLink", activeLink);

  // Update active classes and toggle submenu
  $(this).siblings().removeClass("active");
  $(this).siblings().find("ul").slideUp(); // Close other submenus
  $(this).toggleClass("active");
  $(this).find("ul").slideToggle();
});

$(".menu > ul > li > a").click(function (e) {
  // Remove submenu active state when clicking a parent menu link
  localStorage.removeItem("activeSubmenuLink");
});

$(".menu > ul > li ul li a").click(function (e) {
  // Store the clicked submenu child link in localStorage
  const activeChildLink = $(this).attr("href");
  localStorage.setItem("activeSubmenuLink", activeChildLink);

  // Store parent link for submenu
  const parentLink = $(this)
    .closest("ul")
    .closest("li")
    .find("> a")
    .attr("href");
  localStorage.setItem("activeSidebarLink", parentLink);
});

// Highlight the active link and keep submenu open on page load
$(document).ready(function () {
  const activeLink = localStorage.getItem("activeSidebarLink");
  const activeSubmenuLink = localStorage.getItem("activeSubmenuLink");

  if (activeSubmenuLink) {
    // Highlight the active submenu child link
    const activeSubElement = $(
      `.menu ul li a[href="${activeSubmenuLink}"]`,
    ).parent();
    activeSubElement.addClass("active");

    // Open the parent menu of the active submenu
    const parentMenu = activeSubElement.closest("ul").closest("li");
    parentMenu.addClass("active");
    parentMenu.find("> ul").slideDown();
  } else if (activeLink) {
    // Highlight the parent menu link even if no submenu is active
    const activeElement = $(
      `.menu > ul > li > a[href="${activeLink}"]`,
    ).parent();
    activeElement.addClass("active");
    activeElement.find("> ul").slideDown(); // Open submenu if it's a parent
  } else {
    // Ensure all menus are closed by default
    $(".menu > ul > li > ul").slideUp();
    $(".menu > ul > li").removeClass("active");
  }
});

// Close active submenu when clicking outside the menu......
$(document).on("click", function (e) {
  // Check if body has data-sidebar-size="sm"
  if ($("body").attr("data-sidebar-size") === "sm") {
    // Check if the click is outside the sidebar (.menu)
    if (!$(e.target).closest(".menu").length) {
      // Close all submenus and remove active state
      $(".menu > ul > li").removeClass("active");
      $(".menu > ul > li > ul").slideUp();
      localStorage.removeItem("activeSidebarLink");
      localStorage.removeItem("activeSubmenuLink");
    }
  }
});

// Prevent closing when clicking inside the sidebar
$(".menu").on("click", function (e) {
  e.stopPropagation();
});

//   ................................................
//   ................................................
//   ................................................
//   ................................................

// Counter Animation
function counterAnimation() {
  const counters = document.querySelectorAll(".counter-value");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = target / 250;
    const updateCounter = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + speed);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// Sidebar Close on Outside Click
document.addEventListener("click", function (event) {
  const sidebar = document.querySelector(".vertical-menu");
  const toggleButton = document.querySelector(".vertical-menu-btn");

  if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
    document.body.classList.remove("sidebar-enable");
  }
});

// Initialize Sidebar Active State on Page Load
document.addEventListener("DOMContentLoaded", function () {
  setSidebarMenuActive();
});

// Responsive Sidebar Toggle
function toggleSidebar() {
  const currentSize = document.body.getAttribute("data-sidebar-size");

  document.body.classList.toggle("sidebar-enable");
  if (window.innerWidth >= 992) {
    document.body.setAttribute(
      "data-sidebar-size",
      currentSize === "sm" ? "lg" : "sm",
    );
  }
}
document.querySelectorAll(".vertical-menu-btn").forEach((button) => {
  button.addEventListener("click", toggleSidebar);
});

// Tooltip Initialization
document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((tooltip) => {
  new bootstrap.Tooltip(tooltip);
});

// Popover Initialization
document.querySelectorAll("[data-bs-toggle='popover']").forEach((popover) => {
  new bootstrap.Popover(popover);
});

// Horizontal Layout Toggle
function toggleLayout() {
  const body = document.body;
  const layout = body.getAttribute("data-layout");

  if (layout === "horizontal") {
    body.setAttribute("data-layout", "vertical");
  } else {
    body.setAttribute("data-layout", "horizontal");
  }
}
document.querySelectorAll(".layout-toggle").forEach((button) => {
  button.addEventListener("click", toggleLayout);
});

// Initialize All Functions on Page Load
document.addEventListener("DOMContentLoaded", function () {
  counterAnimation();
  setActiveMenu();
});

// Right sidebar toggle functionality
document.querySelectorAll(".right-bar-toggle").forEach(function (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("right-bar-enabled");
  });
});

// Close the right sidebar when clicking outside of it
document.body.addEventListener("click", function (event) {
  const isClickInside = event.target.closest(".right-bar-toggle, .right-bar");
  if (!isClickInside) {
    document.body.classList.remove("right-bar-enabled");
  }
});

// Toggle light/dark mode based on radio button selection
document
  .querySelectorAll('input[name="layout-mode"]')
  .forEach(function (toggleBtn) {
    toggleBtn.addEventListener("change", function () {
      const selectedMode = document.querySelector(
        'input[name="layout-mode"]:checked',
      ).value;
      document.body.setAttribute("data-layout-mode", selectedMode);
    });
  });

// Navbar Sidebar End ......................

// Filter Select Search Box Js Start................................................................
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".select-box-dropdown");

  dropdowns.forEach(function (dropdown) {
    const dropdownSelected = dropdown.querySelector(
      ".select-dropdown-selected",
    );
    const dropdownItems = dropdown.querySelector(".select-dropdown-items");
    const searchBox = dropdown.querySelector(".select-search-box");
    const icon = dropdown.querySelector(".icon i");

    // Function to toggle visibility of search box based on number of items
    function toggleSearchInput() {
      const itemCount = dropdownItems.querySelectorAll("div").length;
      if (itemCount >= 3) {
        searchBox.style.display = "block";
      } else {
        searchBox.style.display = "none";
      }
    }

    // Function to position the dropdown dynamically
    function positionDropdown() {
      const rect = dropdown.getBoundingClientRect(); // Get the position of the dropdown container
      const dropdownHeight = dropdownItems.offsetHeight;
      const spaceBelow = window.innerHeight - rect.bottom; // Available space below the dropdown
      const spaceAbove = rect.top; // Available space above the dropdown

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        // If there's not enough space below, show the dropdown above
        dropdownItems.style.bottom = `${dropdownHeight + 10}px`; // Add some space between the dropdown and the container
        dropdownItems.style.top = "auto";
      } else {
        // Otherwise, show the dropdown below
        dropdownItems.style.top = "100%";
        dropdownItems.style.bottom = "auto";
      }
    }

    // Toggle dropdown visibility
    dropdownSelected.addEventListener("click", function (e) {
      e.stopPropagation();

      // Close all other dropdowns
      dropdowns.forEach(function (otherDropdown) {
        if (otherDropdown !== dropdown) {
          otherDropdown
            .querySelector(".select-dropdown-items")
            .classList.remove("show");
          otherDropdown
            .querySelector(".icon i")
            .classList.remove("fa-angle-up");
          otherDropdown.querySelector(".icon i").classList.add("fa-angle-down");
        }
      });

      // Toggle current dropdown visibility
      dropdownItems.classList.toggle("show");

      // Toggle icon rotation
      if (dropdownItems.classList.contains("show")) {
        icon.classList.remove("fa-angle-down");
        icon.classList.add("fa-angle-up");
      } else {
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
      }

      // Call function to toggle search input visibility
      toggleSearchInput();

      // Position the dropdown based on available space
      if (dropdownItems.classList.contains("show")) {
        positionDropdown();
      }
    });

    // Filter dropdown items based on search
    searchBox.addEventListener("input", function () {
      const filter = searchBox.value.toLowerCase();
      const items = dropdownItems.querySelectorAll("div");

      items.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });

    // Close the dropdown if clicked outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".select-box-dropdown")) {
        dropdownItems.classList.remove("show");
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
        searchBox.style.display = "none";
      }
    });

    // Select dropdown item
    dropdownItems.addEventListener("click", function (e) {
      if (e.target.tagName === "DIV") {
        dropdownSelected.querySelector("span").textContent =
          e.target.textContent;
        dropdownItems.classList.remove("show");
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
        searchBox.style.display = "none";
      }
    });
  });
});
// Filter Select Search Box Js End........................................................
