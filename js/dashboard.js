// For testing purposes - temporarily bypass authentication
// if (!localStorage.getItem('isAuthenticated')) {
//     window.location.href = 'index.html';
// }
localStorage.setItem('isAuthenticated', 'true');

// API Configuration
const API_BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

// State Management
let issues = [];
let filteredIssues = [];
let currentTab = 'all';

// DOM Elements
const issuesContainer = document.getElementById('issuesContainer');
const issueModal = document.getElementById('issueModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const issueCount = document.getElementById('issueCount');
const openCount = document.getElementById('openCount');
const closedCount = document.getElementById('closedCount');
const noIssuesMessage = document.getElementById('noIssuesMessage');
const tabAll = document.getElementById('tabAll');
const tabOpen = document.getElementById('tabOpen');
const tabClosed = document.getElementById('tabClosed');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    console.log('tabAll:', tabAll);
    console.log('tabOpen:', tabOpen);
    console.log('tabClosed:', tabClosed);
    loadIssues();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Tab listeners
    tabAll.addEventListener('click', function() {
        console.log('Tab All clicked');
        switchTab('all');
    });
    tabOpen.addEventListener('click', function() {
        console.log('Tab Open clicked');
        switchTab('open');
    });
    tabClosed.addEventListener('click', function() {
        console.log('Tab Closed clicked');
        switchTab('closed');
    });

    // Search listeners
    searchInput.addEventListener('input', handleSearch);
    mobileSearchInput.addEventListener('input', handleSearch);

    // Modal listeners
    closeModal.addEventListener('click', closeModalHandler);
    issueModal.addEventListener('click', function(e) {
        if (e.target === issueModal) {
            closeModalHandler();
        }
    });

    // Keyboard listener for closing modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('Escape key pressed');
            closeModalHandler();
        }
    });

    // Logout listener
    logoutBtn.addEventListener('click', logout);
}

// Load issues from API
async function loadIssues() {
    try {
        const response = await fetch(`${API_BASE_URL}/issues`);
        const data = await response.json();
        issues = data.data;
        console.log('Issues:', issues);
        filteredIssues = [...issues];
        filterIssues();
        updateStats();
        renderIssues();
    } catch (error) {
        console.error('Error loading issues:', error);
        showError('Failed to load issues');
    }
}

// Switch tabs
function switchTab(tab) {
    currentTab = tab;

    // Update tab styles
    tabAll.className = tab === 'all' ? 'tab-active px-6 py-2 rounded-lg font-medium whitespace-nowrap' : 'tab-inactive px-6 py-2 rounded-lg font-medium whitespace-nowrap';
    tabOpen.className = tab === 'open' ? 'tab-active px-6 py-2 rounded-lg font-medium whitespace-nowrap' : 'tab-inactive px-6 py-2 rounded-lg font-medium whitespace-nowrap';
    tabClosed.className = tab === 'closed' ? 'tab-active px-6 py-2 rounded-lg font-medium whitespace-nowrap' : 'tab-inactive px-6 py-2 rounded-lg font-medium whitespace-nowrap';

    filterIssues();
    renderIssues();
}

// Filter issues based on current tab and search
function filterIssues() {
    let filtered = [...issues];

    // Filter by tab
    if (currentTab === 'open') {
        filtered = filtered.filter(issue => issue.status.toLowerCase() === 'open');
    } else if (currentTab === 'closed') {
        filtered = filtered.filter(issue => issue.status.toLowerCase() === 'closed');
    }

    console.log('Current tab:', currentTab, 'Filtered issues:', filtered.length);

    // Filter by search
    const searchTerm = searchInput.value.toLowerCase() || mobileSearchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(issue =>
            issue.title.toLowerCase().includes(searchTerm) ||
            issue.description.toLowerCase().includes(searchTerm) ||
            issue.labels.some(label => label.toLowerCase().includes(searchTerm))
        );
    }

    filteredIssues = filtered;
    updateStats();
}

// Handle search
function handleSearch() {
    filterIssues();
    renderIssues();
}

// Update statistics
function updateStats() {
    issueCount.textContent = filteredIssues.length;
    const openIssues = filteredIssues.filter(issue => issue.status.toLowerCase() === 'open').length;
    const closedIssues = filteredIssues.filter(issue => issue.status.toLowerCase() === 'closed').length;
    openCount.textContent = `${openIssues} Open`;
    closedCount.textContent = `${closedIssues} Closed`;
}

// Render issues
function renderIssues() {
    issuesContainer.innerHTML = '';

    if (filteredIssues.length === 0) {
        noIssuesMessage.classList.remove('hidden');
        return;
    }

    noIssuesMessage.classList.add('hidden');

    filteredIssues.forEach(issue => {
        const card = createIssueCard(issue);
        issuesContainer.appendChild(card);
    });
}

