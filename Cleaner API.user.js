// ==UserScript==
// @name         Cleaner API V0001110 [E]
// @namespace    http://tampermonkey.net/
// @version      1.1.5
// @updateURL    https://github.com/Vector-98/CleanAPI/raw/master/Cleaner%20API.user.js
// @downloadURL  https://github.com/Vector-98/CleanAPI/raw/master/Cleaner%20API.user.js
// @description  try to make things better for everyone
// @author       Vector, Dylon L
// @match        https://fireflycomputers.com/api-sro/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// @grant        GM_log(Script is loaded and 69% chance of working)
/* globals jQuery, $, waitForKeyElements */
// ==/UserScript==
var $ = window.jQuery;

var techName = "";

(function() {
	'use strict';

	$(".flex_layout_row.layout_2_across.bgnone.bottom-call-action.container_widewidth").hide()
	$(".footer").hide()
	$("#masthead").hide()

	waitForKeyElements("#full-container", function () {

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

		$("#full-container").prepend('<div id="EXP"> <button type="button" class="" id="copy" style="background-color: white; border-radius: 8px" >Export</button> </div>') //Add export button


		$('#copy').click(function(){// this is called when export button is clicked
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
			var modelsArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(1) > br:nth-child(3)");

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
			lenLines.push(empty);
			hpLines.push(empty);
			lines = lines.concat(lenLines);
			lines = lines.concat(hpLines);
			lines = lines.concat(acerLines);
			lines = lines.concat(dellLines);

			exportToCsv(($("#sro-number").val() + ".csv"), lines);


		});//end of copy function

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

		//END OF ALL EXPORT BUTTON CODE
		//_______________________________________________________________________________________________________________________________________________________________________________________
		//_______________________________________________________________________________________________________________________________________________________________________________________
		//_______________________________________________________________________________________________________________________________________________________________________________________

		//Begin adding show/hide for each line
		var stateOfButtons = [];//stores state of buttons. false for shown true for hidden
		var numberOfButtons = 0;

		function toggle(value){//class to flip value
			if (stateOfButtons[value]){
				stateOfButtons[value] = false;
			}else{
				stateOfButtons[value] = true;

			}
		}

		for (var i = 25; i > 0; i--) {//Create button for each line
			if(!$("#snumber-" + i).val() == ""){
				var label = "Line" + i;
				var btn = $("#full-container").prepend('<button type="button" class="" id="insert" onload="document.innerHTML(label)" style="background-color: white; border-radius: 8px" ></button>')
				document.getElementById("insert").innerHTML = label;
				$("#insert").attr("id", "btn" + i);
				stateOfButtons.push(false);
				numberOfButtons++;
			}
		}

		jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {//function to add double click functionality
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
			var buttonNameNotOn = "#btn" + buttonNumber + "[class!='on']";
			var upperLine = buttonNumber * 2;
			$(buttonName).toggleClass("on")
			$(buttonNameOn).css("background-color","#28a745");
			$(buttonNameNotOn).css("background-color","white");
			$("#full-container > div:eq("+upperLine+")").toggle()
			$("#full-container > div:eq("+(upperLine + 1)+")").toggle()
			toggle(buttonNumber);
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

		// comment these out line by line if issues come up also be sure to double check that all saves
		$(document).on( "blur", ".res", function(timeout) { // disable the disable on res notes
			setTimeout(function(){
				$('.res').attr("disabled", false);
				console.log("Res Box Disable Blocked")
			}, timeout || 10);
		});
		$(document).on( "blur", ".opers", function(timeout) { // disable the disable on names
			setTimeout(function(){
				$(".opers").attr("disabled", false);
				console.log("Op Box Disable Blocked")
			}, timeout || 10);
		});
		$(document).on( "blur", ".diagnosed", function(timeout) { // disable the disable on diagnosed box
			setTimeout(function(){
				$(".diagnosed").attr("disabled", false);
				console.log("Diag Box Disable Blocked")
			}, timeout || 10);
		});
		$(document).on( "blur", ".repair-completed", function(timeout) { // disable the disable on repair-completed
			setTimeout(function(){
				$(".repair-completed").attr("disabled", false);
				console.log("Done Box Disable Blocked")
			}, timeout || 10);
		});
		$(document).on( "blur", ".opers-checked", function(timeout) { // disable the disable on paid  repair
			setTimeout(function(){
				$(".opers-checked").attr("disabled", false);
				console.log("opers-checked Box Disable Blocked")
			}, timeout || 10);
		});


	});
})();
