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
let hauntMultiplier: number = 0;
const hauntMultiplierCost: number = 10;

const buttonDiv: HTMLDivElement = document.createElement("div");
app.append(buttonDiv);

const spookyButton: HTMLButtonElement = document.createElement("button");
spookyButton.textContent = "👻";
buttonDiv.append(spookyButton);

const hauntingShopDiv: HTMLDivElement = document.createElement("div");
app.append(hauntingShopDiv);

const hauntMultiplierUpgrade: HTMLButtonElement = document.createElement("button");
hauntMultiplierUpgrade.textContent = "Increment Haunt Multiplier";
hauntingShopDiv.append(hauntMultiplierUpgrade);

if (ghosts < hauntMultiplierCost) {hauntMultiplierUpgrade.disabled = true;}

if (hauntMultiplierUpgrade.disabled && ghosts >= hauntMultiplierCost) {hauntMultiplierUpgrade.disabled = false;}

hauntMultiplierUpgrade.onclick = () => {
  if (ghosts >= hauntMultiplierCost) {
    hauntMultiplier++;
    ghosts -= hauntMultiplierCost;
  }
};

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
  haunting(hauntCount * hauntMultiplier);
  requestAnimationFrame(continuousHaunting);
}

spookyButton.onclick = () => {
  haunting(1);
};

requestAnimationFrame(continuousHaunting);