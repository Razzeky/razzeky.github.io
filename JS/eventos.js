const API_KEY = "AIzaSyA1H4PArZKsPn4VqOIBaBSn9zIH_zSpZfA";
const CALENDAR_ID = "68829841e5e2805d5cfd4c427301afeee38900f1e14aa26b8aa5e475e092db75@group.calendar.google.com";

async function loadEvents() {
    try {
        const now = new Date().toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${now}`;

        const response = await fetch(url);
        const data = await response.json();
        const events = data.items;

        if (!events || events.length === 0) {
            document.getElementById("nextShowTitle").innerText = "Nenhum evento";
            return;
        }

        /* EVENTO PRINCIPAL */
        const nextEvent = events[0];

        document.getElementById("nextShowTitle").innerText = nextEvent.summary;
        document.getElementById("nextShowLocation").innerText = nextEvent.location || "Local a definir";

        let image = "";
        let ticketUrl = "";

        if (nextEvent.description) {
            let clean = nextEvent.description.replace(/<\/?[^>]+(>|$)/g, "\n");

            if (clean.includes("image:"))
                image = clean.split("image:")[1].split("\n")[0].trim();

            if (clean.includes("ticket:"))
                ticketUrl = clean.split("ticket:")[1].split("\n")[0].trim();
        }

        document.getElementById("nextShowImage").src = image;

        const btn = document.getElementById("nextShowTicketBtn");

        if (ticketUrl) {
            btn.href = ticketUrl;
            btn.style.display = "inline-block";
        }

        startCountdown(nextEvent.start.dateTime || nextEvent.start.date);

        /* LISTA */
        const list = document.getElementById("eventsList");
        list.innerHTML = "";

        events.slice(1).forEach(event => {

            const date = new Date(event.start.dateTime || event.start.date);

            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            }).toUpperCase();

            let ticketUrl = "";

            if (event.description && event.description.includes("ticket:")) {
                ticketUrl = event.description.split("ticket:")[1].split("\n")[0].trim();
            }

            list.innerHTML += `
            <div class="event-row">

                <div class="event-date">${formattedDate}</div>

                <div class="event-name">${event.summary}</div>

                <div class="event-location">${event.location || "Local a definir"}</div>

                <div class="event-actions">
                    <button class="btn-event">RSVP</button>
                    ${
                        ticketUrl
                        ? `<a href="${ticketUrl}" target="_blank" class="btn-event">TICKETS</a>`
                        : `<button class="btn-event">NOTIFY</button>`
                    }
                </div>

            </div>
            `;
        });

    } catch (e) {
        console.error(e);
    }
}

/* COUNTDOWN */
function startCountdown(date) {

    const eventDate = new Date(date).getTime();

    setInterval(() => {

        const now = new Date().getTime();
        const diff = eventDate - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        document.getElementById("days").innerText = d;
        document.getElementById("hours").innerText = h;
        document.getElementById("minutes").innerText = m;
        document.getElementById("seconds").innerText = s;

    }, 1000);
}

loadEvents();
