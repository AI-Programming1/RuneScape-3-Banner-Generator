# RuneScape-3-Banner-Generator
This project creates a sharable RuneScape 3/OSRS character banners that display a player’s username and skill stats inside a fixed-size banner container (335×249).

***The original goal of this project was to reignite the banners from the 2006-2010 runescape scene era.***

***The goal is simple: To make it easily acessible for anyone to create there own RS3/OSRS banner without the need of a server, taking advantage of community proxies to display there own Runescape Stats and utilizing random gradient layers backgrounds for light, and easy distributable iframes.***

***The current files are exactly that. If you would like access to "upload/images" and "own hosted proxies" feel free to download the resources below and the cloudflare worker files included in my Github repository.***

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

**Toggle between rs3 or osrs hiscore index**
[RS3 URL Hiscores]
[https://secure.runescape.com/m=hiscore/index_lite.ws?player=<USERNAME>]
[OSRS URL Hiscores]
[https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=<USERNAME>]


--This script was written enitrely using the Artifical Intelligence Model: Chatgpt-5 by OpenAI.--
