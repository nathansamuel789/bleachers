async function searchCharacter() {
    const name = document.getElementById("characterInput").value.trim();
    const container = document.getElementById("characterInfo");

    container.innerHTML = "Searching...";

    if (!name) {
        container.innerHTML = "Enter a character name.";
        return;
    }

    try {
        const res = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`);
        const data = await res.json();

        console.log("API Response:", data); // 👈 Debugging info
        container.innerHTML = "";

        if (data.data && data.data.length > 0) {
            data.data.forEach(character => {
                const card = document.createElement("div");
                card.className = "character-info";

                card.innerHTML = `
                    <h2>${character.name}</h2>
                    <img src="${character.images.jpg.image_url}" alt="${character.name}" />
                    <p><strong>Kanji:</strong> ${character.name_kanji || 'N/A'}</p>
                    <p><strong>Nicknames:</strong> ${character.nicknames.join(', ') || 'None'}</p>
                    <p><strong>About:</strong> ${character.about ? character.about.slice(0, 300) + '...' : 'No description available.'}</p>
                `;

                container.appendChild(card);
            });
        } else {
            container.innerHTML = "Character not found.";
        }
    } catch (error) {
        container.innerHTML = "Failed to load character.";
        console.error("Error fetching character:", error);
    }
}
