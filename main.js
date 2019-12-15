var damage = 1;
var exp_num = 0;
var exp_dem = 10;
var level = 1;
var exp_amt = 1;
var gold = 0;
var enemy_gold = 1;
var enemy_health = 10;
var enemy_max_health = 10;

class player {
	constructor(damage, exp_num, exp_dem, level) {
		this.damage = damage;
		this.exp_num = exp_num;
		this.exp_dem = exp_dem;
		this.level = level;
	}
}

p = new player(1, 0, 10, 1);
console.log(p.damage);

function debug_mode(){
	damage = damage + 100;
	document.getElementById("damage").innerHTML = damage;
}

function save(){
	var save = {
		damage: damage,
		exp_num: exp_num,
		exp_dem: exp_dem,
		level: level,
		exp_amt: exp_amt,
		gold: gold,
		enemy_gold: enemy_gold,
		enemy_health: enemy_health,
		enemy_max_health: enemy_max_health
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.damage !== "undefined") damage = savegame.damage;
	if (typeof savegame.exp_num !== "undefined") exp_num = savegame.exp_num;
	if (typeof savegame.exp_dem !== "undefined") exp_dem = savegame.exp_dem;
	if (typeof savegame.level !== "undefined") level = savegame.level;
	if (typeof savegame.exp_amt !== "undefined") exp_amt = savegame.exp_amt;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.enemy_gold !== "undefined") enemy_gold = savegame.enemy_gold;
	if (typeof savegame.enemy_health !== "undefined") enemy_health = savegame.enemy_health;
	if (typeof savegame.enemy_max_health !== "undefined") enemy_max_health = savegame.enemy_max_health;
	update_stats();
}

function reset(){
	damage = 1;
	exp_num = 0;
	exp_dem = 10;
	level = 1;
	exp_amt = 1;
	gold = 0;
	enemy_gold = 1;
	enemy_health = 10;
	enemy_max_health = 10;
	update_stats();
	save();
}

function openDropdown(){
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event){
	if (!event.target.matches('.dropbtn')){
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i=0; i<dropdowns.length; i++){
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")){
				openDropdown.classList.remove("show");
			}
		}
	}
}

function enemy_lvl_up(){
	enemy_level += 1;
	enemy_gold = enemy_level;
	gold -= lvl_up_cost;
	lvl_up_cost = Math.floor(10 * Math.pow(1.5, enemy_level))
	exp_amt = Math.floor(10*Math.log10(enemy_level));
	enemy_max_health = Math.floor(3*Math.exp(enemy_level));
	enemy_health = enemy_max_health;
	update_stats();
}

function update_stats(){
	document.getElementById("level").innerHTML = level;
	document.getElementById("exp_dem").innerHTML = exp_dem;
	document.getElementById("damage").innerHTML = damage;
	document.getElementById("exp_num").innerHTML = exp_num;
	document.getElementById("enemy_health").innerHTML = enemy_health;
	document.getElementById("gold").innerHTML = gold;
}

function openTab(event, tabName){
	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for(i=0; i<tabcontent.length; i++){
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for(i=0; i<tablinks.length; i++){
		tablinks[i].className = tablinks[i].className.replace("active", "");
	}

	document.getElementById(tabName).style.display = "block";
	event.currentTarget.className += "active";
}

function deal_damage(){
	enemy_health -= damage;
	if(enemy_health <= 0){		// Enemy Kill
		exp_num += exp_amt;
		gold += enemy_gold;
		enemy_health = enemy_max_health;
	}
	
	if(exp_num >= exp_dem){		// Level Up
			exp_num = 0;
			level += 1;
			exp_dem = Math.floor(exp_dem * (1 + level * 0.1));
			damage = damage + level - 1;
	}
	update_stats();
}

function slime(){
	var name = document.getElementById("enemy_name").innerHTML;
	if(name != "Slime"){
		enemy_health = 10;
	}
	document.getElementById("enemy_name").innerHTML = "Slime";
	enemy_max_health = 10;
	enemy_gold = 1;
	exp_amt = 1;
	update_stats();
}

function mushroom(){
	var name = document.getElementById("enemy_name").innerHTML;
	if(name != "Mushroom"){
		enemy_health = 25;
	}
	document.getElementById("enemy_name").innerHTML = "Mushroom";
	enemy_max_health = 25;
	enemy_gold = 2;
	exp_amt = 2;
	update_stats();
}