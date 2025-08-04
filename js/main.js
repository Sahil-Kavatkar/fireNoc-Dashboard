// // js/main.js

// document.addEventListener('DOMContentLoaded', () => {
//     const sidebar = document.querySelector('.sidebar');
//     const menuToggle = document.querySelector('.menu-toggle');
//     const navItems = document.querySelectorAll('.nav-item');
//     const contentSections = document.querySelectorAll('.content-section');

//     // Initialize charts when the DOM is ready
//     if (typeof initializeCharts === 'function') {
//         initializeCharts();
//     }

//     // Toggle sidebar on menu button click (for mobile/tablet)
//     menuToggle.addEventListener('click', () => {
//         sidebar.classList.toggle('expanded');
//         document.body.classList.toggle('sidebar-open'); // To prevent body scroll
//     });

//     // Hide sidebar on click outside (for mobile overlay)
//     document.addEventListener('click', (event) => {
//         if (sidebar.classList.contains('expanded') &&
//             !sidebar.contains(event.target) &&
//             !menuToggle.contains(event.target)) {
//             sidebar.classList.remove('expanded');
//             document.body.classList.remove('sidebar-open');
//         }
//     });

//     // Handle navigation clicks
//     navItems.forEach(item => {
//         item.addEventListener('click', (event) => {
//             event.preventDefault(); // Prevent default link behavior

//             // Remove active class from all nav items
//             navItems.forEach(nav => nav.classList.remove('active'));
//             // Add active class to the clicked item
//             item.classList.add('active');

//             // Determine which content section to show
//             const category = item.dataset.category;

//             // Hide all content sections
//             contentSections.forEach(section => section.classList.remove('active'));

//             // Show the relevant content section
//             const targetSection = document.getElementById(`${category}-content`);
//             if (targetSection) {
//                 targetSection.classList.add('active');
//                 // If it's an application list, populate it
//                 if (category !== 'dashboard') {
//                     populateApplicationList(category);
//                 }
//             }

//             // Collapse sidebar after selection on mobile
//             if (window.innerWidth <= 768) {
//                 sidebar.classList.remove('expanded');
//                 document.body.classList.remove('sidebar-open');
//             }
//         });
//     });

//     // Function to populate application lists
//     function populateApplicationList(category) {
//         let filteredApplications = [];
//         if (category === 'all') {
//             filteredApplications = sampleApplications;
//         } else {
//             filteredApplications = sampleApplications.filter(app => app.status === category.replace('-', ''));
//         }

//         const listContainer = document.getElementById(`${category}-list`);
//         if (!listContainer) return; // Exit if container not found

//         listContainer.innerHTML = ''; // Clear previous content

//         if (filteredApplications.length === 0) {
//             listContainer.innerHTML = '<p class="no-data">No applications found for this category.</p>';
//             return;
//         }

//         filteredApplications.forEach(app => {
//             const listItem = document.createElement('div');
//             listItem.classList.add('application-list-item');

//             // Determine status class for styling
//             const statusClass = app.status; // already clean 'approved', 'under-review', 'rejected'

//             listItem.innerHTML = `
//                 <div class="status-indicator ${statusClass}"></div>
//                 <div class="app-details">
//                     <div class="app-id">${app.id}</div>
//                     <div class="app-name">${app.buildingName}</div>
//                     <div class="app-date">Date: ${app.date}</div>
//                 </div>
//                 <span class="app-status ${statusClass}">${app.status.replace('-', ' ')}</span>
//             `;
//             listContainer.appendChild(listItem);
//         });
//     }

//     // Initialize dashboard view on load
//     document.querySelector('.nav-item[data-category="dashboard"]').click(); // Simulate click on dashboard

