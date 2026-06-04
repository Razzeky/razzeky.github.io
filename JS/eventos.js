async function loadEvents() {
    try {
        const lang = window.currentLang || "pt";

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

        const list = document.getElementById("eventsList");

        if (!list) {
            console.error("Elemento #eventsList não encontrado");
            return;
        }

        list.innerHTML = "";

        if (!events || events.length === 0) {
            list.innerHTML = `<div class="event-row">${getTranslation("noEvents")}</div>`;
            return;
        }

        events.forEach((event, index) => {

            const date = new Date(event.start.dateTime || event.start.date);

            const formattedDate = date.toLocaleDateString(locale, {
                weekday: "short",
                month: "short",
                day: "numeric"
            }).toUpperCase();

            let ticketUrl = extractUrl(event.description, "ticket:");
            if (!ticketUrl) ticketUrl = extractAnyUrl(event.description);

            let countdownHTML = "";

            if (index === 0) {
                startCountdown(event.start.dateTime || event.start.date);

                countdownHTML = `
                <div class="countdown-inline">
                    <span id="days">00</span>d :
                    <span id="hours">00</span>h :
                    <span id="minutes">00</span>m :
                    <span id="seconds">00</span>s
                </div>
                `;
            }

            list.innerHTML += `
            <div class="event-row">

                <div class="event-date">${formattedDate}</div>

                <div class="event-name">
                    ${event.summary}
                    ${countdownHTML}
                </div>

                <div class="event-location">
                    ${event.location || getTranslation("locationFallback")}
                </div>

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

    } catch (e) {
        console.error("Erro ao carregar eventos:", e);
    }
}
