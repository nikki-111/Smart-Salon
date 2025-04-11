function sendMessage() {
    const input = document.getElementById("user_input");
    const message = input.value.trim();
    if (!message) return;

    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<div class='msg user'><b>You:</b> ${message}</div>`;

    fetch(`/chatbot/get_response/?message=${encodeURIComponent(message)}`)
        .then(res => res.json())
        .then(data => {
            messagesDiv.innerHTML += `<div class='msg bot'><b>Bot:</b> ${data.response}</div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });

    input.value = '';
}
document.getElementById("user_input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