//     // Automatically collapse sidebar on larger screens
//     function handleSidebarCollapse() {
//         if (window.innerWidth > 992) {
//             sidebar.classList.remove('expanded'); // Ensure it's not 'expanded' state
//             sidebar.classList.remove('collapsed'); // Remove collapsed to ensure full width
//             document.body.classList.remove('sidebar-open'); // Just in case
//         } else if (window.innerWidth > 768 && window.innerWidth <= 992) {
//             sidebar.classList.add('collapsed'); // Collapse on medium screens
//             sidebar.classList.remove('expanded');
//             document.body.classList.remove('sidebar-open');
//         } else { // Small screens
//             sidebar.classList.remove('collapsed'); // No collapse, rely on 'expanded' toggle
//             sidebar.classList.remove('expanded');
//             document.body.classList.remove('sidebar-open');
//         }
//     }

//     // Call on load and resize
//     window.addEventListener('resize', handleSidebarCollapse);
//     handleSidebarCollapse(); // Initial call
// });


  // const applications = [
  //   { id: "NOC-001", name: "Skyline Towers", address: "123 MG Road, Mumbai", status: "approved" },
  //   { id: "NOC-002", name: "Sunset Residency", address: "56 Palm Street, Pune", status: "under-review" },
  //   { id: "NOC-003", name: "Green Valley Complex", address: "89 Hill View, Nashik", status: "rejected" },
  //   { id: "NOC-004", name: "Ocean Pearl", address: "78 Marine Drive, Mumbai", status: "approved" },
  //   { id: "NOC-005", name: "Hilltop Residency", address: "22 Forest Lane, Lonavala", status: "under-review" }
  // ];

//   function renderApplications(category) {
//   const listId = `${category}-list`;
//   const listContainer = document.getElementById(listId);
//   if (!listContainer) return;

//   listContainer.innerHTML = "";

//   const filtered = category === "all" ? applications : applications.filter(app => app.status === category);

//   filtered.forEach(app => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${app.id}</td>
//       <td>${app.name}</td>
//       <td>${app.address}</td>
//       <td><span class="status-badge status-${app.status}">${app.status.replace("-", "")}</span></td>
//       ${category === "under-review" 
//   ? `<td><button class="assign-btn">Assign</button></td>` 
//   : `<td><strong>Done</strong> <i class="fas fa-check-circle fa-lg" style="color: green; margin-left: 5px;"></i></td>`}

//     `;
//     listContainer.appendChild(tr);
//   });
// }

async function fetchAndRenderApplications() {
  const res = await fetch('/api/buildings/under-review');
  const applications = await res.json();

  const listContainer = document.getElementById('under-review-list');
  listContainer.innerHTML = '';

  applications.forEach(app => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${app.buildingId}</td>
      <td>${app.name}</td>
      <td>${app.address.street}, ${app.address.city}</td>
      <td><span class="status-badge status-underreview">Under Review</span></td>
      <td><button class="assign-btn" data-id="${app._id}" data-name="${app.name}">Assign</button></td>
    `;
    listContainer.appendChild(tr);
  });
}



  document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const contentSections = document.querySelectorAll(".content-section");

    if (typeof initializeCharts === 'function') {
        initializeCharts();
    }

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        // Set active nav
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        // Show correct content
        const category = item.dataset.category;
        contentSections.forEach(section => section.classList.remove("active"));
        document.getElementById(`${category}-content`).classList.add("active");

        // Populate table
        // renderApplications(category);
        fetchAndRenderApplications(); // Call on load
      });
    });

    // Default load
    renderApplications("all");
  });

let currentBuildingId = null;

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('assign-btn')) {
    currentBuildingId = e.target.dataset.id;
    const res = await fetch('/api/users/officers');
    const officers = await res.json();

    const officerList = document.getElementById('officer-list');
    officerList.innerHTML = '';

    officers.forEach(officer => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${officer.name} - ${officer.employeeId}
        <button onclick="assignOfficer('${officer._id}')">Assign</button>
      `;
      officerList.appendChild(li);
    });

    document.getElementById('officerModal').style.display = 'block';
  }
});

function closeModal() {
  document.getElementById('officerModal').style.display = 'none';
}

async function assignOfficer(officerId) {
  const res = await fetch('/api/assign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ officerId, buildingId: currentBuildingId })
  });

  const result = await res.json();
  if (result.success) {
    alert('Assigned successfully');
    closeModal();
    fetchAndRenderApplications();
  } else {
    alert('Assignment failed');
  }
}

