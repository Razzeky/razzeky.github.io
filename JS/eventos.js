const API_KEY = "AIzaSyA1H4PArZKsPn4VqOIBaBSn9zIH_zSpZfA"; 
const CALENDAR_ID = "68829841e5e2805d5cfd4c427301afeee38900f1e14aa26b8aa5e475e092db75@group.calendar.google.com";

/* =========================================
   FUNÇÃO PARA EXTRAIR URL SEGURA
========================================= */
function extractUrl(text, key) {
    if (!text) return "";

    let clean = text.replace(/<\/?[^>]+(>|$)/g, "\n");

    if (!clean.includes(key)) return "";

    let raw = clean.split(key)[1].split("\n")[0].trim();

    raw = raw.replace(/\s/g, "");

    if (raw && !raw.startsWith("http")) {
        raw = "https://" + raw;
    }

    try {
        new URL(raw);
        return raw;
    } catch {
        return "";
    }
}

/* =========================================
   LOAD EVENTS
========================================= */
async function loadEvents() {
    try {
        const now = new Date().toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${now}`;

        const response = await fetch(url);
        const data = await response.json();
        const events = data.items;

        if (!events || events.length === 0) {
            document.getElementById("nextShowTitle").innerText = "Nenhum evento";
            document.getElementById("nextShowLocation").innerText = "Em breve";
            return;
        }

        /* =========================================
           EVENTO PRINCIPAL
        ========================================= */
        const nextEvent = events[0];

        document.getElementById("nextShowTitle").innerText = nextEvent.summary;
        document.getElementById("nextShowLocation").innerText = nextEvent.location || "Local a definir";

        let image = extractUrl(nextEvent.description, "image:");
        let ticketUrl = extractUrl(nextEvent.description, "ticket:");

        document.getElementById("nextShowImage").src = image || "";

        const btn = document.getElementById("nextShowTicketBtn");

        if (ticketUrl) {
            btn.href = ticketUrl;
            btn.target = "_blank";
            btn.rel = "noopener noreferrer";
            btn.innerText = "COMPRAR INGRESSO"; // 🔥 TEXTO NOVO
            btn.style.display = "inline-flex";
        } else {
            btn.style.display = "none";
        }

        /* =========================================
           COUNTDOWN
        ========================================= */
        startCountdown(nextEvent.start.dateTime || nextEvent.start.date);

        /* =========================================
           LISTA DE EVENTOS
        ========================================= */
        const list = document.getElementById("eventsList");
        list.innerHTML = "";

        events.slice(1).forEach(event => {

            const date = new Date(event.start.dateTime || event.start.date);

            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            }).toUpperCase();

            let ticketUrl = extractUrl(event.description, "ticket:");

            list.innerHTML += `
            <div class="event-row">

                <div class="event-date">${formattedDate}</div>

                <div class="event-name">${event.summary}</div>

                <div class="event-location">${event.location || "Local a definir"}</div>

                <div class="event-actions">
                    
                    ${
                        ticketUrl
                        ? `<a href="${ticketUrl}" target="_blank" rel="noopener noreferrer" class="btn-event buy">COMPRAR INGRESSO</a>`
                        : `<button class="btn-event disabled">EM BREVE</button>`
                    }

                </div>

            </div>
            `;
        });

    } catch (e) {
        console.error("Erro ao carregar eventos:", e);
    }
}

/* =========================================
   COUNTDOWN
========================================= */
let countdownInterval;

function startCountdown(date) {

    if (countdownInterval) clearInterval(countdownInterval);

    const eventDate = new Date(date).getTime();

    countdownInterval = setInterval(() => {

        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        document.getElementById("days").innerText = String(d).padStart(2, "0");
        document.getElementById("hours").innerText = String(h).padStart(2, "0");
        document.getElementById("minutes").innerText = String(m).padStart(2, "0");
        document.getElementById("seconds").innerText = String(s).padStart(2, "0");

    }, 1000);
}

/* =========================================
   INIT
========================================= */
loadEvents();
