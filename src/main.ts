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
spookyCounter.textContent = "People Scared: 0";
spookyDiv.append(spookyCounter);

const multiplierCounter: HTMLParagraphElement = document.createElement("p");
multiplierCounter.textContent = "Spookosity: 0";
spookyDiv.append(multiplierCounter);

const buttonDiv: HTMLDivElement = document.createElement("div");
app.append(buttonDiv);

const spookyButton: HTMLButtonElement = document.createElement("button");
spookyButton.textContent = "👻";
buttonDiv.append(spookyButton);

const hauntingShopDiv: HTMLDivElement = document.createElement("div");
app.append(hauntingShopDiv);

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Practice haunting",
    cost: 10,
    rate: 0.1,
    description:
      "Come up with more terrifying ideas than the Electoral College",
  },
  {
    name: "Recruit another ghost",
    cost: 100,
    rate: 2.0,
    description: "Add another ghost to your haunting team",
  },
  {
    name: "Call a demon straight from hell",
    cost: 1000,
    rate: 50.0,
    description: "All you gotta do is say their name",
  },
  {
    name: "Have a swingin' wake",
    cost: 5000,
    rate: 300.0,
    description: "Invite all your ghost friends over for a party",
  },
  {
    name: "Call in the giant snake",
    cost: 10000,
    rate: 1000.0,
    description: "Seriously though this is a game about death",
  },
];

for (const item of availableItems) {
  const upgrade: HTMLButtonElement = document.createElement("button");
  upgrade.textContent = `${item.name} - ${item.cost.toFixed(2)} people scared`;
  hauntingShopDiv.append(upgrade);
}

let ghosts: number = 0;
let hauntingStart: number | undefined;
let hauntMultiplier: number = 0;
const costMultiplier: number = 1.15;
const upgradeButtons: HTMLCollectionOf<HTMLButtonElement> =
  hauntingShopDiv.getElementsByTagName("button");
const upgradeButtonsArray: HTMLButtonElement[] = Array.from(upgradeButtons);

upgradeButtonsArray.forEach((button, index) => {
  button.onmouseover = () => {
    button.title = availableItems[index].description;
  };
  button.onclick = () => {
    if (ghosts >= availableItems[index].cost) {
      hauntMultiplier += availableItems[index].rate;
      multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(2)}`;
      ghosts -= availableItems[index].cost;
      availableItems[index].cost *= costMultiplier;
      button.textContent = `${availableItems[index].name} - ${availableItems[index].cost.toFixed(2)} people scared`;
    }
  };
});

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
  upgradeButtonsArray.forEach((button, index) => {
    if (ghosts >= availableItems[index].cost) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
  requestAnimationFrame(continuousHaunting);
}

spookyButton.onclick = () => {
  haunting(1);
};

requestAnimationFrame(continuousHaunting);
