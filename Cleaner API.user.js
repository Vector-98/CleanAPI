// ==UserScript==
// @name         Cleaner API
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @updateURL    https://github.com/Vector-98/CleanAPI/raw/master/Cleaner%20API.user.js
// @downloadURL  https://github.com/Vector-98/CleanAPI/raw/master/Cleaner%20API.user.js
// @description  try to make things better for everyone
// @author       Vector, Dylon L
// @match        https://fireflycomputers.com/api-sro/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// @grant	 GM_cookie
// @grant        GM_log(Script is loaded and 69% chance of working)
/* globals jQuery, $, waitForKeyElements */
// ==/UserScript==
var $ = window.jQuery;
var preferencesEnabled = false;
var techName;

(function() {
	'use strict';
	var autoHideDoneLines = getCookie("autoHideDoneLines");

	$(".flex_layout_row.layout_2_across.bgnone.bottom-call-action.container_widewidth").hide()
	$(".footer").hide()
	$("#masthead").hide()

	$("#get-item").focusout(function() {
		AutoSro();
	});
	$("#get-item").submit(function() {
		AutoSro();
	});
	function AutoSro() {
		var SroLength = $("#sro-number").val().length
		var SroNum = $("#sro-number").val()

		if(SroLength == 2) {
			var Pre2 = "SRO00000"
			$("#sro-number").val(Pre2+$("#sro-number").val())
		}//end of IF
		if(SroLength == 3) {
			var Pre3 = "SRO0000"
			$("#sro-number").val(Pre3+$("#sro-number").val())
		}//end of IF
		if(SroLength == 4) {
			var Pre4 = "SRO000"
			$("#sro-number").val(Pre4+$("#sro-number").val())
		}//end of IF
		if(SroLength == 5) {
			var Pre5 = "SRO00"
			$("#sro-number").val(Pre5+$("#sro-number").val())
		}//end of IF
		if(SroLength == 6) {
			var Pre6 = "SRO0"
			$("#sro-number").val(Pre6+$("#sro-number").val())
		}//end of IF
	};

	if(getCookie("techName") == "null" || getCookie("techName") == ""){
		setTechName("");
	}
	if(getCookie("autoHideDoneLines") == "null" || getCookie("autoHideDoneLines") == ""){
		setAutoHideDoneLines("no");
	}

	$("#main").prepend('<button type="button" class="glob" id="preferences" style= "background-color: white;position: absolute;top: 0px;right: 0px;margin: 10px;" >Preferences</button>');
	$('#preferences').click(function(){
		if(preferencesEnabled){
			var techName = prompt("Tech name:", getCookie("techName"));
			setTechName(techName);

			var autoHideRTS = prompt("Auto hide done lines? (yes or no):", getCookie("autoHideDoneLines"));
			setAutoHideDoneLines(autoHideRTS);

		}

	})

	function setAutoHideDoneLines(autoHideRTS){
		var cookieName = "autoHideDoneLines=" + autoHideRTS;
		document.cookie = cookieName;
		if(autoHideRTS == "yes"){
			autoHideDoneLines = true;
		}else{
			autoHideDoneLines = false;
		}
	}
	function setTechName(techName){
		var cookieName = "techName=" + techName;
		document.cookie = cookieName;

	}
	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	waitForKeyElements("#full-container", function () {
		$("[id^=snumber-]").css({"width": "110%","float":"left"}) // serial number width fix

		preferencesEnabled = true;

		if($("#sro-number").val().includes(420)){
			$("body").append('<iframe width="1" height="1" wmode="transparent" src="https:\/\/www.youtube.com\/embed\/y6120QOlsfU?controls=0&amp;start=30&autoplay=1&mute=0" frameborder="0" allow="autoplay"></iframe>');

		}else if($("#sro-number").val().includes(69)){
			$("body").append('<iframe width="1" height="1" wmode="transparent" src="https:\/\/www.youtube.com\/embed\/y6120QOlsfU?controls=0&amp;start=30&autoplay=1&mute=0" frameborder="0" allow="autoplay"></iframe>');

		}

		//Begin adding show/hide for each line
		var stateOfButtons = [];//stores state of buttons. false for shown true for hidden
		var numberOfButtons = 0;
		var numberOfSNButtons = 0;
		var RunSave = false;
		var numberOfDIButtons = 0;
		var numberOfTNButtons = 0;

		$('#submitAll').click(function(){//This is called  when the bottom submit button is pressed
			var techName = document.getElementById("addAllTechName").value;
			var checkedBy = document.getElementById("addAllCheckedBy").value;
			var diagnosedBy = document.getElementById("addAllDiagnosedBy").value;

			for(var i = 0; i > 24; i++){
				if(techName != null){
					//set all tech names

					//$("#tech-name-1") =
				}
				if(checkedBy != null){
					//set all checked by
				}
				if(diagnosedBy){
					//set all diagnosed by
				}
			}

		})

		var x = document.createElement("INPUT");//wtf is this
		x.setAttribute("type", "text");//what are you for

		if ($("span.warrantyToStyle").text().includes("PAID")){//Highlights text red if repair is PAID
			$(".warrantyToStyle").css({"color": "red"})
		}

		function toggle(value){//class to flip value
			if (stateOfButtons[value]){
				stateOfButtons[value] = false;
			}else{
				stateOfButtons[value] = true;

			}
		}

		for (var n = 25; n > 0; n--) {//Create button for each line
			if(!$("#snumber-" + n).val() == ""){
				var label = "Line" + n;
				var btn = $("#full-container").prepend('<button type="button" class="glob" id="insert" onload="document.innerHTML(label)" style="background-color: white; border-radius: 8px; margin-top: 4px; margin-right: 4px;" ></button>')
				document.getElementById("insert").innerHTML = label;
				$("#insert").attr("id", "btn" + n);
				stateOfButtons.push(false);
				numberOfButtons++;
			}
		}//Create button for each line
		for (var sn = 25; sn > 0; sn--) {
			if(!$("#snumber-" + sn).val() == ""){
				var SNlabel = "Enable Save";
				var SNbtn = $('<button type="button" class="savebtn" id="insert1" onload="document.innerHTML(SNlabel)" style="background-color: white; border-radius: 8px; margin-top: -5px;"></button>').insertAfter("#snumber-" + sn)
				document.getElementById("insert1").innerHTML = SNlabel;
				$("#insert1").attr("id", "SN-" + sn);
				numberOfSNButtons++;
			}
		}//Create Save button for each line
		for (var di = 25; di > 0; di--) {
			if($("#diagnosed-by-" + di).prop("type") == "text"){
				var DIlabel = "Fill Diag Name";
				var DIbtn = $('<button type="button" class="diagbtn" id="DIinsert" onload="document.innerHTML(DIlabel)" style="background-color: white; border-radius: 8px; /*margin-top: -5px;*/"></button>').insertBefore("#diagnosed-by-" + di)
				document.getElementById("DIinsert").innerHTML = DIlabel;
				$("#DIinsert").attr("id", "DI-" + di);
				numberOfDIButtons++;
				console.log("diag name fill made")
			}
		}//Create Diag button for each line
		for (var tn = 25; tn > 0; tn--) {
			if($("#tech-name-" + tn).prop("type") == "text"){
				var TNlabel = "Fill Tech Name";
				var TNbtn = $('<button type="button" class="techbtn" id="TNinsert" onload="document.innerHTML(TNlabel)" style="background-color: white; border-radius: 8px; /*margin-top: -5px;*/"></button>').insertBefore("#tech-name-" + tn)
				document.getElementById("TNinsert").innerHTML = TNlabel;
				$("#TNinsert").attr("id", "TN-" + tn);
				numberOfTNButtons++;
				console.log("tech name fill made")
			}
		}//Create Tech button for each line

		$("[id^=SN-]").click(function() {
			RunSave = true;
		});//save btn function
		$("[id^=DI-]").click(function() {
			$(this).next("input").focus();
			$(this).next("input").attr("value", getCookie("techName")) // canges html value
			$(this).next("input").val(getCookie("techName")) // updates the text in box
			$(this).next("input").blur()// should make sure it saves

		});//name insert function for Diag Name
		$("[id^=TN-]").click(function() {
			$(this).next("input").focus();
			$(this).next("input").attr("value", getCookie("techName")) // canges html value
			$(this).next("input").val(getCookie("techName")) // updates the text in box
			$(this).next("input").blur()// should make sure it saves
		});//name insert function for Tech Name

		$.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {//function to add double click functionality
			return this.each(function(){
				var clicks = 0, self = this;
				jQuery(this).click(function(event){
					clicks++;
					if (clicks == 1) {
						setTimeout(function(){
							if(clicks == 1) {
								single_click_callback.call(self, event);
							} else {
								double_click_callback.call(self, event);
							}
							clicks = 0;
						}, timeout || 200);
					}
				});
			});
		}

		function hideAll(){
			for(var i = 1; i < 25; i++){
				if(!stateOfButtons[i]){
					singleClick(i);
					toggle[i];
				}
			}
		}//end of hideAll function

		function showAll(){
			for(var i = 1; i < 25; i++){
				if(stateOfButtons[i]){
					singleClick(i);
					toggle[i];
				}
			}
		}

		function singleClick(buttonNumber){
			var buttonName = "#btn" + buttonNumber;
			var buttonNameOn = "#btn" + buttonNumber + ".on";
			var buttonNameNotOn = "#btn" + buttonNumber + "[class='glob']"; //[class!='on']
			var upperLine = buttonNumber * 2;
			$(buttonName).toggleClass("on")
			$(buttonNameOn).css("background-color",setRandomColor);	//#28a745 // removed for random colors
			$(buttonNameNotOn).css("background-color","white");
			$("#full-container > div:eq("+upperLine+")").toggle(250,"linear")
			$("#full-container > div:eq("+(upperLine + 1)+")").toggle(250,"linear")
			toggle(buttonNumber);
			function getRandomColor() {
				var letters = '789ABCD';// 0123456EF cut letters for more light colors
				var color = '#';
				for (var i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 6)];//16
				}
				return color;
			}
			function setRandomColor() {
				$(buttonName).css("background-color", getRandomColor());
			}

		}

		function doubleClick(buttonNumber){
			var count = 0;
			for(var i = 1; i < 25; i++){
				if(stateOfButtons[i]){
					count++;
				}
			}
			if(count > 1){
				if(!stateOfButtons[buttonNumber]){
					showAll();
				}
			}else{
				hideAll();
				singleClick(buttonNumber);
			}

			if(numberOfButtons == count){
				showAll();//TESTING
			}

			if(stateOfButtons[buttonNumber]){
				hideAll();
				singleClick(buttonNumber);
			}
		}

		$("#btn1").single_double_click(function() {
			singleClick(1);
		}, function (){
			doubleClick(1);
		});
		$("#btn2").single_double_click(function() {
			singleClick(2);
		}, function (){
			doubleClick(2);
		});
		$("#btn3").single_double_click(function() {
			singleClick(3);
		}, function (){
			doubleClick(3);
		});
		$("#btn4").single_double_click(function() {
			singleClick(4);
		}, function (){
			doubleClick(4);
		});
		$("#btn5").single_double_click(function() {
			singleClick(5);
		}, function (){
			doubleClick(5);
		});
		$("#btn6").single_double_click(function() {
			singleClick(6);
		}, function (){
			doubleClick(6);
		});
		$("#btn7").single_double_click(function() {
			singleClick(7);
		}, function (){
			doubleClick(7);
		});
		$("#btn8").single_double_click(function() {
			singleClick(8);
		}, function (){
			doubleClick(8);
		});
		$("#btn9").single_double_click(function() {
			singleClick(9);
		}, function (){
			doubleClick(9);
		});
		$("#btn10").single_double_click(function() {
			singleClick(10);
		}, function (){
			doubleClick(10);
		});
		$("#btn11").single_double_click(function() {
			singleClick(11);
		}, function (){
			doubleClick(11);
		});
		$("#btn12").single_double_click(function() {
			singleClick(12);
		}, function (){
			doubleClick(12);
		});
		$("#btn13").single_double_click(function() {
			singleClick(13);
		}, function (){
			doubleClick(13);
		});
		$("#btn14").single_double_click(function() {
			singleClick(14);
		}, function (){
			doubleClick(14);
		});
		$("#btn15").single_double_click(function() {
			singleClick(15);
		}, function (){
			doubleClick(15);
		});
		$("#btn16").single_double_click(function() {
			singleClick(16);
		}, function (){
			doubleClick(16);
		});
		$("#btn17").single_double_click(function() {
			singleClick(17);
		}, function (){
			doubleClick(17);
		});
		$("#btn18").single_double_click(function() {
			singleClick(18);
		}, function (){
			doubleClick(18);
		});
		$("#btn19").single_double_click(function() {
			singleClick(19);
		}, function (){
			doubleClick(19);
		});
		$("#btn20").single_double_click(function() {
			singleClick(20);
		}, function (){
			doubleClick(20);
		});
		$("#btn21").single_double_click(function() {
			singleClick(21);
		}, function (){
			doubleClick(21);
		});
		$("#btn22").single_double_click(function() {
			singleClick(22);
		}, function (){
			doubleClick(22);
		});
		$("#btn23").single_double_click(function() {
			singleClick(23);
		}, function (){
			doubleClick(23);
		});
		$("#btn24").single_double_click(function() {
			singleClick(24);
		}, function (){
			doubleClick(24);
		});

		waitForKeyElements("h1", function () {
			$("h1").hide()
		}); // remove bottom of page header

		waitForKeyElements("body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable", function () {
			if (RunSave) {
				setTimeout(function () {
					RunSave = false
					console.log(RunSave)
				}, 20000);

			}else{
				$("body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable").remove()
				$("body > div.ui-widget-overlay.ui-front").remove()
			}
		});// Removes the "Are you sure you want to change the serial number?" pop up because its kinda a pain to deal with atm

		// comment these out line by line if issues come up also be sure to double check that all saves
		$(document).on( "blur", ".res", function(timeout) { // disable the disable on res notes
			setTimeout(function(){
				$('.res').attr("disabled", false);
				console.log("Res Box Disable Blocked")
			}, timeout || 100);
		});
		$(document).on( "blur", ".opers", function(timeout) { // disable the disable on names
			setTimeout(function(){
				$(".opers").attr("disabled", false);
				console.log("Op Box Disable Blocked")
			}, timeout || 100);
		});
		$(document).on( "blur", ".diagnosed", function(timeout) { // disable the disable on diagnosed box
			setTimeout(function(){
				$(".diagnosed").attr("disabled", false);
				console.log("Diag Box Disable Blocked")
			}, timeout || 100);
		});
		$(document).on( "blur", ".repair-completed", function(timeout) { // disable the disable on repair-completed
			setTimeout(function(){
				$(".repair-completed").attr("disabled", false);
				console.log("Done Box Disable Blocked")
			}, timeout || 100);
		});
		$(document).on( "blur", ".opers-checked", function(timeout) { // disable the disable on paid  repair
			setTimeout(function(){
				$(".opers-checked").attr("disabled", false);
				console.log("opers-checked Box Disable Blocked")
			}, timeout || 100);
		});
		$(document).on( "blur", ".res-select", function(timeout) { // disable the disable on paid repair
			setTimeout(function(){
				$(".res-select").attr("disabled", false);
				console.log("Repair Action Or Specific Action Box Disable Blocked")
			}, timeout || 100);
		});

		//_______________________________________________________________________________________________________________________________________________________________________________________
		$("#full-container").prepend('<div id="EXP"> <button type="button" class="glob" id="copy" style="background-color: white; border-radius: 8px" >Export</button> </div>') //Add export button

		function fixWarranty(warranty){
			switch(warranty) {
				case "FF ADP ONLY":
					return "FF-ADP";
				case "FF ADP":
					return "FF-ADP";
				case "FF BASE + FF ADP":
					return "FF-Full";
				case "FF BASE":
					return "FF-Base";
				case "PAID":
					return "Paid";
				case "Paid":
					return "Paid";
				case "HP BASE":
					return "MFR-Base";
				case "HP BASE ONLY":
					return "MFR-Base";
				case "HP EXT BASE ONLY":
					return "MFR-Base";
				case "HP BASE + HP EXT BASE":
					return "MFR-Base";
				case "LEN BASE":
					return "MFR-Base";
				case "LEN EXT BASE":
					return "MFR-Base";
				case "LEN EXTBASE ONLY":
					return "MFR-Base";
				case "LEN BASE + LEN EXTBASE + LEN ADP": //god damn thats alot of coverage
					return "MFR-Full";
				case "LEN BASE + LEN ADP + LEN EXTBASE":
					return "MFR-Full";
				case "LEN EXT BASE ONLY":
					return "MFR-Base";
				case "LEN BASE + LEN ADP":
					return "MFR-Full";
				case "LEN ADP":
					return "MFR-ADP";
				case "LEN ADP ONLY":
					return "MFR-ADP";
				case "ACER BASE":
					return "MFR-Base";
				case "ACER BASE ONLY":
					return "MFR-Base";
				case "ACER ADP":
					return "MFR-Base";
				case "LEN BASE + LEN EXTBASE":
					return "MFR-Base";
				case "DELL BASE":
					return "MFR-Base";
				case "DELL BASE ONLY":
					return "MFR-Base";
				case "SFW ADP ONLY":
					return "Safeware";
				default:
					return "";
			}
		}

		if(autoHideDoneLines == "yes"){
			showAll();
			for(var k = 1; k < 25; k++){
				var repairBoxName = "#repair-completed-" + k;
				if($(repairBoxName).is(":checked")){
					singleClick(k);
				}
			}
		}

		$('#copy').click(function(){// this is called when export button is clicked
			techName = getCookie("techName");

			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear().toString().slice(-2);

			today = mm + '/' + dd + '/' + yyyy;

			var lenLines = [];
			var hpLines = [];
			var acerLines = [];
			var dellLines = [];

			var lines = [];//array to store arrays of line information.
			var modelsArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(1) > br:nth-child(4)");

			var warrArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(2) > span");

			for (var i = 1; i < 25; i++) {
				if(!$("#snumber-" + i).val() == ""){
					var model = modelsArray[i-1].nextSibling.textContent;
					var modelTrim;

					var warranty = warrArray[i-1].textContent;
					var warrantyFixed;


					if (model.includes("HP-CBK")) {
						warrantyFixed = fixWarranty(warranty);

						modelTrim = model.replace('Model(Item) : HP-CBK-', '');
						hpLines.push([today, techName, $("#sro-number").val(), $("#customer").val(), i, $("#snumber-" + i).val(), modelTrim, warrantyFixed]);

					}
					if (model.includes("LEN-")) {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = model.replace('Model(Item) : LEN-', '');
						lenLines.push([today, techName, $("#sro-number").val(), $("#customer").val(), i, $("#snumber-" + i).val(), modelTrim, warrantyFixed]);

					}
					if (model.includes("ACER-")) {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = model.replace('Model(Item) : ACER-', '');
						acerLines.push([today, techName, $("#sro-number").val(), $("#customer").val(), i, $("#snumber-" + i).val(), modelTrim, warrantyFixed]);

					}
					if (model.includes("DEL-")) {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = model.replace('Model(Item) : DEL-', '');
						dellLines.push([today, techName, $("#sro-number").val(), $("#customer").val(), i, $("#snumber-" + i).val(), modelTrim, warrantyFixed]);

					}

				}
			}
			var empty = [];

			if(!lenLines.length == 0){
				lenLines.push(empty);
			}
			if(!hpLines.length == 0){
				hpLines.push(empty);
			}
			lines = lines.concat(lenLines);
			lines = lines.concat(hpLines);
			lines = lines.concat(acerLines);
			lines = lines.concat(dellLines);

			exportToCsv(($("#sro-number").val() + ".csv"), lines);




		});//end of export function

		function autoHideLinesOnStartup(){
			if(autoHideDoneLines){
				showAll();
				for(var k = 1; k < 25; k++){
					var repairBoxName = "#repair-completed-" + k;
					if($(repairBoxName).is(":checked")){
						singleClick(k);
					}
				}
			}

		}

		$("[id^=repair-completed]").change(function() {//check if repair complete button was pressed then update what lines are hidden or shown
			var line = this.id;
			line = line.replace("repair-completed-", "");
			if(autoHideDoneLines){
				if(document.getElementById(this.id).checked){
					singleClick(line);
				}
			}

		});
		//Code I totally wrote and didn't copy paste from stack overflow
		function exportToCsv(filename, rows) {
			var processRow = function (row) {
				var finalVal = '';
				for (var j = 0; j < row.length; j++) {
					var innerValue = row[j] === null ? '' : row[j].toString();
					if (row[j] instanceof Date) {
						innerValue = row[j].toLocaleString();
					};
					var result = innerValue.replace(/"/g, '""');
					if (result.search(/("|,|\n)/g) >= 0){
						result = '"' + result + '"';
					}
					if (j > 0){
						finalVal += ',';
					}
					finalVal += result;
				}
				return finalVal + '\n';
			};
			var csvFile = '';
			for (var i = 0; i < rows.length; i++) {
				csvFile += processRow(rows[i]);
			}
			var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
			if (navigator.msSaveBlob) { // IE 10+
				navigator.msSaveBlob(blob, filename);
			} else {
				var link = document.createElement("a");
				if (link.download !== undefined) { // feature detection
					// Browsers that support HTML5 download attribute
					var url = URL.createObjectURL(blob);
					link.setAttribute("href", url);
					link.setAttribute("download", filename);
					link.style.visibility = 'hidden';
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}
			}
		}// end of exportToCsv function

		//_______________________________________________________________________________________________________________________________________________________________________________________
		//END OF ALL EXPORT BUTTON CODE
	});
})();
