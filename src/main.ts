import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameTitle = "Happy Haunts Clicker";
document.title = gameTitle;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameTitle;
app.append(header);

const gameScoreDiv: HTMLDivElement = document.createElement("div");
gameScoreDiv.classList.add("game-score");
app.append(gameScoreDiv);

const scoreCounter: HTMLParagraphElement = document.createElement("p");
scoreCounter.textContent = "People Scared: 0";
gameScoreDiv.append(scoreCounter);

const multiplierCounter: HTMLParagraphElement = document.createElement("p");
multiplierCounter.textContent = "Spookosity: 0";
gameScoreDiv.append(multiplierCounter);

const buttonDiv: HTMLDivElement = document.createElement("div");
app.append(buttonDiv);

const spookyClickerButton: HTMLButtonElement = document.createElement("button");
spookyClickerButton.textContent = "👻";
buttonDiv.append(spookyClickerButton);

const hauntingShopDiv: HTMLDivElement = document.createElement("div");
hauntingShopDiv.classList.add("haunting-shop");
app.append(hauntingShopDiv);

const hauntingShopTable: HTMLTableElement = document.createElement("table");
hauntingShopDiv.append(hauntingShopTable);

let ghosts: number = 0;
let hauntingStart: number | undefined;
let hauntMultiplier: number = 0;
const clickPower: number = 1;
const precision: number = 2;
const costMultiplier: number = 1.15;
const millisecondsPerSecond: number = 1000;
const upgradeButtons: HTMLCollectionOf<HTMLButtonElement> =
  hauntingShopDiv.getElementsByTagName("button");
const upgradeButtonsArray: HTMLButtonElement[] = Array.from(upgradeButtons);

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

const itemStates = availableItems.map((item) => ({
  clicks: 0,
  price: item.cost,
}));

for (const item of availableItems) {
  const upgradeRow: HTMLTableRowElement = document.createElement("tr");
  const upgradeValue: HTMLTableCellElement = document.createElement("td");
  upgradeValue.textContent = `${item.name}: ${itemStates[availableItems.indexOf(item)].clicks} purchased`;
  const upgradeHolder: HTMLTableCellElement = document.createElement("td");
  const upgrade: HTMLButtonElement = document.createElement("button");
  upgrade.textContent = `${item.name} - ${item.cost.toFixed(precision)} people scared`;
  hauntingShopDiv.append(upgradeRow);
  upgradeRow.append(upgradeValue);
  upgradeRow.append(upgradeHolder);
  upgradeHolder.append(upgrade);
}

upgradeButtonsArray.forEach((button, index) => {
  button.onmouseover = () => {
    button.title = availableItems[index].description;
  };
  button.onclick = () => {
    if (ghosts >= itemStates[index].price) {
      hauntMultiplier += availableItems[index].rate;
      multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(precision)}`;
      ghosts -= itemStates[index].price;
      itemStates[index].price *= costMultiplier;
      button.textContent = `${availableItems[index].name} - ${itemStates[index].price.toFixed(precision)} people scared`;
      itemStates[index].clicks++;
      upgradeButtonsArray[
        index
      ].parentElement!.previousElementSibling!.textContent =
        `${availableItems[index].name}: ${itemStates[index].clicks} purchased`;
    }
  };
});

function haunting(ghostsAdded: number): void {
  ghosts += ghostsAdded;
  scoreCounter.textContent = `Hauntings: ${ghosts.toFixed(precision)}`;
}

function checkAvailability(): void {
  upgradeButtonsArray.forEach((button: HTMLButtonElement, index: number) => {
    button.disabled = ghosts < itemStates[index].price;
  });
}

function continuousGrowth(): void {
  if (hauntingStart === undefined) {
    hauntingStart = performance.now();
  }
  const hauntCount: number =
    (performance.now() - hauntingStart) / millisecondsPerSecond;
  hauntingStart = performance.now();
  haunting(hauntCount * hauntMultiplier);
}

function continuousHaunting(): void {
  if (hauntMultiplier > 0) {
    continuousGrowth();
  }
  checkAvailability();
  requestAnimationFrame(continuousHaunting);
}

spookyClickerButton.onclick = () => {
  haunting(clickPower);
};

requestAnimationFrame(continuousHaunting);
