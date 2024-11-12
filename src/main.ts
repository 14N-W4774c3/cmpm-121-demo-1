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

const buttonDiv: HTMLDivElement = document.createElement("div");
app.append(buttonDiv);

const spookyButton: HTMLButtonElement = document.createElement("button");
spookyButton.textContent = "👻";
buttonDiv.append(spookyButton);

const hauntingShopDiv: HTMLDivElement = document.createElement("div");
app.append(hauntingShopDiv);

const hauntUpgradeA: HTMLButtonElement =
  document.createElement("button");
  hauntUpgradeA.textContent = "Increment Haunt Multiplier";
hauntingShopDiv.append(hauntUpgradeA);

const hauntUpgradeB: HTMLButtonElement =
  document.createElement("button");
  hauntUpgradeB.textContent = "Increment Haunt Multiplier";
hauntingShopDiv.append(hauntUpgradeB);

const hauntUpgradeC: HTMLButtonElement =
  document.createElement("button");
  hauntUpgradeC.textContent = "Increment Haunt Multiplier";
hauntingShopDiv.append(hauntUpgradeC);

let ghosts: number = 0;
let hauntingStart: number | undefined;
let hauntMultiplier: number = 0;
const upgradeACost: number = 10;
const upgradeBCost: number = 100;
const upgradeCCost: number = 1000;
const upgradeAMultiplier: number = 0.1;
const upgradeBMultiplier: number = 2.0;
const upgradeCMultiplier: number = 50.0;

hauntUpgradeA.onclick = () => {
  if (ghosts >= upgradeACost) {
    hauntMultiplier += upgradeAMultiplier;
    ghosts -= upgradeACost;
  }
};

hauntUpgradeB.onclick = () => {
  if (ghosts >= upgradeBCost) {
    hauntMultiplier += upgradeBMultiplier;
    ghosts -= upgradeBCost;
  }
};

hauntUpgradeC.onclick = () => {
  if (ghosts >= upgradeCCost) {
    hauntMultiplier += upgradeCMultiplier;
    ghosts -= upgradeCCost;
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
  if (ghosts >= upgradeACost) {
    hauntUpgradeA.disabled = false;
  } else {
    hauntUpgradeA.disabled = true;
  }
  if (ghosts >= upgradeBCost) {
    hauntUpgradeB.disabled = false;
  } else {
    hauntUpgradeB.disabled = true;
  }
  if (ghosts >= upgradeCCost) {
    hauntUpgradeC.disabled = false;
  } else {
    hauntUpgradeC.disabled = true;
  }
  requestAnimationFrame(continuousHaunting);
}

spookyButton.onclick = () => {
  haunting(1);
};

requestAnimationFrame(continuousHaunting);
