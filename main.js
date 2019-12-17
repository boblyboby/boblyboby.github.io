var gold = 0;

class player {
	constructor(damage, exp_num, exp_dem, level) {
		this.damage = damage;
		this.exp_num = exp_num;
		this.exp_dem = exp_dem;
		this.level = level;
	}
}

class enemy {
	constructor(exp_amt, gold, max_health) {
		this.exp_amt = exp_amt;
		this.gold = gold;
		this.health = max_health;
		this.max_health = max_health;
	}
}

p = new player(1, 0, 10, 1);
e = new enemy(1, 1, 10);

function debug_mode(){
	p.damage = p.damage + 100;
	document.getElementById("damage").innerHTML = p.damage;
}

function save(){
	var save = {
		damage: p.damage,
		exp_num: p.exp_num,
		exp_dem: p.exp_dem,
		level: p.level,
		exp_amt: e.exp_amt,
		gold: gold,
		enemy_gold: e.gold,
		enemy_health: e.health,
		enemy_max_health: e.max_health
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.damage !== "undefined") p.damage = savegame.damage;
	if (typeof savegame.exp_num !== "undefined") p.exp_num = savegame.exp_num;
	if (typeof savegame.exp_dem !== "undefined") p.exp_dem = savegame.exp_dem;
	if (typeof savegame.level !== "undefined") p.level = savegame.level;
	if (typeof savegame.exp_amt !== "undefined") e.exp_amt = savegame.exp_amt;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.enemy_gold !== "undefined") e.gold = savegame.enemy_gold;
	if (typeof savegame.enemy_health !== "undefined") e.health = savegame.enemy_health;
	if (typeof savegame.enemy_max_health !== "undefined") e.max_health = savegame.enemy_max_health;
	update_stats();
}

function reset(){
	delete p;
	delete e;
	p = new player(1, 0, 10, 1);
	e = new enemy(1, 1, 10);
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
	document.getElementById("level").innerHTML = p.level;
	document.getElementById("exp_dem").innerHTML = p.exp_dem;
	document.getElementById("damage").innerHTML = p.damage;
	document.getElementById("exp_num").innerHTML = p.exp_num;
	document.getElementById("enemy_health").innerHTML = e.health;
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
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabName).style.display = "block";
	event.currentTarget.className += " active";
}

function deal_damage(){
	e.health -= p.damage;
	if(e.health <= 0){		// Enemy Kill
		p.exp_num += e.exp_amt;
		gold += e.gold;
		e.health = e.max_health;
	}
	
	if(p.exp_num >= p.exp_dem){		// Level Up
			p.exp_num = p.exp_num - p.exp_dem;
			p.level += 1;
			p.exp_dem = Math.floor(p.exp_dem * (1 + p.level * 0.1));
			p.damage = p.damage + p.level - 1;
	}
	update_stats();
}

function slime(){
	var name = document.getElementById("enemy_name").innerHTML;
	if(name != "Slime"){
		e.health = 10;
	}
	document.getElementById("enemy_name").innerHTML = "Slime";
	e.max_health = 10;
	e.gold = 1;
	e.exp_amt = 1;
	update_stats();
}

function mushroom(){
	var name = document.getElementById("enemy_name").innerHTML;
	if(name != "Mushroom"){
		e.health = 25;
	}
	document.getElementById("enemy_name").innerHTML = "Mushroom";
	e.max_health = 25;
	e.gold = 2;
	e.exp_amt = 2;
	update_stats();
}