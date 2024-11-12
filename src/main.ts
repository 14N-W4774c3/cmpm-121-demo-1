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

const multiplierCounter: HTMLParagraphElement = document.createElement("p");
multiplierCounter.textContent = "Ghost Multiplier: 0";
spookyDiv.append(multiplierCounter);

const buttonDiv: HTMLDivElement = document.createElement("div");
app.append(buttonDiv);

const spookyButton: HTMLButtonElement = document.createElement("button");
spookyButton.textContent = "👻";
buttonDiv.append(spookyButton);

const hauntingShopDiv: HTMLDivElement = document.createElement("div");
app.append(hauntingShopDiv);

function hauntButton(upgrade: string, cost: number, multiplier: number): HTMLButtonElement {
  const hauntUpgrade: HTMLButtonElement = document.createElement("button");
  hauntUpgrade.textContent = upgrade;
  hauntUpgrade.onclick = () => {
    if (ghosts >= cost) {
      hauntMultiplier += multiplier;
      multiplierCounter.textContent = "Ghost Multiplier: ${hauntMultiplier.toFixed(2)}";
      ghosts -= cost;
    }
  };
  return hauntUpgrade;
}

let ghosts: number = 0;
let hauntingStart: number | undefined;
let hauntMultiplier: number = 0;
const upgradeACost: number = 10;
const upgradeBCost: number = 100;
const upgradeCCost: number = 1000;
const upgradeAMultiplier: number = 0.1;
const upgradeBMultiplier: number = 2.0;
const upgradeCMultiplier: number = 50.0;

const hauntUpgradeA: HTMLButtonElement = hauntButton("Upgrade A", upgradeACost, upgradeAMultiplier);
hauntingShopDiv.append(hauntUpgradeA);

const hauntUpgradeB: HTMLButtonElement = hauntButton("Upgrade B", upgradeBCost, upgradeBMultiplier);
hauntingShopDiv.append(hauntUpgradeB);

const hauntUpgradeC: HTMLButtonElement = hauntButton("Upgrade C", upgradeCCost, upgradeCMultiplier);
hauntingShopDiv.append(hauntUpgradeC);

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
