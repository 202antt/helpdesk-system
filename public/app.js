console.log("App JS loaded successfully");

document.addEventListener("DOMContentLoaded", () => {

    const ticketForm = document.getElementById("ticketForm");
    const ticketInput = document.getElementById("ticketInput");
    const ticketList = document.getElementById("ticketList");
    const searchInput = document.getElementById("searchInput");
    const flashContainer = document.getElementById("flashContainer");

    const API = "https://helpdesk-system-esar.onrender.com/tickets";


    // =============================
    // Flash Message
    // =============================
    function showFlash(message, type = "success") {

        const flash = document.createElement("div");
        flash.className = `flash ${type}`;
        flash.innerText = message;

        flashContainer.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 2500);
    }


    // =============================
    // Render Ticket
    // =============================
    function renderTicket(ticket) {

        const li = document.createElement("li");

        li.dataset.id = ticket._id;
        li.className = "ticket-item";

        li.innerHTML = `
        <span>${ticket.content}</span>
        <small>${new Date(ticket.createdAt).toLocaleString()}</small>
        <button class="delete-btn">Delete</button>
    `;

        ticketList.prepend(li);
    }


    // =============================
    // Load Tickets
    // =============================
    async function loadTickets() {

        ticketList.innerHTML = "";

        try {

            const res = await fetch(API);
            const tickets = await res.json();

            tickets.forEach(renderTicket);

        } catch (err) {

            console.error(err);
            showFlash("Failed to load tickets", "error");

        }
    }


    // =============================
    // Submit Ticket
    // =============================
    ticketForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const content = ticketInput.value.trim();

        if (!content) {
            return showFlash("Please enter a ticket", "error");
        }

        try {

            const res = await fetch(API, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ content })

            });

            const ticket = await res.json();

            if (res.ok) {

                renderTicket(ticket);
                ticketInput.value = "";
                showFlash("Ticket submitted!");

            } else {

                showFlash(ticket.error || "Failed to submit", "error");

            }

        } catch (err) {

            console.error(err);
            showFlash("Server error", "error");

        }

    });


    // =============================
    // Delete Ticket
    // =============================
    ticketList.addEventListener("click", async (e) => {

        if (!e.target.classList.contains("delete-btn")) return;

        const li = e.target.closest("li");
        const id = li.dataset.id;

        try {

            const res = await fetch(`${API}/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (res.ok) {

                li.remove();
                showFlash("Ticket deleted");

            } else {

                showFlash(data.error || "Delete failed", "error");

            }

        } catch (err) {

            console.error(err);
            showFlash("Server error", "error");

        }

    });


    // =============================
    // Search Tickets
    // =============================
    searchInput.addEventListener("input", () => {

        const filter = searchInput.value.toLowerCase();

        const items = ticketList.querySelectorAll(".ticket-item");

        items.forEach(item => {

            const text = item.querySelector("span").textContent.toLowerCase();

            item.style.display = text.includes(filter) ? "flex" : "none";

        });

    });


    // =============================
    // Initial Load
    // =============================
    loadTickets();

});