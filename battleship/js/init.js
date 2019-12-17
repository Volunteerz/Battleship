
var n = 10;
var map = new Array();
for(var i = 0; i < n; i++) {
	map[i] = new Array();
	for(var j = 0; j < n; j++) {
		map[i][j] = -1;
	}
}
var AI_map = new Array();
for(var i = 0; i < n; i++) {
	AI_map[i] = new Array();
	for(var j = 0; j < n; j++) {
		AI_map[i][j] = -1;
	}
}
function getquery(str) {
	return document.querySelectorAll(str);
}
function getStyle(ele) {
    var style = null;
    
    if(window.getComputedStyle) {
        style = window.getComputedStyle(ele, null);
    }else{
        style = ele.currentStyle;
    }
    
    return style;
}
function ready(){
	var ships = getquery('.ship');
	for(var i = 0; i < ships.length; i++) {
		if(ships[i].parentNode.getAttribute("id") != "field-cell-content") {
			return false;
		}
	}
	return true;
}
function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}
function impossible(x, y) {
	var  count = 0;
	if(inmap(x - 1, y - 1)) {
		if(AI_map[x - 1][y - 1] > 0)
			count++;
	}
	if(inmap(x + 1, y - 1)) {
		if(AI_map[x + 1][y - 1] > 0)
			count++;
	}
	if(inmap(x + 1, y + 1)) {
		if(AI_map[x + 1][y + 1] > 0)
			count++;
	}
	if(inmap(x - 1, y + 1)) {
		if(AI_map[x - 1][y + 1] > 0)
			count++;
	}
	if(count > 0)
		return true;
	return false;
}
function Canclick(x, y) {
	if(x < 0 | x >= n)
		return false;
	if(y < 0 | y >= n)
		return false;
	if(AI_map[x][y] != -1)
		return false;
	return true;
}
function fight_AI() {
	var cells = document.querySelectorAll(".field-table2 #field-cell-content");
	var ships = getquery('.ship');
	var text = document.querySelectorAll('.textarea');
	for(var i = 0; i < ships.length; i++)
		ships[i].style.zIndex = -1;
	var numUser = 20;
	var numAI = 20;
	var lx,ly;
	var lnum = -1;
	var Tnum = 99;
	for(var i = 0; i < cells.length; i++) {
		cells[i].onclick = function(){
			var x = this.getAttribute("data-x");
			var y = this.getAttribute("data-y");
			var str1 = "x="+ x + "&y=" + y;  
			str1 += "&owner=AI";
			judgeAI = function(ret,cell) {
				var num = parseInt(ret.response);
				if(num != -1) {
					cell.setAttribute("class","cha");
					numAI--;
				}
				else 
					cell.setAttribute("class","yuan");
				cell.style.zIndex = -2;
			}
			new SimpleAjax("./whether_ship.php", "post", str1, judgeAI,this);
			if(numAI == 0) {
				alert("Congratulations, You win!");
				Quit_game();
			}
			judgeHM = function(ret,cell) {
				var num = parseInt(ret.response);
				var a = parseInt(cell.getAttribute("data-x"));
				var b = parseInt(cell.getAttribute("data-y"));
				AI_map[a][b] = num + 1;
				if(num != -1) {
					cell.setAttribute("class","cha");
					numUser--;
					lnum = a * 10 + b;

				}
				else 
					cell.setAttribute("class","yuan");
			}
			var fcells = document.querySelectorAll(".field-table1 #field-cell-content");
			var xx,yy,num;
			if(lnum == -1) {
				xx = randomNum(0,9);
			    yy = randomNum(0,9);
			    num = xx * 10 + yy;
			}
			else {
				xx = Math.floor(lnum / 10);
				yy = lnum % 10;
				if(Canclick(xx + 1, yy) && !impossible(xx + 1, yy))
					xx++;
				else if(Canclick(xx - 1, yy) && !impossible(xx - 1, yy))
					xx--;
				else if(Canclick(xx, yy + 1) && !impossible(xx, yy + 1))
					yy++;
				else if(Canclick(xx, yy - 1) && !impossible(xx, yy -1))
					yy--;
				else {
					var count = 0;
				    var limit = randomNum(0, Tnum);
					for(var a = 0; a < n; a++) {
						for(var b = 0; b < n; b++) {
							if(Canclick(a, b)){	
								count++;
								xx = a;
								yy = b;
								if(count == limit) 
									break;
								if(impossible(a, b)) {
									continue;
								}
							}
						}
						if(count == limit)
						break;
					}
			    }
			    num = xx * 10 + yy;
			}
			
			var str2 = "x="+ xx + "&y=" + yy;
			str2 += "&owner=" + getCookie("user");
			new SimpleAjax("./whether_ship.php", "post", str2, judgeHM, fcells[num]);
			Tnum--;
			if(numUser == 0) {
				alert("Sorry, You lose this game.");
				Quit_game();
			}
		}
	}
}

