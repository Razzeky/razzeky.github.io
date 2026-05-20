/* =========================================================
   GOOGLE CALENDAR EVENTS
========================================================= */

/* SUA API GOOGLE */
const API_KEY = "AIzaSyA1H4PArZKsPn4VqOIBaBSn9zIH_zSpZfA";

/* ID DO CALENDÁRIO */
const CALENDAR_ID = "68829841e5e2805d5cfd4c427301afeee38900f1e14aa26b8aa5e475e092db75@group.calendar.google.com";

/* EVENTOS */
async function loadEvents() {
    try {
        const now = new Date().toISOString();

        // Linha 17 corrigida usando as variáveis corretas:
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${now}`;

        const response = await fetch(url);
        const data = await response.json();
        const events = data.items;

        if (!events || events.length === 0) {
            document.getElementById("nextShowTitle").innerText = "Nenhum show agendado";
            document.getElementById("nextShowLocation").innerText = "Em breve novas datas";
            return;
        }

        /* PRIMEIRO EVENTO (CARD DE DESTAQUE COM COUNTDOWN) */
        const nextEvent = events[0];

        document.getElementById("nextShowTitle").innerText = nextEvent.summary;
        document.getElementById("nextShowLocation").innerText = nextEvent.location || "Location TBA";

/* EXTRAÇÃO DE IMAGEM E LINK DE INGRESSO DA DESCRIÇÃO */
        let image = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1920&auto=format&fit=crop";
        let ticketUrl = "";

        if (nextEvent.description) {
            // Tratamento dinâmico para extrair a imagem da linha
            if (nextEvent.description.includes("image:")) {
                image = nextEvent.description.split("image:")[1].split("\n")[0].trim();
            }
            // Tratamento dinâmico para extrair o link de ingresso da linha
            if (nextEvent.description.includes("ticket:")) {
                ticketUrl = nextEvent.description.split("ticket:")[1].split("\n")[0].trim();
            }
        }

        document.getElementById("nextShowImage").src = image;

        /* ATUALIZAÇÃO DO BOTÃO DE INGRESSOS COMPATÍVEL COM TRADUTOR */
        const ticketBtn = document.getElementById("nextShowTicketBtn");
        if (ticketBtn) {
            if (ticketUrl && (ticketUrl.startsWith("http://") || ticketUrl.startsWith("https://"))) {
                ticketBtn.href = ticketUrl;
                ticketBtn.style.display = "inline-flex"; // Mostra o botão se houver link válido
            } else {
                ticketBtn.style.display = "none"; // Oculta o botão se não houver link
            }
        }

        /* COUNTDOWN */
        if (nextEvent.start && (nextEvent.start.dateTime || nextEvent.start.date)) {
            startCountdown(nextEvent.start.dateTime || nextEvent.start.date);
        }

        /* SLIDER (LISTA COMPLETA DOS PRÓXIMOS CARDS) */
        const track = document.getElementById("eventsTrack");
        if (!track) return;

        track.innerHTML = ""; // Limpa o container antes de colocar os eventos

        events.forEach(event => {
            let eventImage = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop";

            if (event.description && event.description.includes("image:")) {
                eventImage = event.description.split("image:")[1].split("\n")[0].trim();
            }

            const date = new Date(event.start.dateTime || event.start.date);
            const formattedDate = date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short"
            });

            track.innerHTML += `
            <div class="event-card">
                <img src="${eventImage}">
                <div class="event-info">
                    <span class="event-date">${formattedDate}</span>
                    <h4>${event.summary}</h4>
                    <p>${event.location || "Location TBA"}</p>
                </div>
            </div>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar os eventos do Google Agenda:", error);
    }
}

/* COUNTDOWN */
function startCountdown(date) {
    const eventDate = new Date(date).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// Executa o carregamento inicial
loadEvents();

/* =========================================================
   CONTROLE DO SLIDER DE EVENTOS (SETAS)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("eventsTrack");
    const prevBtn = document.querySelector(".prev-events");
    const nextBtn = document.querySelector(".next-events");

    if (!track || !prevBtn || !nextBtn) return;

    // Ajustado para 385px acompanhando o novo tamanho do seu card no CSS
    const scrollAmount = 385; 

    nextBtn.addEventListener("click", () => {
        track.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    prevBtn.addEventListener("click", () => {
        track.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });
});
