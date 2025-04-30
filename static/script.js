let socket;
let username = "";

function startChat() {
  const input = document.getElementById("username").value.trim();
  if (!/^[a-zA-Z]{3,8}$/.test(input)) {
    alert("Name must be 3–8 letters with no symbols.");
    return;
  }
  username = input;
  document.getElementById("chatBox").classList.remove("hidden");
  socket = io();
  socket.on('receive_message', data => {
    const div = document.createElement("div");
    div.textContent = `${data.username}: ${data.message}`;
    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop = 9999;
  });
}

function sendMessage() {
  const msg = document.getElementById("msgInput").value.trim();
  if (!msg) return;
  socket.emit('send_message', { username, message: msg });
  document.getElementById("msgInput").value = "";
}
