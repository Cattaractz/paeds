document.addEventListener("DOMContentLoaded", function() {
    // Navigasjon
    const navItems = {
        'timeplan': 'timeplan.html',
        'kunnskapskilden': 'kunnskap.html',
        'kalkulatorer': 'kalk.html',
        'bilirubin': 'bilirubin.html',
    };

    Object.keys(navItems).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.onclick = () => window.location.href = navItems[id];
    });

    // Nyhetsfeeds - Kun DFTB igjen
    const feeds = [
        {
            url: "https://dontforgetthebubbles.com/feed/",
            containerId: "dftb-posts"
        }
    ];

    function fetchRSS(feed) {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&t=${new Date().getTime()}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const container = document.getElementById(feed.containerId);
                if (!container) return;
                
                container.innerHTML = '';

                if (data.status === 'ok' && data.items.length > 0) {
                    data.items.slice(0, 5).forEach(item => {
                        const date = new Date(item.pubDate).toLocaleDateString('no-NO', {
                            day: 'numeric', month: 'short'
                        });

                        // Renser tekst og lager kort sammendrag
                        const cleanSummary = item.description
                            ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 80) + '...'
                            : 'Ingen beskrivelse tilgjengelig.';

                        container.innerHTML += `
                            <div class="post-item">
                                <a href="${item.link}" target="_blank" class="post-title">${item.title}</a>
                                <p class="post-summary">${cleanSummary}</p>
                                <span class="post-date">${date}</span>
                            </div>
                        `;
                    });
                } else {
                    container.innerHTML = '<p class="error">Kunne ikke hente nyheter.</p>';
                }
            })
            .catch(() => {
                const container = document.getElementById(feed.containerId);
                if (container) container.innerHTML = '<p class="error">Tilkoblingsfeil.</p>';
            });
    }

    feeds.forEach(fetchRSS);
});