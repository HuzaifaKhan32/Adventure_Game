import inquirer from "inquirer";
import chalk from "chalk";
// Game Variables
let enemies = ["Skeleton", "Assassin", "Zombie", "Warrior"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
// Player Variables
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let numOfKills = 0;
let running = true;
console.log(chalk.green("\t\t\t\\\\\\\\\\\\\\----------------Welcome To The Combat----------------///////\n"));
while (running) {
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    console.log(chalk.yellow(`\t\t\t\\\\\\\\\\\\\\----------------${enemy} Has Appeared!----------------///////\n`));
    Game: while (enemyHealth > 0) {
        let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
        let damageDealt = Math.floor(Math.random() * attackDamage);
        console.log(chalk.bgGreen(`\t> Your HP: ${health}`));
        console.log(chalk.bgRed(`\t> ${enemy}'s HP: ${enemyHealth}\n`));
        health -= damageTaken;
        enemyHealth -= damageDealt;
        let user = await inquirer.prompt({
            name: "input",
            type: "list",
            message: "What would you like to do: ",
            choices: ["Attack", "Drink Health Potion", "Run!"]
        });
        if (user.input === "Attack") {
            console.log(chalk.green(`\n\t> You strike the ${enemy} for ${damageDealt} damage`));
            console.log(chalk.red(`\t> You got ${damageTaken} in retaliation`));
            console.log(`\n---------------------------------------------------\n`);
            if (enemyHealth > 0) {
                // console.log(chalk.red(`\t> ${enemy}'s HP: ${enemyHealth}`));
            }
            else {
                console.log(chalk.bgGreen(`\t\t\t\t\t\t♛ You defeated the ${enemy}!`));
                numOfKills++;
                console.log(chalk.bgBlue(`Kills: ${numOfKills}\n`));
                let loop = await inquirer.prompt({
                    name: "manage",
                    type: "list",
                    message: "What would you like to do: ",
                    choices: ["Continue Fighting", "Exit from the combat"]
                });
                if (loop.manage === "Continue Fighting") {
                    continue Game;
                }
                else {
                    console.log(chalk.blue(`\t\t\t\t\t\tYou exit from the combat,`), chalk.bgBlue(`Kills: ${numOfKills}`));
                    process.exit();
                }
            }
            if (health > 20 && health < 30) {
                console.log(chalk.bgRedBright(`\t You should heal if you don't want to die.`));
            }
            if (health <= 0) {
                console.log(chalk.bgRed(`You Dead!`));
                console.log(chalk.bgBlue(`Game Over!`));
                running = false;
            }
        }
        else if (user.input === "Drink Health Potion") {
            if (numHealthPotions > 0) {
                health += healthPotionHealAmount;
                if (health > 100)
                    health = 100;
                numHealthPotions--;
                console.log(chalk.green(`\t You drink a health potion. Your health is now ${health} HP. You have ${numHealthPotions} health potions left.`));
            }
            else {
                console.log(chalk.red(`\t No health potions left!`));
            }
        }
        else {
            console.clear();
            console.log(`\t You run away from the ${enemy}.`);
        }
    }
}
