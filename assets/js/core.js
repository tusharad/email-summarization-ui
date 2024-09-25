var currentThreadIndex = 0;
var threadTitleSectionHTML = function (threadTitle) {
    return "<div class=\"p-6 border-b bg-dark\" >\n      <h1 class=\"text-2xl font-semibold text-white\">".concat(threadTitle, "</h1>\n      <div class=\"absolute top-4 right-4\">\n                <button class=\"bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700\"\n                  onclick=\"openModal()\">\n                  Summarize\n                </button>\n              </div>\n  </div>");
};
var threadEmailSectionHTML = function (threadIndex, index, senderName, senderEmail, emailDate, emailContent, isOpen) {
    return "<div class=\"p-6 border-b bg-white cursor-pointer hover:bg-blue-100\" id=\"email-cont\" onclick=\"toggleEmail(".concat(threadIndex, ", ").concat(index, ")\">\n                <div class=\"flex justify-between items-center mb-4\">\n                    <div class=\"flex items-center\">\n                        <img class=\"h-8 w-8 rounded-full mr-2\" src=\"assets/images/").concat(index % 2 === 0 ? 'man2.jpeg' : 'woman1.jpeg', "\" alt=\"Sender Image\">\n                        <div>\n                            <p class=\"font-semibold text-primary\">").concat(senderName, "</p>\n                            <p class=\"text-sm text-secondary\">").concat(senderEmail, "</p>\n                        </div>\n                    </div>\n                    <p class=\"text-sm text-gray-400\">").concat(emailDate, "</p>\n                </div>\n                ").concat(isOpen ? "<pre class=\"text-gray-900 mt-4\">".concat(emailContent, "</pre>") : "<div class=\"text-gray-500 truncate\">".concat(emailContent.substring(0, 100), "...</div>"), "\n            </div>");
};
// const threadTitleSectionHTML = (threadTitle: string): string => {
//   return `
//     <div class="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg" id="thread-title">
//       <h1 class="text-3xl font-bold tracking-wide">${threadTitle}</h1>
//     </div>
//   `;
// }
// const threadEmailSectionHTML = (
//   threadIndex: number
//   , index: number
//   , senderName: string
//   , senderEmail: string
//   , emailDate: string
//   , emailContent: string
//   , isOpen: boolean): string => {
//   return `
//     <div class="p-6 border-b cursor-pointer hover:bg-blue-100 transition-all duration-300 ${isOpen ? 'border-4 border-blue-600 bg-blue-50 shadow-lg rounded-lg' : 'bg-white'}" id="email-cont" onclick="toggleEmail(${threadIndex}, ${index})">
//       <div class="flex justify-between items-center mb-4">
//         <div class="flex items-center">
//           <img class="h-8 w-8 rounded-full mr-2" src="assets/images/${index % 2 === 0 ? 'man2.jpeg' : 'woman1.jpeg'}" alt="Sender Image">
//           <div>
//             <p class="font-semibold text-primary">${senderName}</p>
//             <p class="text-sm text-secondary">${senderEmail}</p>
//           </div>
//         </div>
//         <p class="text-sm text-gray-400">${emailDate}</p>
//       </div>
//       ${isOpen ? `
//         <div class="mt-4">
//           <pre class="text-gray-900">${emailContent}</pre>
//         </div>` : `
//         <div class="text-gray-500 truncate">${emailContent.substring(0, 100)}...</div>`}
//     </div>
//   `;
// }
var emailThreads = [];
var openModal = function () {
    document.getElementById('modal').classList.remove('hidden');
    var thread = emailThreads[currentThreadIndex];
    fetch("http://localhost:5000/summarize/".concat(currentThreadIndex), {
        method: 'POST'
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        document.getElementById('modal-content').textContent = data.summary;
    })
        .catch(function (error) {
        console.error('Error:', error);
        document.getElementById('modal-content').textContent = 'An error occurred. Please try again.';
    });
};
var closeModal = function () { document.getElementById('modal').classList.add('hidden'); };
var openEmailThread = function (threadIndex) {
    if (threadIndex === void 0) { threadIndex = 0; }
    currentThreadIndex = threadIndex;
    var thread = emailThreads[threadIndex];
    var emailContentDiv = document.getElementById("email-content");
    var threadContent = threadTitleSectionHTML(thread.threadTitle);
    thread.emails.forEach(function (email, index) {
        threadContent += threadEmailSectionHTML(threadIndex, index, email.sender, email.senderEmail, email.date, email.content, email.isOpen);
    });
    emailContentDiv.innerHTML = threadContent;
};
// Function to toggle the expansion of a specific email in the thread
var toggleEmail = function (threadIndex, emailIndex) {
    var email = emailThreads[threadIndex].emails[emailIndex];
    email.isOpen = !email.isOpen;
    openEmailThread(threadIndex);
};
function truncateDateTime(dateStr) {
    var date = new Date(dateStr);
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var day = days[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes().toString();
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }
    var period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hours to 12
    var time = "".concat(hours, ":").concat(minutes, " ").concat(period);
    return "".concat(day, ", ").concat(time);
}
var generateSidebarHTML = function () {
    var sidebar = document.getElementById('email-sidebar');
    sidebar.innerHTML = ''; // Clear the existing content
    emailThreads.forEach(function (thread, index) {
        var truncatedContent = thread.emails.length > 0 ? thread.emails[0].content.substring(0, 30) + '...' : 'No content available';
        var timeOfEmail = thread.emails.length > 0 ? truncateDateTime(thread.emails[0].date) : 'Tue, 8:00 PM';
        var sidebarItemHTML = "\n      <li class=\"mt-0.5 w-full\">\n        <div\n          class=\"py-2.7 bg-blue-500/13 text-sm ease-nav-brand my-0 mx-0 flex items-center hover:bg-blue-800 hover:text-white whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors\"\n          onclick=\"openEmailThread(".concat(index, ")\">\n          <img class=\"h-10 w-10 rounded-full mr-4\" src=\"assets/images/").concat(index % 2 === 0 ? 'man2.jpeg' : 'woman1.jpeg', "\" alt=\"Sender Image\">\n          <div class=\"flex-1\">\n            <div class=\"font-semibold\">").concat(thread.threadTitle, "</div>\n            <div class=\"text-gray-400 text-sm truncate\">").concat(truncatedContent, "</div>\n          </div>\n\n        </div>\n      </li>\n    ");
        sidebar.innerHTML += sidebarItemHTML;
    });
};
var fetchEmailThreads = function () {
    fetch('http://localhost:5000/all_email_threads')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        emailThreads = data; // Set the fetched email threads
        openEmailThread(); // Open the first email thread by default
        generateSidebarHTML();
        document.getElementById('loading-spinner').classList.add('hidden');
        document.getElementById('email-content').classList.remove('hidden');
    })
        .catch(function (error) {
        console.error('Error fetching email threads:', error);
        // Hide the spinner and show an error message
        document.getElementById('loading-spinner').classList.add('hidden');
        document.getElementById('email-content').innerHTML = 'Failed to load email threads. Please try again later.';
        document.getElementById('email-content').classList.remove('hidden');
    });
};
document.addEventListener('DOMContentLoaded', function () {
    fetchEmailThreads();
});
