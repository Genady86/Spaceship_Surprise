let spaceship = "Surprise Spaceship";
let hp = 120;
let inventory = []
let diamonds = 100;

let damageValue = 20;
let repairkitCost = 20;

console.log("Spaceship:", spaceship);
console.log("HP:", hp);
console.log("Inventory:", inventory);

function getStatus() {
    console.log("status Update");
    console.log("Spaceship:" + spaceship);
    console.log("HP:" + hp);
    console.log("Diamonds:" + diamonds);
    console.log("Inventory:" + inventory);

}

function buyRepairkit() {
    if (diamonds >= repairkitCost) {
        diamonds = diamonds - repairkitCost;
        inventory.push("Repairkit");
        console.log("Repairkit buyed");
    } else {
        console.log("not enough Diamonds!");
    }
}

function takeDamage() {
    hp = hp - damageValue;
    console.log("take damage! Current HP:" + hp);

    if (hp <= 0) {
        console.log("the Spaceship is Gameover!");
    }
}


getStatus();
buyRepairkit();
takeDamage();
getStatus();