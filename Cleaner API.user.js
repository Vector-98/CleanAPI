// ==UserScript==
// @name         Cleaner API
// @namespace    http://tampermonkey.net/
// @version      1.2.99
// @updateURL    https://github.com/Vector-98/CleanAPI/raw/master/Cleaner%20API.user.js
// @downloadURL  https://github.com/Vector-98/CleanAPI/raw/master/Cleaner%20API.user.js
// @description  try to make things better for everyone
// @author       Vector, Dylon L, Kevin B, Nick R
// @match        https://fireflycomputers.com/api-sro/
// @match        http://firefly.johnsonwebsites.com/api-sro/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// @require 	 https://cdn.jsdelivr.net/npm/jsbarcode@3.11.3/dist/barcodes/JsBarcode.code39.min.js
// @grant		 GM_addStyle
// @grant		 GM_cookie
// @grant		 GM.getResourceUrl
// @grant		 GM.info
/* globals jQuery, $, waitForKeyElements, JsBarcode */
// ==/UserScript==
// Test SROs<|||>4020,16753

var vers = GM_info.script.version;
var $ = window.jQuery;
var preferencesEnabled = false;
var techName;
var RunSave = false;
(function() {
	'use strict';
	var autoHideDoneLines = getCookie("autoHideDoneLines");
	var CheckEm = getCookie("CheckEm");
	var Checked = getCookie('Checked');

	$(".flex_layout_row.layout_2_across.bgnone.bottom-call-action.container_widewidth").remove()
	$(".footer").remove()
	$("#masthead").remove()
	document.getElementById("sro-submit").value="Load SRO";
	//var multisel = GM.getResourceUrl('https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.css')
	console.log


	$("#get-item").focusout(function() {
		AutoSro();
	});
	$("#get-item").submit(function() {
		AutoSro();
	});
	function AutoSro() {
		var SroLength = $("#sro-number").val().length
		var SroNum = $("#sro-number").val()

		if(SroLength == 1) {
			var Pre1 = "SRO000000"
			$("#sro-number").val(Pre1+$("#sro-number").val())
		}//end of IF
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
		if(SroLength == 7) {
			var Pre7 = "SRO"
			$("#sro-number").val(Pre7+$("#sro-number").val())
		}//end of IF
		/* 		if(SroLength == 10){
			$('#sro-submit').prop('disabled', false)
		}else{
			$('#sro-submit').prop('disabled', true)
		} */
	};

	if(getCookie("techName") == "null" || getCookie("techName") == ""){
		setTechName("");
	}
	if(getCookie("autoHideDoneLines") == "null" || getCookie("autoHideDoneLines") == ""){
		setAutoHideDoneLines("no");
	}
	if(getCookie("CheckEm") == "null" || getCookie("CheckEm") == ""){
		CheckEm("no");
	}

	$("#main").prepend('<button type="button" class="glob" id="preferences" style= "background-color: white;position: absolute;top: 0px;right: 0px;margin: 10px;" >Preferences</button>');

	$('#preferences').click(function(){
		if(preferencesEnabled){
			var techName = prompt("Tech name:", getCookie("techName"));
			setTechName(techName);

			var autoHideRTS = prompt("(Experimental feature) - Auto hide done lines? (yes or no):", getCookie("autoHideDoneLines"));
			setAutoHideDoneLines(autoHideRTS);

			var CheckEm = prompt("(Experimental feature) - Generate Checksum of page? (yes or no):", getCookie("CheckEm"));
			setCheckEm(CheckEm);
		}
	})

	function setAutoHideDoneLines(autoHideRTS) {
		var CookieDate = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear() + 1);
		var cookieName = "autoHideDoneLines=" + autoHideRTS + "; expires=" + CookieDate.toUTCString() + ";";
		// alert("autoHideDoneLines:\n\n" + cookieName); // Debugging
		document.cookie = cookieName;
		if((autoHideRTS.toLowerCase() == "yes") || (autoHideRTS.toLowerCase() == "y")){
			autoHideDoneLines = true;
		} else {
			autoHideDoneLines = false;
		}
	}
	function setTechName(techName) {
		var CookieDate = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear() + 1);
		var cookieName = "techName=" + techName + "; expires=" + CookieDate.toUTCString() + ";";
		// alert("techName:\n\n" + cookieName); // Debugging
		document.cookie = cookieName;
	}
	function setCheckEm(CheckEm) {
		var CookieDate = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear() + 1);
		var cookieName = "CheckEm=" + CheckEm + "; expires=" + CookieDate.toUTCString() + ";";
		document.cookie = cookieName;
		if((CheckEm.toLowerCase() == "yes") || (CheckEm.toLowerCase() == "y")){
			CheckEm = true;
		} else {
			CheckEm = false;
		}
	}
	function setChecked(Checked) {
		String.prototype.hashCode = function(){
			var hash = 0, i, char;
			if (this.length == 0) return hash;
			for (i = 0; i < this.length; i++) {
				char = this.charCodeAt(i);
				hash = ((hash<<5)-hash)+char;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		};
		var CookieDate = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear() + 1);
		var cookieName = "Checked" + Checked + "; expires=" + CookieDate.toUTCString() + ";";
		document.cookie = cookieName;
		Checked = $("#full-container").prop('outerHTML').hashCode();
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


	waitForKeyElements("body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable", function () {
		if (RunSave) {
			console.log("SN and Warr save enabled")
		}else{
			$("body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable").remove()
			$("body > div.ui-widget-overlay.ui-front").remove()
			console.log(RunSave+" wait else")
			console.log("SN and Warr save disabled")
		}
	});/// Removes the "Are you sure you want to change the serial number?" pop up because its kinda a pain to deal with atm

	waitForKeyElements("#full-container", function () {
		$("[id^=snumber-]").css({"width": "112%","float":"left"}) // serial number width fix
		$("[id^=warranty-]").css({"width": "123%","float":"left"}) // Warranty width fix
		$("[id^=customer]").css({"width": "145%","float":"left"}) // Customer width fix
		$("[id^=res-notes-]").css({"width": "100%"})
		$("[id^=diagnosed-notes-]").css({"width": "104%"})
		$("[id^=out-]").css({"width": "100%"})
		$("[id^=device-notes-]").css({"width": "104%"})

		preferencesEnabled = true;

		if($("#sro-number").val().includes(420)){
			$("body").append('<iframe width="1" height="1" wmode="transparent" src="https:\/\/www.youtube.com\/embed\/y6120QOlsfU?controls=0&amp;start=30&autoplay=1&mute=0" frameborder="0" allow="autoplay"></iframe>');

		}else if($("#sro-number").val().includes(69)){
			$("body").append('<iframe width="1" height="1" wmode="transparent" src="https:\/\/www.youtube.com\/embed\/y6120QOlsfU?controls=0&amp;start=30&autoplay=1&mute=0" frameborder="0" allow="autoplay"></iframe>');

		}

		//$("#full-container").append('<input id="item-submit" class="btn btn-success" type="submit" name="save_items" value="Submit">')

		//Begin adding show/hide for each line
		var stateOfButtons = [];//stores state of buttons. false for shown true for hidden
		var numberOfButtons = 0;
		var createdButtons = 0;
		var AllLines2DArray = []; //Stores array of line number and upperline index.
		var currentUpperLine = 2;
		var jumpMenu = ("<ul style='list-style-type:none;position:fixed;left:0px;top:136px;padding-left: 2px;' id='jumpMenu'></ul>");
		$("#full-container").append(jumpMenu);
		var SroNum = $("#sro-number").val()
		$('title').text(SroNum);

		for(var m = 1; m <= 25; m++){
			if(!$("#snumber-" + m).val() == ""){//check if line exist
				AllLines2DArray.push([m,currentUpperLine]);
				currentUpperLine += 2;
				//console.log(AllLines2DArray)
			}

		}// part of 2d array for line numbers

		function toggle(value){//class to flip value
			if (stateOfButtons[value]){
				stateOfButtons[value] = false;
			}else{
				stateOfButtons[value] = true;

			}
		};

		for (var n = 25; n > 0; n--) {//Create button for each line
			if(!$("#snumber-" + n).val() == ""){
				var label = "Line " + n;
				var done = "";
				var butt = $("#full-container").prepend('<button type="button" class="glob" id="insert" onload="document.innerHTML(label)" style="background-color: white; border-radius: 8px; margin-top: 4px; margin-right: 4px; line-height: normal;" > </button>')
				document.getElementById("insert").innerHTML = label;
				$("#insert").attr("id", "butt-" + n);// +"-"+CBI
				stateOfButtons.push(false);
				numberOfButtons++;
				createdButtons++;
				var l4label;

				if($("#snumber-" + n).val().length <= 11){// For LEN/HP
					l4label = $('#snumber-' + n).val().slice(-4);
				}else if($("#snumber-" + n).val().length == 15){// for ASUS CBK
					l4label = $('#snumber-' + n).val().slice(-4);
				}else{
					l4label = $('#snumber-' + n).val().slice(14,18); // for ACER
				}
				if($('#diagnosed-notes-'+n).is(':empty') == true){
					$('#diagnosed-notes-'+n).append('{,}')
				}

				var l4SN = $("<small id='Last4' onload='document.innerHTML(l4label)' style='display: block; line-height: normal;'> </small>").appendTo("#butt-"+ n)// +"-"+ CBI
				document.getElementById("Last4").innerHTML = ("SN: ")+l4label;
				$("#Last4").attr("id", "Last4-L" + n);

				// jump menu trash
				var repairBoxCheck = "#repair-completed-" + n;
				var diagBoxCheck = "#diagnosed-" + n;
				var shipBoxCheck = "#QtyShippedConv-" +n;
				label = "Ln " + n;
				var whichButt = "#butt-" + n;
				var jumpLinks123 = ('<li><a id="placeholder">' + label + '</a></li>');
				var paidCheck = checkPaidStatus(n);
                if(paidCheck.length > 0){
                    paidCheck = "*";
                } else{
                    paidCheck = "";
                }

				if($(shipBoxCheck).is(":checked")){
                    $(whichButt).prepend('<span id="buttCircle-' + n + '" style="margin-right:5px; height:12px; width:12px; background-color:gray; border-radius:50%; display:inline-block;"></span>');
					label = "Ln " + n + " Ship" + paidCheck;
					jumpLinks123 = ('<li><a id="placeholder" style="color:gray">' + label + '</a></li>');

				}else if($(repairBoxCheck).is(":checked")){
                    $(whichButt).prepend('<span id="buttCircle-' + n + '" style="margin-right:5px; height:12px; width:12px; background-color:green; border-radius:50%; display:inline-block;"></span>');
					label = "Ln " + n + " RTS" + paidCheck;
					jumpLinks123 = ('<li><a id="placeholder" style="color:green";>' + label + '</a></li>');
					//$("#" + jumpLinkID).css("color", "green");
				}
				else if($(diagBoxCheck).is(":checked")){
                    $(whichButt).prepend('<span id="buttCircle-' + n + '" style="margin-right:5px; height:12px; width:12px; background-color:#800020; border-radius:50%; display:inline-block;"></span>');
					label = "Ln " + n + " Diag" + paidCheck;
					jumpLinks123 = ('<li><a id="placeholder" style="color:#800020";>' + label + '</a></li>');

				} else {
                    $(whichButt).prepend('<span id="buttCircle-' + n + '" style="margin-right:5px; height:12px; width:12px; background-color:white; border-radius:50%; display:inline-block;"></span>');
                }
				
				let jumpLinkID = "jumpLink"+(n+1);
				$("#placeholder").attr("id",jumpLinkID);
				$("#"+jumpLinkID).attr("href","#paid-" + (n+1));
				$("#jumpMenu").prepend(jumpLinks123);
			}

		};//Create button for each line and add last 4 of SN
		/* 		for (var sn = 25; sn > 0; sn--) {
			if(!$("#snumber-" + sn).val() == ""){
				var SNlabel = "Enable Pop-up";
				var SNbtn = $('<button type="button" class="savebtn" id="insert1" onload="document.innerHTML(SNlabel)" style="background-color: white; border-radius: 8px; margin-top: -5px;width: 110%;"></button>').insertAfter("#snumber-" + sn)
				document.getElementById("insert1").innerHTML = SNlabel;
				$("#insert1").attr("id", "SN-" + sn);
			}
		};//Create Save button for each line */
		for (var di = 25; di > 0; di--) {
			if($("#diagnosed-by-" + di).prop("type") == "text"){
				var DIlabel = "Fill Diag Name";
				var DIbtn = $('<button type="button" class="diagbtn" id="DIinsert" onload="document.innerHTML(DIlabel)" style="background-color: white; border-radius: 8px; /*margin-top: -5px;*/"></button>').insertBefore("#diagnosed-by-" + di)
				document.getElementById("DIinsert").innerHTML = DIlabel;
				$("#DIinsert").attr("id", "DI-" + di);
				console.log("diag name fill made")
			}
		};//Create Diag button for each line
		for (var tn = 25; tn > 0; tn--) {
			if($("#tech-name-" + tn).prop("type") == "text"){
				var TNlabel = "Fill Tech Name";
				var TNbtn = $('<button type="button" class="techbtn" id="TNinsert" onload="document.innerHTML(TNlabel)" style="background-color: white; border-radius: 8px; /*margin-top: -5px;*/"></button>').insertBefore("#tech-name-" + tn)
				document.getElementById("TNinsert").innerHTML = TNlabel;
				$("#TNinsert").attr("id", "TN-" + tn);
				console.log("tech name fill made")
			}
		};

		$(".save-line").click(function () {//Live updating of jumpmenu
			var hold = $(this).attr("data-id");
			var label = "";
			//console.log("Element was removed " + $(this).attr("data-id"));
			repairBoxCheck = "#repair-completed-" + hold;
			diagBoxCheck = "#diagnosed-" + hold;
			shipBoxCheck = "#QtyShippedConv-" + hold;
			var paidCheck = checkPaidStatus(n);
            if(paidCheck.length > 0){
				paidCheck = "*";
            } else{
				paidCheck = "";
			}

			if($(shipBoxCheck).is(":checked")){
				label = "Ln " + hold + " Ship" + paidCheck;
                $("#buttCircle-" + hold).css("background-color", "gray");
				$("#jumpLink" + hold).text(label);
				$("#jumpLink" + hold).css("color", "gray");
				//console.log(label);
				//jumpLinks123 = ('<li><a id="placeholder" style="color:gray">' + label + '</a></li>');

			}else if($(repairBoxCheck).is(":checked")){
				label = "Ln " + hold + " RTS" + paidCheck;
                $("#buttCircle-" + hold).css("background-color", "green");
				$("#jumpLink" + hold).text(label);
				$("#jumpLink" + hold).css("color", "green");
				//console.log(label);
				//jumpLinks123 = ('<li><a id="placeholder" style="color:green";>' + label + '</a></li>');
			}
			else if($(diagBoxCheck).is(":checked")){
				label = "Ln " + hold + " Diag" + paidCheck;
                $("#buttCircle-" + hold).css("background-color", "#800020");
				$("#jumpLink" + hold).text(label);
				$("#jumpLink" + hold).css("color", "#800020");
				//console.log(label);
				//jumpLinks123 = ('<li><a id="placeholder">' + label + '</a></li>');

			} else {
                $("#buttCircle-" + hold).css("background-color", "white");
				$("#jumpLink" + hold).text("Line " + hold);
				$("#jumpLink" + hold).css("color", "");
			}
		});

		$("#jumpMenu").prepend('<div id="key" style="position:fixed; background-color:black; left:100px; top:136px; border:5px solid black; color:white;"></div>');
		$("#key").hide();

		$("a").hover(function(){
			var textHold = $(this).text();
			var textLength = textHold.length;
			var status = textHold.slice(textLength - 4);
			//console.log(textLength);
			//console.log(status);

            //console.log((this.id).slice(8));
            var lineNumber = (this.id).slice(8);
            //console.log(lineNumber);
            var paidStatus = '<div id="paidStatus">' + checkPaidStatus(lineNumber) + '</div></div>';//Returns text explaining paid status
            var repairStatus = '<div id="key" style="position:fixed; background-color:black; left:100px; top:125px; border:5px solid black; color:white;"><p>';
            //console.log(paidStatus);

			if(status == "iag*" || status == "Diag"){
				$("#key").html(repairStatus + 'Diagnosed</p>' + paidStatus);
				$("#key").show();
			} else if(status == "RTS*" || status == " RTS"){
				$("#key").text(repairStatus + 'Ready to Ship</p>' + paidStatus);
				$("#key").show();
			} else if(status == "hip*" || status == "Ship"){
				$("#key").text(repairStatus + 'Shipped</p>' + paidStatus);
				$("#key").show();
			}
		}, function(){
			$("#key").hide();
		});

        function checkPaidStatus(lineNumb){
            /*
            paid-1
            quote-sent-1
            quote-approved-1
            repair-declined-1
            repairBoxCheck = "#repair-completed-" + hold;
            if($(repairBoxCheck).is(":checked")){
            */
            var paidRepairCheck = "#paid-" + lineNumb;
            var quoteSentCheck = "#quote-sent-" + lineNumb;
            var quoteApprovedCheck = "quote-approved-" + lineNumb;
            var repairDeclineCheck = "repair-declined-" + lineNumb;
            if($(repairDeclineCheck).is(":checked")){
                return "Paid Repair was declined.";
            }else if ($(quoteApprovedCheck).is(":checked")){
                return "Paid Repair is approved, either waiting for parts or ready to be worked on.";
            }else if ($(quoteSentCheck).is(":checked")){
                return "Quote sent to customer, waiting on response.";
            }else if ($(paidRepairCheck).is(":checked")){
                return "Unit is a paid repair, waiting on quote";
            }else {
                return "";
            }
            //console.log($(paidRepairCheck).is(":checked"));
            //return $(paidRepairCheck).is(":checked");
        };

		//Create Tech button for each line

		/* 		$("[id^=SN-]").on('click', function(){
			RunSave = !RunSave
			console.log(RunSave)
		});
		$("[id^=SN-]").on("click", function(){
			if(RunSave){
				$("[id^=SN-]").text("Disable Pop-up")
				$("[id^=SN-]").css("background-color","28a745")
			}else{
				$("[id^=SN-]").text("Enable Pop-up")
				$("[id^=SN-]").css("background-color","white")
			}
		}); */
		$("[id^=DI-]").on('click', function(){
			if($("[id^=diagnosed-by-]").is(':disabled') === true){
				console.log("Stoped name fill ")
			}else{
				$(this).next("input").focus();
				$(this).next("input").attr("value", getCookie("techName")) // canges html value
				$(this).next("input").val(getCookie("techName")) // updates the text in box
				$(this).next("input").blur()// should make sure it saves
			}

		});//name insert function for Diag Name
		$("[id^=TN-]").on('click', function(){
			if($("[id^=tech-name-]").is(':disabled') === true){
				console.log("Stoped name fill ")
			}else{
				$(this).next("input").focus();
				$(this).next("input").attr("value", getCookie("techName")) // canges html value
				$(this).next("input").val(getCookie("techName")) // updates the text in box
				$(this).next("input").blur()// should make sure it saves
			}
		});//name insert function for Tech Name

		let jumpLinks = ('<li><a id="placeholder"></a></li>');
		let jumpLinkID = "jumpLink"+(1);
		$("#placeholder").attr("id",jumpLinkID);
		$("#"+jumpLinkID).attr("href","#paid-" + (1));
		$("#jumpMenu").prepend(jumpLinks);

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
			for(var i = 1; i < 26; i++){
				if(!stateOfButtons[i]){
					singleClick(i);
					toggle[i];
				}
			}
		};//end of hideAll function
		function showAll(){
			for(var i = 1; i < 26; i++){
				if(stateOfButtons[i]){
					singleClick(i);
					toggle[i];	
				}
			}
		};
		function singleClick(buttonNumber){
			var buttonName = "#butt-" + buttonNumber;
			var buttonNameOn = "#butt-" + buttonNumber + ".on";
			var buttonNameNotOn = "#butt-" + buttonNumber + "[class='glob']"; //[class!='on']
			var upperLine;
			var currElement;

			for(var q = 0; q < AllLines2DArray.length; q++){
				currElement = AllLines2DArray[q];
				if(currElement[0] == buttonNumber){
					upperLine = currElement[1];
				}
			}
			$(buttonName).toggleClass("on")
			// $(buttonNameOn).css("background-color",getRandomColor());	// Random colors - Aka last commit by Tony ;)
			// $(buttonNameOn).css("background-color","#28a745");	// Green - Aka last commit by Dylon ;)
			$(buttonNameOn).css("background-color","#FA4D1C");	// "FireFly" Orange - Aka last commit by Kevin ;)
			$(buttonNameNotOn).css("background-color","white");
			$("#full-container > div:eq("+upperLine+")").toggle(110,"linear")
			$("#full-container > div:eq("+(upperLine + 1)+")").toggle(110,"linear")
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

		};
		function doubleClick(buttonNumber){
			var count = 0;
			$('title').text(SroNum.slice(5) + " - Line " + buttonNumber);
			for(var i = 0; i < 25; i++){
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

		};


		var rawbutt = $("[id^=butt-]").click(function() {
			rawbutt = this.id;
		});	//  create var for btn selectors
		var linebtn = $("[id^=butt-]").click(function() {
			linebtn = this.id;
			linebtn = linebtn.replace("butt-", "");

		});	//	create var raw number for btn selectors

		$(rawbutt).single_double_click(function() {
			singleClick(linebtn);
		}, function (){
			doubleClick(linebtn);
		});	// handles the btn clicks


		waitForKeyElements("h1", function () {
			$("h1").hide()
		}); // remove bottom of page footer
		waitForKeyElements("h6", function(){
			$("h6").remove()
		}) // removes ....... from save box

		$(function() {
			$("textarea").on("keyup", function(event) {
				var value = $(this).val();
				if (value.indexOf("'") != -1) {
					$(this).val(value.replace(/\'/g, ""));
				}
			})
			$("input").on("keyup", function(event) {
				var value = $(this).val();
				if (value.indexOf("'") != -1) {
					$(this).val(value.replace(/\'/g, ""));
				}
			})
		})// revoves ' from testareas and inputs as you type



		$("body > div.navbar-brand > a").removeAttr("href");
		$('body > div.navbar-brand > a > img').removeAttr("alt");
		//$("#bottom-item-wrap > div.col-md-12").append(box)
		//$('#bottom-item-wrap > div.col-md-12 > div > label').append(chkdrp)
		//$('#bottom-item-wrap > div.col-md-12').append(btndrp)


		//_______________________________________________________________________________________________________________________________________________________________________________________
		$("#full-container").prepend('<div id="EXP"> <button type="button" class="glob" id="copy" style="background-color: white; border-radius: 8px" >Export</button> </div>') //Add export button
		$("#EXP").append('<button type="button" class="glob" id="PrintBtn" style="background-color: white; border-radius: 8px" >Print</button>') //Add print BTN

		function fixWarranty(warranty){
			switch(warranty) {
				case "PAID":
				case "Paid":
					return "Paid";

				case "FF BASE":
				case "FF EXT BASE":
				case "FF BASE + FF EXT BASE":
					return "FF-Base";

				case "FF ADP":
				case "FF ADP ONLY":
					return "FF-ADP";

				case "LEN ADP":
				case "LEN ADP ONLY":
				case "HP ADP":
				case "ACER ADP":
					return "MFR-ADP";

				case "FF BASE + FF ADP":
				case "FF EXT BASE+ FF ADP":
				case "FF EXT BASE + FF ADP":
				case "FF ADP + FF EXT BASE":
					return "FF-Full";


				case "LEN BASE"://-----------------------// Start of Lenovo Base warranties
				case "LEN EXT BASE":
				case "LEN EXT BASE ONLY":
				case "LEN EXTBASE ONLY":
				case "LEN BASE ONLY":
				case "LEN BASE + LEN EXT BASE":
				case "LEN BASE + LEN EXTBASE":
				case "HP BASE":	//-----------------------// Start of HP Base warranties
				case "HP BASE ONLY":
				case "HP EXT BASE ONLY":
				case "HP BASE + HP EXT BASE":
				case "HP BASE+ HP EXT BASE":
				case "HP BASE +HP EXT BASE":
				case "ACER BASE"://----------------------// Start of Acer Base warranties
				case "ACER BASE ONLY":
				case "DELL BASE"://----------------------// Start of Dell Base warranties
					return "MFR-Base";

				case "DELL BASE ONLY":
					return "MFR-Base";

				case "LEN BASE + LEN EXTBASE + LEN ADP": //god damn thats alot of coverage	// Start of Lenovo Full warranties
				case "LEN ADP + LEN BASE + LEN EXTBASE":
				case "LEN BASE + LEN ADP + LEN EXTBASE":
				case "LEN BASE + LEN ADP":
				case "LEN ADP + LEN BASE":
				case "LEN EXT BASE + LEN ADP ONLY":
				case "LEN EXTBASE ONLYLEN ADP ONLY":
				case "HP BASE + HP ADP"://---------------// Start of HP Full warranties
					return "MFR-Full";

				case "SFW ADP ONLY":
					return "Safeware";

				default:
					return "Missing";
			}
		};
		function FixParts(PrMatch){
			console.log('fixparts passed var>>'+PrMatch.toLowerCase())
			switch(PrMatch.toLowerCase()){
				case "batt":
				case "bat":
					return "Batt.";
				case "mlb":
				case "mb":
					return "MLB";
				case "lcd":
					return "LCD";
				case "lcdc":
				case "lcd cbl":
					return "LCD Cable";
				case "kb":
					return "KB";
				case "tpd":
					return "TPD";
				case "tpdc":
				case "tpd cbl":
					return "TPD Cable";
				case "wc":
				case "wifi":
					return "WLAN";
				case "dc-in":
				case "dc jack":
				case "dc":
					return "DC Jack";
				case "hdd":
				case "ssd":
				case "m.2":
					return "HDD/SSD";
				case "speakers":
				case "spk":
					return "Speakers";
				case "button":
				case "power button board":
					return "Power Button Board";
				case "usb board":
				case "db":
					return "USB Board";
				case "db":
				case "auido board":
					return "Audio Board";
				case "bezel":
				case "bez":
					return "LCD Bezel";
				case "top":
				case "top cover":
					return "LCD Back Cover";
				case "bottom case":
				case "btm":
					return "Bottom Chassis";
				case "hinges":
				case "hng":
					return "Hinges";
				case "webcam":
				case "cam":
					return "Webcam";
				case "secondary webcam":
					return "Secondary Webcam";
				case "webcam cable":
				case "cam cbl":
					return "Webcam Cable";
				case "cable kit":
					return "Cable Kit";
				case "ram":
				case "RAM":
					return "RAM";
				case "click board":
					return "Click Board";
				case "adhesive":
					return "LCD Adhesive Strip";
				default:
					return PrMatch
			}
		}
		function FixModel(SlModel){
			switch(SlModel){
				case 'HP':
					return 'HP-CBK';
				case 'Lenovo':
					return 'LEN-';
				case 'Acer':
					return'ACER';
				case 'Asus':
					return'ASUS-CBK';
				case 'Dell':
					return'DEL';
			}
		}

		if(autoHideDoneLines == true){
			showAll();
			for(var k = 0; k < 26; k++){
				var repairBoxName = "#repair-completed-" + k;
				if($(repairBoxName).is(":checked")){
					singleClick(k);
				}
			}
		};

		if(CheckEm == "yes"){
			console.log("check em true")
			$("#EXP").append('<button type="button" class="glob" id="Checksum" style="background-color: white; border-radius: 8px" >Checksum Gen</button>')
			console.log("last page checksum   " + Checked)

			String.prototype.hashCode = function(){
				var hash = 0, i, char;
				if (this.length == 0) return hash;
				for (i = 0; i < this.length; i++) {
					char = this.charCodeAt(i);
					hash = ((hash<<5)-hash)+char;
					hash = hash & hash; // Convert to 32bit integer
				}
				return hash;
			};
			var fullPage = $("#full-container").prop('outerHTML')

			waitForKeyElements('#popContainer',function(){
					$('#popContainer').remove()
					$('#sro-submit').prop("disabled", false );
				})

			$('#Checksum').on("click",function(){
				console.log(fullPage.hashCode())
				var hash = fullPage.hashCode()
				var opens = prompt("Copy this code: "+fullPage.hashCode()+"\nPaste copied code after ")
				if(hash == opens){
					prompt("Checksum Matched")
				}else{
					prompt("Checksum Does not match\nDouble check your fields and reloading the SRO page")
				}

			})
		};// checksum goodies

		$('#copy').click(function(){// this is called when export button is clicked
			var techName = getCookie("techName");
			/* 			if(techName === "Tony"){
				techName = "Vector"
			}else{
				techName = getCookie("techName");
			};
 */
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear().toString().slice(-2);

			today = mm + '/' + dd + '/' + yyyy;

			var lenLines = [];
			var hpLines = [];
			var acerLines = [];
			var dellLines = [];
			var FstLine = $(":text").eq(3).data("id")
			const TotLines = $('#num-lines').val();
			var CurIn = 0;
			var EXP2DArray = []

			var lines = [];//array to store arrays of line information.
			//var modelsArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(1) > br:nth-child(3)");
			var modelsArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(2) > a.btn.btn-info.btn-sm.text-white.w-100.rounded-bottom") // grab text from linw
			var warrArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(2) > span");

			for(var m = 1; m <= 25; m++){
				if(!$("#snumber-" + m).val() == ""){//check if line exist
					EXP2DArray.push([m]);
					//console.log(EXP2DArray)
				}
			}
			for (var i = 0; i <= 25; i++) {//for (var i = 1; i < 25; i++
				if(!$("#snumber-" + i).val() == ""){
					CurIn ++
					//console.log(CurIn)
					//var model = modelsArray[CurIn-1].nextSibling.textContent;//var model = modelsArray[i-1].nextSibling.textContent; used with pre patched api with model on page between <br>
					var premodel = modelsArray[CurIn-1].textContent;
					console.log(premodel+'line model pre slice')
					var SlModel
					var model
					var modelTrim;
					var SroNum = $("#sro-number").val()
					var Cust = $("#customer").val()
					var SerNum = $("#snumber-" + i).val()
					var fullWarrName = "#warranty-" + i;
					var warranty = $("#warranty-" + i).val();
					var location = $("#shelf-location").val();
					var diagNotes = $("#diagnosed-notes-" + i).val();
					var warrantyFixed;
					var s = ""// space filler may not be needed but i did it anyway[V]
					model = FixModel(SlModel)
					try {
						var regex = /{([\s\S]+?)}/i; // search match beteen { }
						var match = regex.exec(diagNotes) // find match in diag notes
						var prt = ['','','','',''] // array to put matches
						var PrMatch = match[1].split(",") // split matches by ,
						let ss = prt.push(PrMatch)// put matches in
						for(var v = 0; v < PrMatch.length; v++) {
							//find index of prtMatch in keys;
							//put that index in values array
							//prt = part value
							prt[v] = FixParts(PrMatch[v])
							console.log(prt[v]+'<final exported part|||Pre matched parts>'+FixParts(PrMatch[v]))
						}
					}
					catch(err){
						//alert('missing parts to export in Line'+i+' diag notes try putting parts in like {mlb,kb,lcd} no spaces up to 5 parts')
						console.log('missing parts in diag notes line'+i)
					}
					var regexA = /(^[^\s]+)/;
					var matchA = regexA.exec(premodel)
					SlModel = matchA[1]
					model = FixModel(SlModel)

					if ($("#paid-"+i).is(":checked") == true){
							warranty = "Paid"
						}else{
							warranty = $("#warranty-" + i).val();
						}
					if (model.includes("HP-CBK") ) {
						warrantyFixed = fixWarranty(warranty);
						//modelTrim = model.replace('Model(Item) : HP-CBK-', '');
						modelTrim = model.replace('HP-CBK', '');
						hpLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])
					}
					else if (model.includes("HP-PBK")) {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = model.replace('Model(Item) : HP-PBK-', '');
						hpLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else if (model.includes("HP-EBK")) {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = model.replace('Model(Item) : HP-EBK-', '');
						hpLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else if (model.includes("LEN-")) {
						warrantyFixed = fixWarranty(warranty);
						//modelTrim = model.replace('Model(Item) : LEN-', '');
						modelTrim = model.replace('LEN-', '');
						lenLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else if (model.includes("ACER-")) {
						warrantyFixed = fixWarranty(warranty);
						//modelTrim = model.replace('Model(Item) : ACER-', '');
						modelTrim = model.replace('ACER-', '');
						acerLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else if (model.includes("ASUS-CBK") ) {
						warrantyFixed = fixWarranty(warranty);
						//modelTrim = model.replace('Model(Item) : ASUS-CBK-', '');
						modelTrim = model.replace('ASUS-CBK-', '');
						dellLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else if (model.includes("DEL-")) {
						warrantyFixed = fixWarranty(warranty);
						//modelTrim = model.replace('Model(Item) : DEL-', '');
						modelTrim = model.replace('DEL-', '');
						dellLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else if (model.includes("GEN-REPAIR")) {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = model.replace('Model(Item) : GEN-REPAIR', 'MISSING MODEL');
						dellLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])


					}
					else {
						warrantyFixed = fixWarranty(warranty);
						modelTrim = 'MISSING MODEL'
						dellLines.push([today, techName, SroNum, Cust, i, location, SerNum, modelTrim, warrantyFixed, s, s, prt[0], s, prt[1], s, prt[2], s, prt[3], s, prt[4]])
					}

				}

			}// most of the thing you are looking for are here
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
			if(autoHideDoneLines == true){
				showAll();
				for(var k = 1; k < 25; k++){
					var repairBoxName = "#repair-completed-" + k;
					if($(repairBoxName).is(":checked")){
						singleClick(k);
					}
				}
			}

		};

		$(document).on("keydown", function(e){
			if(e.ctrlKey && e.keyCode == 80){
				customPrint();
				//console.log("ctrl+p pressed")
			}
		});
		$('#PrintBtn').click(function(){
			customPrint();
		});

		function customPrint(){
			GM.getResourceUrl('https://cdn.jsdelivr.net/npm/jsbarcode@3.11.3/dist/barcodes/JsBarcode.code39.min.js')

			var w = window.open("","Print page 9000","width=816","height=1056");
			const openerWindow = window.opener
			var stuffToPrint = $("#sro-number").val().fontsize(7);
			var PntLoc = $("#shelf-location").val()

			var OnlySRO = document.querySelector("#sro-number").value
			var osr = String(OnlySRO)

			if(PntLoc.length < 1){
				PntLoc = "__"
			}else{
				PntLoc = $("#shelf-location").val().toUpperCase();
			}

			//w.document.write("<h1 style='position: absolute; top: 89%; right: 33%;font-family: cursive;'>" +stuffToPrint+ "</h1>");
			w.document.write("<h2 style='position: absolute; transform: rotate(-90deg); bottom: 45%; left: 77%;font-family: cursive;'>" +stuffToPrint+ "</h2>");

			w.document.write("<h1 style='position: absolute; top: 89%; right: 45%;font-family: cursive');>" +stuffToPrint+ "</h1>");
			w.document.write("<h1 style='position: absolute; top: 83%; right: 45%;font-family: cursive;font-size: xxx-large;white-space: nowrap;'>Location: " +PntLoc+ "</h1>");
			w.document.write("<h2 style='position: absolute; transform: rotate(-90deg); bottom: 43%; left: 70%;font-family: cursive;font-size: xxx-large;white-space: nowrap;'>Location: " +PntLoc+ "</h2>");
			w.document.write("Customer: ");
			w.document.write($("#customer").val());
			w.document.write("<br> <br>");

			var lenLines = [];
			var hpLines = [];
			var acerLines = [];
			var dellLines = [];

			var lines = [];//array to store arrays of line information.
			//var modelsArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(1) > br:nth-child(3)");
			var warrArray = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(1) > div:nth-child(2) > span");
			var custDesc = document.querySelectorAll("#top-item-wrap > div.col-md-4 > div > div:nth-child(2) > div > a > br:nth-child(1)");
			var EXP2DArray = []
			var CurIn = 0
			var FstLine = $(":text").eq(3).data("id")
			const TotLines = $('#num-lines').val();

			for(var m = 1; m <= 25; m++){
				if(!$("#snumber-" + m).val() == ""){//check if line exist
					EXP2DArray.push([m]);
					console.log(EXP2DArray)
				}

			}

			for (var i = 0; i <= 25; i++) {//i = 1
				if(!$("#snumber-" + i).val() == ""){
					CurIn ++
					console.log("EXP"+EXP2DArray[i-1])
					console.log(i)
					console.log(CurIn-1)

					//var model = modelsArray[CurIn-1].nextSibling.textContent;//	i-1
					var desc = custDesc[CurIn-1].nextSibling.textContent;//		i-1
					var descA = desc.slice(7)
					var warranty = $("#warranty-" + i).val();
					warranty = fixWarranty(warranty)
					w.document.write("Line: " + i + " ~ _________ ~ " + $("#snumber-" + i).val() + " ~~ " + warranty + " ~~ " + descA);
					w.document.write("<br> <br>");

				}
			}

			w.document.write($('#full-container').append("<svg id='barcode' style='visibility: hidden;'></svg>"));
			//w.document.write($('body').append("<svg class='barcode' jsbarcode-format='CODE39'jsbarcode-value="+osr+"></svg>"));

			JsBarcode("#barcode", osr, {
				format: "CODE39",
				width: 1
			});

			window.open("","Print page 9000").document.write($('svg:last').css({'position': 'absolute', 'top': '86%', 'right': '8%'}))// css for barcode loc
			window.open("","Print page 9000").document.write($('svg:last').prop('outerHTML'));// ripping barcode from main window to print page
			//window.open("","Print page 9000").document.write();

			waitForKeyElements("#full-container > #barcode",function(){
				$(w.document.body).ready(function() {
					jQuery('#full-container > #barcode').hide()
				});
			})// hide barcode on main window after copying

			/* 			for (var i = FstLine; i < 25; i++) {//i = 1
				if(!$("#snumber-" + i).val() == ""){
					var model = modelsArray[i-FstLine].nextSibling.textContent;//	i-1
					var desc = custDesc[i-FstLine].nextSibling.textContent;//		i-1
					var warranty = $("#warranty-" + i).val();
					w.document.write(["Line: " + i + " ~~~ " + $("#snumber-" + i).val() + " ~~~ " + warranty + " ~~~ " + desc]);
					w.document.write("<br> <br>");

				}
			} */


			w.print();
			//w.close();
		}


		$("[id^=repair-completed]").change(function() {
			autoHideDoneLines = getCookie("autoHideDoneLines");
			if(autoHideDoneLines){
				var line = this.id;
				line = line.replace("repair-completed-", "");
				if(autoHideDoneLines == true){
					if(document.getElementById(this.id).checked){
						singleClick(line);
					}
				}
			}
		});//check if repair complete button was pressed then update what lines are hidden or shown
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
		};// end of exportToCsv function

		//_______________________________________________________________________________________________________________________________________________________________________________________
		//END OF ALL EXPORT BUTTON CODE
	});
})();
