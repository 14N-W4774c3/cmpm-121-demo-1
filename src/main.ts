import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My spooky game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const spookyButton = document.createElement("button");
spookyButton.textContent = "👻";
document.body.append(spookyButton);