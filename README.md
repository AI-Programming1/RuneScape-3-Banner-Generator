# RuneScape-3-Banner-Generator
This project creates sharable RuneScape 3 character banners that display a player’s username and skill stats inside a fixed-size banner container (335×249).

The tool lets a user:
Enter their RuneScape 3 username.
Choose a text color for the stats.
Select a background:
Random gradient layer (generated on click).
Uploaded custom image (saved via Cloudflare Worker KV or embedded as a Data URL fallback).
Preview the banner live inside the generator page.
Generate a <iframe> embed code that can be copied and pasted into any website.
Key Features
Dynamic RuneScape stats: Player stats are fetched from the official RuneScape HiScores API via a proxy/Cloudflare Worker to avoid CORS issues.
Live Preview: The banner updates instantly when the user changes colors or background.
Embed Ready: Generates an <iframe> code with correct dimensions (335×249), rounded corners, no scrollbars, and the user’s selected text color + background passed through query parameters.
Responsive Text Scaling: Username and skill list text scales dynamically to fit inside the container without overflow.
Background Persistence: Gradient layers are passed via query string, while uploaded images are saved via Worker KV or encoded inline to ensure the banner displays correctly even when embedded on external sites.

File Overview:
index.html → The generator UI where the user inputs their RS3 username, picks colors/backgrounds, and generates embed code.
script.js → Main logic for generator UI: handles user input, background selection, live preview updates, and generating the iframe embed code.
banner.js → Renders the username + skills list inside the banner container; handles scaling and layout.
style.css → Styles for both the generator and the banner, ensuring fixed sizing, clean layout, and rounded corners.
your-template.html → The page loaded inside the <iframe>; it reads query parameters (username, color, background) and calls banner.js to render the final banner.

***Keep in mind, this is a unfinished project; While the core elements work, some issues are still present. It's a rough draft***

This script was written enitrely using the Artifical Intelligence Model: Chatgpt-5 by OpenAI.
