async function loadTYBWEpisodes() {
  const container = document.getElementById("episodeContainer");
  container.innerHTML = "Loading...";

  try {
    let currentPage = 1;
    let hasNextPage = true;
    const tybwEpisodes = [];

    while (hasNextPage) {
      const res = await fetch(`https://api.jikan.moe/v4/anime/269/episodes?page=${currentPage}`);
      const data = await res.json();

      data.data.forEach(episode => {
        if (episode.mal_id >= 367) {
          tybwEpisodes.push(episode);
        }
      });

      hasNextPage = data.pagination.has_next_page;
      currentPage++;
    }

    container.innerHTML = "";

    tybwEpisodes.forEach(episode => {
      const card = document.createElement("div");
      card.className = "episode-card";

      card.innerHTML = `
        <h2>Episode ${episode.mal_id}: ${episode.title}</h2>
        <p><strong>Aired:</strong> ${episode.aired}</p>
        <p>${episode.synopsis || 'No synopsis available.'}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = "Failed to load episodes.";
    console.error(error);
  }
}

window.onload = loadTYBWEpisodes;