function Battle_with_AI() {
	var method = JSON.stringify(map);
	var text = document.querySelectorAll('.textarea');
	var cells = document.querySelectorAll(".field-table2 #field-cell-content");
	for(var i = 0; i < cells.length; i++) {
		cells[i].style.zIndex = 0;
	}
	if(ready()) {
		var start_AI = function() {
			new SimpleAjax("./upload_map.php", "post", "map="+method);
			new SimpleAjax("./start_AI.php", "post");
			text[0].value = "Start playing with AI";
		} 
		new SimpleAjax("./init_log.php", "post", "", start_AI);
		fight_AI();
	}
	else {
		text[0].value = "You must put all pieces in this chessboard";
	}
	
}

function Battle_with_Player() {
	var matcher = "";
	var method = JSON.stringify(map);
	var user = getCookie("user");
	var cells = document.querySelectorAll(".field-table2 #field-cell-content");
	var fcells = document.querySelectorAll(".field-table1 #field-cell-content");
	var field2 = document.querySelectorAll('.field2');
	var text = document.querySelectorAll('.textarea');
	for(var i = 0; i < cells.length; i++) {
		cells[i].style.zIndex = 0;
	}
	if(ready()) {
	call_back = function() {
		new SimpleAjax("./query_ready_player.php", "post","",find_player);
		text[0].value = "Query ready player";
		var ships = getquery('.ship');
		for(var i = 0; i < ships.length; i++)
			ships[i].style.zIndex = -1;
	}
	var start_upload = function(ret) {
		new SimpleAjax("./upload_map.php", "post", "map="+method, call_back);
		console.log(ret.response);
	}
	new SimpleAjax("./init_log.php", "post", "", start_upload);
	var numMatcher = 20;
	var numuser = 20;
	var table = "";
	var round = 0;
	find_player = function(ret) {
		var name = ret.response;
		matcher = name;
		
		if(matcher == "NOTFOUND") {
			text[0].value = "Did not found the opponent";
			new SimpleAjax("./stop_find.php", "post", "");
		}
		else {
			text[0].value = "The opponent is user " + matcher;
			start_click = function(re) {
				table = re.response;
				console.log(table);
				var words = table.split('_');
				console.log(words);

				var go_click = function() {
					for(var i = 0; i < cells.length; i++) {
						cells[i].onclick = function() {
							var x = this.getAttribute("data-x");
							var y = this.getAttribute("data-y");
							var str = "x="+ x + "&y=" + y;  
							str += "&owner="+matcher;
							judgeMatcher = function(ret,cell) {
								var num = parseInt(ret.response);
								var a = parseInt(cell.getAttribute("data-x"));
								var b = parseInt(cell.getAttribute("data-y"));
								if(num != -1) {
									cell.setAttribute("class","cha");
									numMatcher--;
									if(numMatcher == 0) {
										alert("Congratulations, You win!");
										Quit_game();
									}
								}
								else 
									cell.setAttribute("class","yuan");
								cell.style.zIndex = -2;
								for(var i = 0; i < cells.length; i++) {
									var st = getStyle(cells[i]);
									if(st.zIndex != -2) 
										cells[i].style.zIndex = -1;
								}
								waitmatcher = function(r) {
									var res = r.response;
									console.log(res);
									if(res == "BT") {
										text[0].value = "Timeout, automatically disconnect.";
										Quit_game();
									}
									else {
										text[0].value = "It's your turn";
										var mx = parseInt(res.charAt(0));
										var my = parseInt(res.charAt(1));
										var mnum =  mx * 10 + my;
										if(map[mx][my] == -1) {
											fcells[mnum].setAttribute("class","yuan");
										}
										else {
											fcells[mnum].setAttribute("class","cha");
											numuser--;
											if(numuser == 0) {
												alert("Sorry, You lose this game.");
												Quit_game();
											}
										}
										for(var i = 0; i < cells.length; i++) {
											var st = getStyle(cells[i]);
											if(st.zIndex != -2) 
												cells[i].style.zIndex = 0;
										}
										round++;
									}
								}
								var add_round = function() {
									round++;
									text[0].value = "Waiting for your opponent : " + matcher;
									new SimpleAjax("./wait_for_matcher.php", "post", "table="+table+"&round="+ round, waitmatcher);
								}
								var par = "table="+table+"&x="+a+"&y="+b+"&round="+round;
								new SimpleAjax("./click_map.php", "post", par, add_round);
							}
							new SimpleAjax("./whether_ship.php", "post", str, judgeMatcher,this);
						}
					}
				}
				if(words[1] == user) {
					round = 0;
					text[0].value = "It's your turn";
					go_click();
				}
				else {
					round = 1;
					var start_game = function(ret) {
						var res = ret.response;
						if(res == "BT") {
							text[0].value = "Timeout, automatically disconnect.";
							Quit_game();
						}
						else {
							var mx = parseInt(res.charAt(0));
							var my = parseInt(res.charAt(1));
							var mnum =  mx * 10 + my;
							console.log(mx, my);
							if(map[mx][my] == -1) {
								fcells[mnum].setAttribute("class","yuan");
							}
							else {
								fcells[mnum].setAttribute("class","cha");
								numuser--;
							}
							text[0].value = "It's your turn";
							go_click();
						}
					}
					text[0].value = "Waiting for your opponent : "+ matcher;
					new SimpleAjax("./wait_for_matcher.php", "post", "table="+table+"&round="+(round - 1), start_game);
				}
			}
			new SimpleAjax("./start_game.php", "post",  "matcher="+matcher, start_click);
		}
	}
	}
	else {
		text[0].value = "You must put all pieces in this chessboard";
	}
}
window.onload = function() {
	var cells = document.querySelectorAll(".filed1 .field-cell-content");
	//event.cancelBubble =false;
	for(var i = 0; i < cells.length; i++) {
		cells[i].onclick = function() {
			//this.style.color="";
			this.style.background="#BBFFFF";
			var x = this.getAttribute("data-x");
			var y = this.getAttribute("data-y");
			new SimpleAjax("check.php", post, "x="+x+"&y="+y); 
		}
	}	
	var ships = getquery('.ship');
	//console.log(ships.length);
	for (var i = 0; i < ships.length; i++) {
		ships[i].onclick = function() {
			var num = this.id.substr(4);
			num = Number(num);
			var style = window.getComputedStyle(this,null);
			var state = this.getAttribute("data-state");
			var len = getLen(num);
			if(state == 'v')
				state = 'h';
			else 
				state = 'v';
			var x = this.getAttribute("data-x"); 
			var y = this.getAttribute("data-y");
			x = Number(x);
			y = Number(y);
			console.log(x, y, len, state, num);
			if(!judge(x, y, len, state, num) && (x != -1 && y != -1))
				return;
			var tmp1 = style.width;
			var tmp2 = style.height;
			this.style.height = tmp1;
			this.style.width = tmp2;
			this.setAttribute("data-state", state);
			if(x != -1 && y != -1) {
			if(state == 'h') {
					for (var i = x; i < x + len; i++) {
						map[i][y] = -1;
					}
					for (var i = y; i < y + len; i++) {
						map[x][i] = num;
					}
				}
				else { 
					for (var i = y; i < y + len; i++) {
						map[x][i] = -1;
					}
					for (var i = x; i < x + len; i++) {
						map[i][y] = num;
					}
				}
			}
		}
	}
}
function allowDrop(ev) {
   ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
	var data = ev.dataTransfer.getData("Text");
	var ship = document.getElementById(data);
	console.log(data);
	ship.style.zIndex = 0;
}
function getlen(style, state) {
	var width = style.width;
	var height = style.height;
	var len = 0;
	if(state == "h") {
		if(width == "156px")
			len = 4;
		else if(width == "116px")
			len = 3;
		else if(width == "76px")
			len = 2;
		else
			len = 1;
	}
	else {
		if(height === "156px")
			len = 4;
		else if(height === "116px")
			len = 3;
		else if(height === "76px")
			len = 2;
		else
			len = 1;
	}
	return len;
}
function getLen(num) {
	if(num == 0) {
		return 4;
	}
	else if(num == 2 || num == 4)
		return 3;
	else if(num == 3 || num == 5 || num == 9) 
		return 2;
	else if(num == 1 || num == 6 || num == 7 || num == 8)
		return 1;
	return 0;
}
function respond(ship, cell) {
	var x = cell.getAttribute("data-x");
	var y = cell.getAttribute("data-y");
	var lastx = ship.getAttribute("data-x");
	var lasty = ship.getAttribute("data-y");
	lastx = Number(lastx);
	lasty = Number(lasty);
	x = Number(x);
	y = Number(y);
	var num = ship.id.substr(4);
	num = Number(num);
	var state = ship.getAttribute("data-state");
	var style = window.getComputedStyle(ship,null);
	var len = getLen(num);
	console.log(len);

	var cells = document.querySelectorAll(".field1 #field-cell-content");
	if(judge(x, y, len, state, num)) {

		ship.style.position = "absolute";
		cell.appendChild(ship);
		ship.setAttribute("data-x", x);
		ship.setAttribute("data-y", y);
		if(state == 'h') {
			if(lastx != -1 && lasty != -1)
			for (var i = lasty; i < lasty + len; i++) {
				map[lastx][i] = -1;
			}
			for (var i = y; i < y + len; i++) {
				map[x][i] = num;
			}
		}
		else { 
			if(lastx != -1 && lasty != -1)
			for (var i = lastx; i < lastx + len; i++) {
				map[i][lasty] = -1;
			}
			for (var i = x; i < x + len; i++) {
				map[i][y] = num;
			}
		}
	}
}
function inmap(x, y) {
	if(x < 0 | x >= n)
		return false;
	if(y < 0 | y >= n)
		return false;
	return true;
}
function judge(x, y, len, state, num) {
	var flag = 0;
	if(state == "h") {
		if(inmap(x, y + len - 1)) {
			for (var i = Math.max(0,x - 1); i < Math.min(n, x + 2); i++) {
				for(var j = Math.max(0,y - 1); j < Math.min(n, y + len + 1); j++) {
					if(map[i][j] != -1 && map[i][j] != num) {
						flag = 1;
					}
				}
			}
		}
		else 
			flag = 1;
		if(flag == 1)
			return false;
	}
	else {
		if(inmap(x + len - 1, y)) {
			for (var i = Math.max(0,x - 1); i < Math.min(n, x + len + 1); i++) {
				for(var j = Math.max(0,y - 1); j < Math.min(n, y + 2); j++) {
					if(map[i][j] != -1 && map[i][j] != num) {
						flag = 1;
					}
				}
			}
		}
		else 
			flag = 1;
		if(flag == 1)
			return false;
	}
	return true;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    var ship = document.getElementById(data);
    ship.style.zIndex = 2;
    if(ev.target.id.substr(0,4) == "ship" && ev.target.id.length == 5 && ev.target.id != data)
    	console.log(1);
    else if(ev.target.id == "field-cell-content") {
    	console.log(2);
    	respond(ship, ev.target);
    }
    else if(ev.target.id == "ship-box") {
    	console.log(3);
    	ship.style.position = "relative";
    	ev.target.appendChild(ship);
    	ship.setAttribute("data-x", -1);
    	ship.setAttribute("data-y", -1);

    }
    else
   		ev.target.appendChild(ship);
}
function Quit_game() {
	new SimpleAjax("./Quit_game.php", "post");
	var cells = document.querySelectorAll(".field-table2 #field-cell-content");
	var fcells = document.querySelectorAll(".field-table1 #field-cell-content");
	for(var i = 0; i < cells.length; i++) {
		fcells[i].setAttribute("class","field-cell-empty");
		cells[i].setAttribute("class","field-cell-empty");
		cells[i].style.zIndex = -2;
		fcells[i].style.zIndex = 0;
	}
	
}
