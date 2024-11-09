import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My spooky game";
document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const spookyDiv: HTMLDivElement = document.createElement("div");
app.append(spookyDiv);

const spookyCounter: HTMLParagraphElement = document.createElement("p");
spookyCounter.textContent = "Hauntings: 0";
spookyDiv.append(spookyCounter);

let ghosts: number = 0;
let hauntingStart: number | undefined;

const buttonDiv: HTMLDivElement = document.createElement("div");
app.append(buttonDiv);

const spookyButton: HTMLButtonElement = document.createElement("button");
spookyButton.textContent = "👻";
buttonDiv.append(spookyButton);

function haunting(ghostsAdded: number): void {
  ghosts += ghostsAdded;
  spookyCounter.textContent = `Hauntings: ${ghosts.toFixed(2)}`;
}

function continuousHaunting(): void {
  if (hauntingStart === undefined) {
    hauntingStart = performance.now();
  }
  const hauntCount: number = (performance.now() - hauntingStart) / 1000;
  hauntingStart = performance.now();
  haunting(hauntCount);
  requestAnimationFrame(continuousHaunting);
}

spookyButton.onclick = () => {
  haunting(1);
};

requestAnimationFrame(continuousHaunting);