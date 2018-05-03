var damage = 1;
var exp_num = 0;
var exp_dem = 10;
var level = 1;
var enemy_level = 1;
var exp_amt = 1;
var gold = 0;
var enemy_gold = 1;
var enemy_health = 10;
var enemy_max_health = 10;
var lvl_up_cost = 10;

function debug_mode(){
	damage = 100;
	document.getElementById("damage").innerHTML = damage;
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
	document.getElementById("enemy_level").innerHTML = enemy_level;
	document.getElementById("enemy_health").innerHTML = enemy_health;
	document.getElementById("gold").innerHTML = gold;
	document.getElementById("lvl_up_cost").innerHTML = lvl_up_cost;
	if(gold >= lvl_up_cost){
		document.getElementById("enemy_lvl_up_button").disabled = false;
	}
	else{
		document.getElementById("enemy_lvl_up_button").disabled = true;
	}
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