// Create issue card
function createIssueCard(issue) {
    const card = document.createElement('div');
    const statusIcon = issue.status.toLowerCase() === 'open' ? 'assets/Open-Status.png' : 'assets/Closed- Status .png';
    const priority = issue.priority;
    let priorityClass = '';
    if (priority === 'High') {
        priorityClass = 'bg-red-100 text-red-700';
    } else if (priority === 'Medium') {
        priorityClass = 'bg-yellow-100 text-yellow-700';
    } else {
        priorityClass = 'bg-gray-100 text-gray-700';
    }

    card.className = `bg-white rounded-lg shadow-md p-4 flex-1 border-t-4 ${issue.status.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}`;

    card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <img src="${statusIcon}" alt="${issue.status}" class="w-6 h-6">
            <span class="px-3 py-1 text-sm font-medium rounded-full ${priorityClass}">${priority.toUpperCase()}</span>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">${capitalizeFirstLetter(issue.title)}</h3>

        <p class="text-sm text-gray-600 mb-4 line-clamp-3">${issue.description}</p>

        <div class="flex flex-wrap gap-2 mb-4">
    ${issue.labels.map(label => {
        let labelClass = '';

        if (label.toLowerCase() === 'bug') {
            labelClass = 'bg-red-100 text-red-600 border border-red-300';
        }
        else if (label.toLowerCase() === 'help wanted') {
            labelClass = 'bg-yellow-100 text-yellow-700 border border-yellow-300';
        }
        else if (label.toLowerCase() === 'enhancement') {
            labelClass = 'bg-green-100 text-green-700 border border-green-300';
        }
        else {
            labelClass = 'bg-blue-100 text-blue-700 border border-blue-300';
        }

        return `
            <span class="px-3 py-1 text-xs font-medium rounded-full ${labelClass}">
                ${label.toUpperCase()}
            </span>
        `;
    }).join('')}
</div>

        <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="text-sm text-gray-500">
                <div class="font-medium">${issue.author}</div>
                <div class="text-xs">${formatDate(issue.createdAt)}</div>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openIssueModal(issue));

    return card;
}

// Open issue modal
async function openIssueModal(issue) {
    issueModal.classList.remove('hidden');

    // Load issue details from API
    try {
        const response = await fetch(`${API_BASE_URL}/issue/${issue.id}`);
        const data = await response.json();

        renderModal(data.issue);
    } catch (error) {
        console.error('Error loading issue details:', error);
        renderModal(issue);
    }
}

// Render modal content
function renderModal(issue) {
    const statusBadgeClass = issue.status.toLowerCase() === 'open'
        ? 'bg-green-100 text-green-700'
        : 'bg-gray-100 text-gray-700';

    modalContent.innerHTML = `
        <div class="space-y-6">

            <!-- Title -->
            <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">${issue.title}</h2>

                <div class="flex items-center gap-3 text-gray-600 text-sm">
                    <span class="px-3 py-1 rounded-full ${statusBadgeClass}">
                        ${issue.status}
                    </span>

                    <span>•</span>

                    <span>Opened by ${issue.author}</span>

                    <span>•</span>

                    <span>${formatDate(issue.createdAt)}</span>
                </div>
            </div>

            <!-- Labels -->
            <div class="flex flex-wrap gap-2">
                ${issue.labels.map(label => {

                    let style = '';

                    if (label.toLowerCase() === 'bug') {
                        style = 'bg-red-100 text-red-600 border border-red-300';
                    }
                    else if (label.toLowerCase() === 'help wanted') {
                        style = 'bg-yellow-100 text-yellow-700 border border-yellow-300';
                    }
                    else if (label.toLowerCase() === 'enhancement') {
                        style = 'bg-green-100 text-green-700 border border-green-300';
                    }

                    return `
                        <span class="px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${style}">
                            ${label.toUpperCase()}
                        </span>
                    `;
                }).join('')}
            </div>

            <!-- Description -->
            <p class="text-gray-600 leading-relaxed">
                ${issue.description}
            </p>

            <!-- Assignee + Priority box -->
            <div class="bg-gray-100 rounded-xl p-6 grid grid-cols-2 gap-6">

                <div>
                    <p class="text-gray-500 text-sm mb-1">Assignee:</p>
                    <p class="font-semibold text-gray-800">${issue.author}</p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm mb-1">Priority:</p>
                    <span class="px-4 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        ${issue.priority.toUpperCase()}
                    </span>
                </div>

            </div>

            <!-- Close button -->
            <div class="flex justify-end">
                <button id="closeModalBtn"
                    class="px-6 py-2 bg-[#4A00FF] text-white font-semibold rounded-lg">
                    Close
                </button>
            </div>

        </div>
    `;

    document
        .getElementById('closeModalBtn')
        .addEventListener('click', closeModalHandler);
}

// Close modal
function closeModalHandler() {
    console.log('Close modal button clicked');
    issueModal.classList.add('hidden');
}

// Logout
function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'index.html';
}

// Capitalize first letter of each word
function capitalizeFirstLetter(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Show error
function showError(message) {
    issuesContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Error</h3>
            <p class="text-gray-600">${message}</p>
        </div>
    `;
}
