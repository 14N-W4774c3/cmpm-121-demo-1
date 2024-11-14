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
}

const availableItems: Item[] = [
  { name: "Practice haunting", cost: 10, rate: 0.1 },
  { name: "Recruit another ghost", cost: 100, rate: 2.0 },
  { name: "Call a demon straight from hell", cost: 1000, rate: 50.0 },
];

for (const item of availableItems) {
  const upgrade: HTMLButtonElement = document.createElement("button");
  upgrade.textContent = `${item.name} - $${item.cost}`;
  hauntingShopDiv.append(upgrade);
}

const upgradeButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("button");

const upgradeButtonsArray: HTMLButtonElement[] = Array.from(upgradeButtons);
upgradeButtonsArray.forEach((button, index) => {
  if (button.textContent === "👻") {
    upgradeButtonsArray.splice(index, 1);
  }
}
);

upgradeButtonsArray.forEach((button, index) => {
  button.onclick = () => {
    if (ghosts >= availableItems[index].cost) {
      hauntMultiplier += availableItems[index].rate;
      multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(2)}`;
      ghosts -= availableItems[index].cost;
      availableItems[index].cost *= costMultiplier;
      button.textContent = `${availableItems[index].name} - $${availableItems[index].cost}`;
    }
  };
});



/*
const upgradeA: HTMLButtonElement = document.createElement("button");
upgradeA.textContent = "Practice haunting";
app.append(upgradeA);

const upgradeB: HTMLButtonElement = document.createElement("button");
upgradeB.textContent = "Recruit another ghost";
app.append(upgradeB);

const upgradeC: HTMLButtonElement = document.createElement("button");
upgradeC.textContent = "Call a demon straight from hell";
app.append(upgradeC);*/

let ghosts: number = 0;
let hauntingStart: number | undefined;
let hauntMultiplier: number = 0;
const costMultiplier: number = 1.15;

/*
upgradeA.onclick = () => {
  if (ghosts >= upgradeACost) {
    hauntMultiplier += upgradeAMultiplier;
    multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(2)}`;
    ghosts -= upgradeACost;
    upgradeACost *= costMultiplier;
  }
};

upgradeB.onclick = () => {
  if (ghosts >= upgradeBCost) {
    hauntMultiplier += upgradeBMultiplier;
    multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(2)}`;
    ghosts -= upgradeBCost;
    upgradeBCost *= costMultiplier;
  }
};

upgradeC.onclick = () => {
  if (ghosts >= upgradeCCost) {
    hauntMultiplier += upgradeCMultiplier;
    multiplierCounter.textContent = `Ghost Multiplier: ${hauntMultiplier.toFixed(2)}`;
    ghosts -= upgradeCCost;
    upgradeCCost *= costMultiplier;
  }
};*/

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
  /*
  if (ghosts >= upgradeACost) {
    upgradeA.disabled = false;
  } else {
    upgradeA.disabled = true;
  }
  if (ghosts >= upgradeBCost) {
    upgradeB.disabled = false;
  } else {
    upgradeB.disabled = true;
  }
  if (ghosts >= upgradeCCost) {
    upgradeB.disabled = false;
  } else {
    upgradeB.disabled = true;
  }*/
  upgradeButtons.forEach((button, index) => {
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
