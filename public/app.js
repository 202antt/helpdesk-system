// app.js
const ticketInput = document.getElementById('ticketInput');
const submitBtn = document.getElementById('submitBtn');
const ticketList = document.getElementById('ticketList');
const searchInput = document.getElementById('searchInput');
const flash = document.getElementById('flash');

function showFlash(message, type = 'success') {
    flash.textContent = message;
    flash.className = `flash ${type}`;
    flash.style.opacity = '1';
    setTimeout(() => flash.style.opacity = '0', 2000);
}

// Render tickets
function renderTickets(tickets, filter = '') {
    ticketList.innerHTML = '';
    const filtered = tickets
        .filter(t => t.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => a.timestamp - b.timestamp);

    if (!filtered.length) {
        const li = document.createElement('li');
        li.textContent = filter ? 'No tickets match your search.' : 'No tickets yet.';
        li.className = 'no-ticket';
        ticketList.appendChild(li);
        return;
    }

    filtered.forEach(ticket => {
        const li = document.createElement('li');
        li.className = 'ticket-item';
        li.dataset.id = ticket._id;
        li.innerHTML = `
      <span class="ticket-content">${ticket.content}</span>
      <span class="ticket-timestamp">${new Date(ticket.timestamp).toLocaleString()}</span>
      <button class="delete-btn">Delete</button>
    `;
        ticketList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', async () => {
            await fetch(`/tickets/${ticket._id}`, { method: 'DELETE' });
            loadTickets(searchInput.value);
            showFlash('Ticket deleted', 'error');
        });
    });
}

// Load tickets from server
async function loadTickets(filter = '') {
    const res = await fetch('/tickets');
    const tickets = await res.json();
    renderTickets(tickets, filter);
}

// Submit ticket
submitBtn.addEventListener('click', async () => {
    const content = ticketInput.value.trim();
    if (!content) return showFlash('Ticket cannot be empty', 'error');

    await fetch('/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });

    ticketInput.value = '';
    loadTickets(searchInput.value);
    showFlash('Ticket submitted');
});

// Search tickets
searchInput.addEventListener('input', () => {
    loadTickets(searchInput.value);
});

// Initial load
loadTickets();