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

let ghosts: number = 0;
let hauntingStart: number | undefined;

const spookyButton = document.createElement("button");
spookyButton.textContent = "👻";
document.body.append(spookyButton);

function haunting(ghostsAdded: number) {
  ghosts += ghostsAdded;
  spookyCounter.textContent = `Hauntings: ${ghosts.toFixed(2)}`;
}
//setInterval (haunting, 1000, 1);

function continuousHaunting() {
  if (hauntingStart === undefined) {
    hauntingStart = performance.now();
  }
  const hauntCount = (performance.now() - hauntingStart)/1000;
  hauntingStart = performance.now();
  haunting(hauntCount);
  requestAnimationFrame(continuousHaunting);
}

spookyButton.onclick = () => {
  haunting(1);
};

requestAnimationFrame(continuousHaunting);