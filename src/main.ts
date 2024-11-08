import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My spooky game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const spookyDiv = document.createElement("div");
document.body.append(spookyDiv);

const spookyCounter = document.createElement("p");
spookyCounter.textContent = "Hauntings: 0";
spookyDiv.append(spookyCounter);

let ghosts = 0;

const spookyButton = document.createElement("button");
spookyButton.textContent = "👻";
document.body.append(spookyButton);

spookyButton.onclick = () => {
  ghosts++;
  spookyCounter.textContent = `Hauntings: ${ghosts}`;
};