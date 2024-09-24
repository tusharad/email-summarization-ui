var currentThreadIndex = 0;
var threadTitleSectionHTML = function (threadTitle) {
    return "<div class=\"p-6 border-b bg-dark\" id=\"thread-title\">\n      <h1 class=\"text-2xl font-semibold text-primary\">".concat(threadTitle, "</h1>\n      <p class=\"text-secondary\">Click on any email to view details</p>\n  </div>");
};
var threadEmailSectionHTML = function (threadIndex, index, senderName, senderEmail, emailDate, emailContent, isOpen) {
    return "<div class=\"p-6 border-b bg-white cursor-pointer hover:bg-blue-100\" id=\"email-cont\" onclick=\"toggleEmail(".concat(threadIndex, ", ").concat(index, ")\">\n                <div class=\"flex justify-between items-center mb-4\">\n                    <div class=\"flex items-center\">\n                        <img class=\"h-8 w-8 rounded-full mr-2\" src=\"assets/images/man2.jpeg\" alt=\"Sender Image\">\n                        <div>\n                            <p class=\"font-semibold text-primary\">").concat(senderName, "</p>\n                            <p class=\"text-sm text-secondary\">").concat(senderEmail, "</p>\n                        </div>\n                    </div>\n                    <p class=\"text-sm text-gray-400\">").concat(emailDate, "</p>\n                </div>\n                ").concat(isOpen ? "<div class=\"text-gray-900 mt-4\">".concat(emailContent, "</div>") : "<div class=\"text-gray-500 truncate\">".concat(emailContent.substring(0, 100), "...</div>"), "\n            </div>");
};
var emailThreads = [
    {
        threadTitle: "Email Thread 1",
        emails: [
            {
                sender: "John Doe",
                senderEmail: "john.doe@example.com",
                fromEmail: "tushar.ad@example.com",
                date: "Sept 23, 2024 10:30 AM",
                content: "This is John's first email in the thread. It contains some important details about the project.",
                isOpen: false
            },
            {
                sender: "Jane Smith",
                senderEmail: "jane.smith@example.com",
                fromEmail: "tushar.ad@example.com",
                date: "Sept 23, 2024 10:45 AM",
                content: "This is Jane's response to John. She provides further insights and asks for clarification.",
                isOpen: false
            },
            {
                sender: "John Doe",
                senderEmail: "john.doe@example.com",
                fromEmail: "tushar.ad@example.com",
                date: "Sept 23, 2024 11:00 AM",
                content: "John replies back to Jane with answers to her questions.",
                isOpen: false
            }
        ]
    },
    {
        threadTitle: "Email Thread 2",
        emails: [
            {
                sender: "Alice Johnson",
                senderEmail: "alice.johnson@example.com",
                fromEmail: "tushar.ad@example.com",
                date: "Sept 24, 2024 9:00 AM",
                content: "Alice kicks off the second thread with details on the new product launch.",
                isOpen: false
            },
            {
                sender: "Bob Martin",
                senderEmail: "bob.martin@example.com",
                fromEmail: "tushar.ad@example.com",
                date: "Sept 24, 2024 9:30 AM",
                content: "Bob responds to Alice with feedback and suggestions for improvement.",
                isOpen: false
            }
        ]
    }
];
var openModal = function () {
    document.getElementById('modal').classList.remove('hidden');
    var thread = emailThreads[currentThreadIndex];
    fetch('http://localhost:8000/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(thread)
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
document.addEventListener('DOMContentLoaded', function () {
    openEmailThread();
});
