const ticketList = document.getElementById('ticketList')
const input = document.getElementById('issueInput')

// Load tickets on page load
window.onload = async () => {
    const res = await fetch('/tickets')
    const data = await res.json()
    data.forEach(ticket => addTicketToDOM(ticket))
}

// Submit ticket
async function submitTicket() {
    const ticket = input.value
    if (ticket.trim() === '') return

    const res = await fetch('/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket })
    })

    if (res.ok) {
        const data = await res.json()
        addTicketToDOM(data.ticket)
        input.value = ''
    }
}

// Add ticket to the page
function addTicketToDOM(ticket) {
    const li = document.createElement('li')
    li.textContent = ticket.text ? ticket.text : ticket

    // Create delete button
    const delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.classList.add('delete-btn')
    delBtn.onclick = async () => {
        const res = await fetch(`/tickets/${ticket._id}`, { method: 'DELETE' })
        if (res.ok) li.remove()
    }

    li.appendChild(delBtn)
    ticketList.appendChild(li)
}