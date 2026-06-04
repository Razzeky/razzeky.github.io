const API_KEY = "AIzaSyA1H4PArZKsPn4VqOIBaBSn9zIH_zSpZfA"; 
const CALENDAR_ID = "68829841e5e2805d5cfd4c427301afeee38900f1e14aa26b8aa5e475e092db75@group.calendar.google.com";

/* =========================================
   TRADUÇÕES
========================================= */
function getTranslation(key) {
   const lang = window.currentLang || "pt";

    const translations = {
        buy: {
            pt: "COMPRAR INGRESSO",
            en: "BUY TICKET",
            es: "COMPRAR ENTRADA"
        },
        soon: {
            pt: "EM BREVE",
            en: "COMING SOON",
            es: "PRÓXIMAMENTE"
        },
        noEvents: {
            pt: "Nenhum evento",
            en: "No events",
            es: "Sin eventos"
        },
        locationFallback: {
            pt: "Local a definir",
            en: "Location TBD",
            es: "Ubicación a definir"
        }
    };

    return translations[key][lang];
}
/* =========================================
   FUNÇÃO PARA EXTRAIR URL
========================================= */
function extractUrl(text, key) {
    if (!text) return "";

    let clean = text.replace(/<\/?[^>]+(>|$)/g, "\n");

    if (!clean.includes(key)) return "";

    let raw = clean.split(key)[1].split("\n")[0].trim();

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
   EXTRAÇÃO UNIVERSAL (🔥 resolve seu bug)
========================================= */
function extractAnyUrl(text) {
    if (!text) return "";

    const clean = text.replace(/<\/?[^>]+(>|$)/g, " ");
    const match = clean.match(/https?:\/\/[^\s"]+/);

    return match ? match[0] : "";
}

/* =========================================
   LOAD EVENTS
========================================= */
async function loadEvents() {
    try {
        const lang = window.currentLang || "pt";
        const t = textMap[lang];

        const localeMap = {
            pt: "pt-BR",
            en: "en-US",
            es: "es-ES"
        };

        const locale = localeMap[lang];

        const now = new Date().toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${now}`;

        const response = await fetch(url);
        const data = await response.json();
        const events = data.items;

        if (!events || events.length === 0) {
            document.getElementById("nextShowTitle").innerText = getTranslation("noEvents");
            document.getElementById("nextShowLocation").innerText = getTranslation("soon");
            return;
        }

const list = document.getElementById("eventsList");
list.innerHTML = "";

events.forEach((event, index) => {

    const date = new Date(event.start.dateTime || event.start.date);

    const formattedDate = date.toLocaleDateString(locale, {
        weekday: "short",
        month: "short",
        day: "numeric"
    }).toUpperCase();

    let ticketUrl = extractUrl(event.description, "ticket:");

    if (!ticketUrl) {
        ticketUrl = extractAnyUrl(event.description);
    }

  
    if (index === 0) {
        startCountdown(event.start.dateTime || event.start.date);
    }

    list.innerHTML += `
    <div class="event-row ${index === 0 ? 'next-event-highlight' : ''}">

        <div class="event-date">${formattedDate}</div>

        <div class="event-name">${event.summary}</div>

        <div class="event-location">${event.location || getTranslation("locationFallback")}</div>

        <div class="event-actions">
            
            ${
                ticketUrl
                ? `<a href="${ticketUrl}" target="_blank" class="btn-event buy">${getTranslation("buy")}</a>`
                : `<button class="btn-event disabled">${getTranslation("soon")}</button>`
            }

        </div>

    </div>
    `;
});

        /* =========================================
           LISTA DE EVENTOS
        ========================================= */
        const list = document.getElementById("eventsList");
        list.innerHTML = "";

        events.slice(1).forEach(event => {

            const date = new Date(event.start.dateTime || event.start.date);

            const formattedDate = date.toLocaleDateString(locale, {
                weekday: "short",
                month: "short",
                day: "numeric"
            }).toUpperCase();

            let ticketUrl = extractUrl(event.description, "ticket:");

            if (!ticketUrl) {
                ticketUrl = extractAnyUrl(event.description);
            }

            list.innerHTML += `
            <div class="event-row">

                <div class="event-date">${formattedDate}</div>

                <div class="event-name">${event.summary}</div>

                <div class="event-location">${event.location || getTranslation("locationFallback")}</div>

                <div class="event-actions">
                    
                    ${
                        ticketUrl
                        ? `<a href="${ticketUrl}" target="_blank" rel="noopener noreferrer" class="btn-event buy">${getTranslation("buy")}</a>`
                        : `<button class="btn-event disabled">${getTranslation("soon")}</button>`
                    }

                </div>

            </div>
            `;
        });

    } catch (e) {
        console.error("Erro ao carregar eventos:", e);
    }
}


list.innerHTML += `
<div class="event-row ${index === 0 ? 'next-event-highlight' : ''}">

    <div class="event-date">${formattedDate}</div>

    <div class="event-name">${event.summary}</div>

    <div class="event-location">${event.location || getTranslation("locationFallback")}</div>

    <div class="event-actions">
        
        ${
            ticketUrl
            ? `<a href="${ticketUrl}" target="_blank" class="btn-event buy">${getTranslation("buy")}</a>`
            : `<button class="btn-event disabled">${getTranslation("soon")}</button>`
        }

    </div>

</div>
`;
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
