// Chat widget logic
async function checkLogin() {
  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'ping' })
  });
  const data = await res.json();
  if (res.status === 401 || data.error === 'Not authenticated') {
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('logout').classList.add('hidden');
    document.getElementById('message').disabled = true;
    document.getElementById('send').disabled = true;
    document.getElementById('messages').innerHTML = '<div style="color:#d73a49">Please login to start chatting.</div>';
  } else {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('logout').classList.remove('hidden');
    document.getElementById('message').disabled = false;
    document.getElementById('send').disabled = false;
    document.getElementById('messages').innerHTML = '';
  }
}

document.getElementById('login').onclick = function() {
  window.location.href = '/auth/github';
};

document.getElementById('logout').onclick = async function() {
  const res = await fetch('/auth/logout');
  if (res.ok) {
    checkLogin();
  }
};

document.getElementById('send').onclick = async function() {
  const msg = document.getElementById('message').value;
  if (!msg) return;
  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  const messages = document.getElementById('messages');
  messages.innerHTML += `<div><b>You:</b> ${msg}</div>`;
  messages.innerHTML += `<div><b>Bot:</b> ${data.reply || data.error}</div>`;
  document.getElementById('message').value = '';
};
// Evento Enter para enviar mensaje
document.getElementById('message').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('send').click();
  }
});

checkLogin();
