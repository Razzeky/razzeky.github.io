/* =========================================================
   GOOGLE CALENDAR EVENTS
========================================================= */

/* SUA API GOOGLE */
const API_KEY = "AIzaSyA1H4PArZKsPn4VqOIBaBSn9zIH_zSpZfA";

/* ID DO CALENDÁRIO */
const CALENDAR_ID = "68829841e5e2805d5cfd4c427301afeee38900f1e14aa26b8aa5e475e092db75@group.calendar.google.com";

/* EVENTOS */
async function loadEvents() {

    const now = new Date().toISOString();

    // CORRIGIDO: Agora a URL usa corretamente as variáveis declaradas acima
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${now}`;

    const response = await fetch(url);
    const data = await response.json();
    const events = data.items;

    if (!events || events.length === 0) {
        // Ajuste opcional: se não houver shows, avisa o usuário em vez de travar no "Loading..."
        document.getElementById("nextShowTitle").innerText = "Nenhum show agendado";
        document.getElementById("nextShowLocation").innerText = "Em breve novas datas";
        return;
    }

    /* PRIMEIRO EVENTO */
    const nextEvent = events[0];

    document.getElementById("nextShowTitle").innerText =
        nextEvent.summary;

    document.getElementById("nextShowLocation").innerText =
        nextEvent.location || "Location TBA";

    /* IMAGEM */

    let image =
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1920&auto=format&fit=crop";

    if (nextEvent.description &&
        nextEvent.description.includes("image:")) {

        image = nextEvent.description
            .split("image:")[1]
            .trim();
    }

    document.getElementById("nextShowImage").src = image;

    /* COUNTDOWN */

    startCountdown(nextEvent.start.dateTime);

    /* SLIDER */

    const track = document.getElementById("eventsTrack");

    events.forEach(event => {

        let eventImage =
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop";

        if (event.description &&
            event.description.includes("image:")) {

            eventImage = event.description
                .split("image:")[1]
                .trim();
        }

        const date = new Date(
            event.start.dateTime
        );

        const formattedDate =
            date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short"
            });

        track.innerHTML += `

        <div class="event-card">

            <img src="${eventImage}">

            <div class="event-info">

                <span class="event-date">
                    ${formattedDate}
                </span>

                <h4>${event.summary}</h4>

                <p>${event.location || "Location TBA"}</p>

            </div>

        </div>

        `;
    });

}

/* COUNTDOWN */

function startCountdown(date) {

    const eventDate = new Date(date).getTime();

    setInterval(() => {

        const now = new Date().getTime();

        const distance = eventDate - now;

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

    }, 1000);

}

loadEvents();
