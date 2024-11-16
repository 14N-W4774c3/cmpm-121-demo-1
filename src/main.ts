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

let ghosts: number = 0;
let hauntingStart: number | undefined;
let hauntMultiplier: number = 0;
const clickPower: number = 1;
const precision: number = 2;
const costMultiplier: number = 1.15;
//const millisecondsPerSecond: number = 1000;
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

for (const item of availableItems) {
  const upgrade: HTMLButtonElement = document.createElement("button");
  upgrade.textContent = `${item.name} - ${item.cost.toFixed(precision)} people scared`;
  hauntingShopDiv.append(upgrade);
}

upgradeButtonsArray.forEach((button, index) => {
  button.onmouseover = () => {
    button.title = availableItems[index].description;
  };
  button.onclick = () => {
    if (ghosts >= availableItems[index].cost) {
      hauntMultiplier += availableItems[index].rate;
      multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(precision)}`;
      ghosts -= availableItems[index].cost;
      availableItems[index].cost *= costMultiplier;
      button.textContent = `${availableItems[index].name} - ${availableItems[index].cost.toFixed(precision)} people scared`;
    }
  };
});

function haunting(ghostsAdded: number): void {
  ghosts += ghostsAdded;
  scoreCounter.textContent = `Hauntings: ${ghosts.toFixed(precision)}`;
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

spookyClickerButton.onclick = () => {
  haunting(clickPower);
};

requestAnimationFrame(continuousHaunting);
