// ==UserScript==
// @name         Cleaner API V0001100 [C]
// @namespace    http://tampermonkey.net/
// @version      1.1.1
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
// test update 1 
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


        function toggle(value){//inner class to flip value
            if (stateOfButtons[value]){
                stateOfButtons[value] = false;
            }else{
                stateOfButtons[value] = true;

            }
        }

        var stateOfButtons = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

        // Do the stuff here for full insertion
        $("[id^=snumber-]").css({"width": "110%","float":"left"}) // serial number width fix

        var i;
        for (i = 25; i > 0; i--) {
            if(!$("#snumber-" + i).val() == ""){
                var label = "Line" + i;
                var btn = $("#full-container").prepend('<button type="button" class="" id="insert" onload="document.innerHTML(label)" style="background-color: white; border-radius: 8px" ></button>')
                document.getElementById("insert").innerHTML = label;
                $("#insert").attr("id", "btn" + i);
            }
        }

        jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
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

        //Start adding buttons, lots of buttons.
        $("#full-container").prepend('<span> <div id="EXP"> <button type="button" class="" id="copy" style="background-color: white" >Export</button> </div> </span>') //Copy button
        $("#EXP").append('<button type="button" class="" id="showAll" style="background-color: white; border-radius: 8px" >Show All</button>');
        $("#EXP").append('<button type="button" class="" id="hideAll" style="background-color: white; border-radius: 8px" >Hide All</button>');


        $("#showAll").click(function() {
            if(stateOfButtons[1]){
                $("#btn1").toggleClass("on")
                $("#btn1.on").css("background-color","#28a745");
                $("#btn1[class!='on']").css("background-color","white");
                $("#full-container > div:eq(1)").toggle() //line 1 top
                $("#full-container > div:eq(2)").toggle() //line 1 btm
                toggle(1);
            }
            if(stateOfButtons[3]){
                $("#btn2").toggleClass("on")
                $("#btn2.on").css("background-color","#28a745");
                $("#btn2[class!='on']").css("background-color","white");
                $("#full-container > div:eq(3)").toggle() //line 2 top
                $("#full-container > div:eq(4)").toggle() //line 2 btm
                toggle(3);
            }
            if(stateOfButtons[5]){
                $("#btn3").toggleClass("on")
                $("#btn3.on").css("background-color","#28a745");
                $("#btn3[class!='on']").css("background-color","white");
                $("#full-container > div:eq(5)").toggle() //line 3 top
                $("#full-container > div:eq(6)").toggle() //line 3 btm
                toggle(5);
            }
            if(stateOfButtons[7]){
                $("#btn4").toggleClass("on")
                $("#btn4.on").css("background-color","#28a745");
                $("#btn4[class!='on']").css("background-color","white");
                $("#full-container > div:eq(7)").toggle() //line 4 top
                $("#full-container > div:eq(8)").toggle() //line 4 btm
                toggle(7);
            }
            if(stateOfButtons[9]){
                $("#btn5").toggleClass("on")
                $("#btn5.on").css("background-color","#28a745");
                $("#btn5[class!='on']").css("background-color","white");
                $("#full-container > div:eq(9)").toggle() //line 5 top
                $("#full-container > div:eq(10)").toggle() //line 5 btm
                toggle(9);
            }
            if(stateOfButtons[11]){
                $("#btn6").toggleClass("on")
                $("#btn6.on").css("background-color","#28a745");
                $("#btn6[class!='on']").css("background-color","white");
                $("#full-container > div:eq(11)").toggle() //line 6 top
                $("#full-container > div:eq(12)").toggle() //line 6 btm
                toggle(11);
            }
            if(stateOfButtons[13]){
                $("#btn7").toggleClass("on")
                $("#btn7.on").css("background-color","#28a745");
                $("#btn7[class!='on']").css("background-color","white");
                $("#full-container > div:eq(13)").toggle() //line 7 top
                $("#full-container > div:eq(14)").toggle() //line 7 btm
                toggle(13);
            }
            if(stateOfButtons[15]){
                $("#btn8").toggleClass("on")
                $("#btn8.on").css("background-color","#28a745");
                $("#btn8[class!='on']").css("background-color","white");
                $("#full-container > div:eq(15)").toggle() //line 8 top
                $("#full-container > div:eq(16)").toggle() //line 8 btm
                toggle(15);
            }
            if(stateOfButtons[17]){
                $("#btn9").toggleClass("on")
                $("#btn9.on").css("background-color","#28a745");
                $("#btn9[class!='on']").css("background-color","white");
                $("#full-container > div:eq(17)").toggle() //line 9 top
                $("#full-container > div:eq(18)").toggle() //line 9 btm
                toggle(17);
            }
            if(stateOfButtons[19]){
                $("#btn10").toggleClass("on")
                $("#btn10.on").css("background-color","#28a745");
                $("#btn10[class!='on']").css("background-color","white");
                $("#full-container > div:eq(19)").toggle() //line 10 top
                $("#full-container > div:eq(20)").toggle() //line 10 btm
                toggle(19);
            }
            if(stateOfButtons[21]){
                $("#btn11").toggleClass("on")
                $("#btn11.on").css("background-color","#28a745");
                $("#btn11[class!='on']").css("background-color","white");
                $("#full-container > div:eq(21)").toggle() //line 11 top
                $("#full-container > div:eq(22)").toggle() //line 11 btm
                toggle(21);
            }
            if(stateOfButtons[23]){
                $("#btn12").toggleClass("on")
                $("#btn12.on").css("background-color","#28a745");
                $("#btn12[class!='on']").css("background-color","white");
                $("#full-container > div:eq(23)").toggle() //line 12 top
                $("#full-container > div:eq(24)").toggle() //line 12 btm
                toggle(23);
            }
            if(stateOfButtons[25]){
                $("#btn13").toggleClass("on")
                $("#btn13.on").css("background-color","#28a745");
                $("#btn13[class!='on']").css("background-color","white");
                $("#full-container > div:eq(25)").toggle() //line 13 top
                $("#full-container > div:eq(26)").toggle() //line 13 btm
                toggle(25);
            }
            if(stateOfButtons[27]){
                $("#btn14").toggleClass("on")
                $("#btn14.on").css("background-color","#28a745");
                $("#btn14[class!='on']").css("background-color","white");
                $("#full-container > div:eq(27)").toggle() //line 14 top
                $("#full-container > div:eq(28)").toggle() //line 14 btm
                toggle(27);
            }
            if(stateOfButtons[29]){
                $("#btn15").toggleClass("on")
                $("#btn15.on").css("background-color","#28a745");
                $("#btn15[class!='on']").css("background-color","white");
                $("#full-container > div:eq(29)").toggle() //line 15 top
                $("#full-container > div:eq(30)").toggle() //line 15 btm
                toggle(29);
            }
            if(stateOfButtons[31]){
                $("#btn16").toggleClass("on")
                $("#btn16.on").css("background-color","#28a745");
                $("#btn16[class!='on']").css("background-color","white");
                $("#full-container > div:eq(31)").toggle() //line 16 top
                $("#full-container > div:eq(32)").toggle() //line 16 btm
                toggle(31);
            }
            if(stateOfButtons[33]){
                $("#btn17").toggleClass("on")
                $("#btn17.on").css("background-color","#28a745");
                $("#btn17[class!='on']").css("background-color","white");
                $("#full-container > div:eq(33)").toggle() //line 17 top
                $("#full-container > div:eq(34)").toggle() //line 17 btm
                toggle(33);
            }
            if(stateOfButtons[35]){
                $("#btn18").toggleClass("on")
                $("#btn18.on").css("background-color","#28a745");
                $("#btn18[class!='on']").css("background-color","white");
                $("#full-container > div:eq(35)").toggle() //line 18 top
                $("#full-container > div:eq(36)").toggle() //line 18 btm
                toggle(35);
            }
            if(stateOfButtons[37]){
                $("#btn19").toggleClass("on")
                $("#btn19.on").css("background-color","#28a745");
                $("#btn19[class!='on']").css("background-color","white");
                $("#full-container > div:eq(37)").toggle() //line 19 top
                $("#full-container > div:eq(38)").toggle() //line 19 btm
                toggle(37);
            }
            if(stateOfButtons[39]){
                $("#btn20").toggleClass("on")
                $("#btn20.on").css("background-color","#28a745");
                $("#btn20[class!='on']").css("background-color","white");
                $("#full-container > div:eq(39)").toggle() //line 20 top
                $("#full-container > div:eq(40)").toggle() //line 20 btm
                toggle(39);
            }
            if(stateOfButtons[41]){
                $("#btn21").toggleClass("on")
                $("#btn21.on").css("background-color","#28a745");
                $("#btn21[class!='on']").css("background-color","white");
                $("#full-container > div:eq(41)").toggle() //line 21 top
                $("#full-container > div:eq(42)").toggle() //line 21 btm
                toggle(41);
            }
            if(stateOfButtons[43]){
                $("#btn22").toggleClass("on")
                $("#btn22.on").css("background-color","#28a745");
                $("#btn22[class!='on']").css("background-color","white");
                $("#full-container > div:eq(43)").toggle() //line 22 top
                $("#full-container > div:eq(44)").toggle() //line 22 btm
                toggle(43);
            }
            if(stateOfButtons[45]){
                $("#btn23").toggleClass("on")
                $("#btn23.on").css("background-color","#28a745");
                $("#btn23[class!='on']").css("background-color","white");
                $("#full-container > div:eq(45)").toggle() //line 23 top
                $("#full-container > div:eq(46)").toggle() //line 23 btm
                toggle(45);
            }
            if(stateOfButtons[47]){
                $("#btn24").toggleClass("on")
                $("#btn24.on").css("background-color","#28a745");
                $("#btn24[class!='on']").css("background-color","white");
                $("#full-container > div:eq(47)").toggle() //line 24 top
                $("#full-container > div:eq(48)").toggle() //line 24 btm
                toggle(47);
            }

        });

        $("#hideAll").click(function() {
            if(!stateOfButtons[1]){
                $("#btn1").toggleClass("on")
                $("#btn1.on").css("background-color","#28a745");
                $("#btn1[class!='on']").css("background-color","white");
                $("#full-container > div:eq(1)").toggle() //line 1 top
                $("#full-container > div:eq(2)").toggle() //line 1 btm
                toggle(1);
            }
            if(!stateOfButtons[3]){
                $("#btn2").toggleClass("on")
                $("#btn2.on").css("background-color","#28a745");
                $("#btn2[class!='on']").css("background-color","white");
                $("#full-container > div:eq(3)").toggle() //line 2 top
                $("#full-container > div:eq(4)").toggle() //line 2 btm
                toggle(3);
            }
            if(!stateOfButtons[5]){
                $("#btn3").toggleClass("on")
                $("#btn3.on").css("background-color","#28a745");
                $("#btn3[class!='on']").css("background-color","white");
                $("#full-container > div:eq(5)").toggle() //line 3 top
                $("#full-container > div:eq(6)").toggle() //line 3 btm
                toggle(5);
            }
            if(!stateOfButtons[7]){
                $("#btn4").toggleClass("on")
                $("#btn4.on").css("background-color","#28a745");
                $("#btn4[class!='on']").css("background-color","white");
                $("#full-container > div:eq(7)").toggle() //line 4 top
                $("#full-container > div:eq(8)").toggle() //line 4 btm
                toggle(7);
            }
            if(!stateOfButtons[9]){
                $("#btn5").toggleClass("on")
                $("#btn5.on").css("background-color","#28a745");
                $("#btn5[class!='on']").css("background-color","white");
                $("#full-container > div:eq(9)").toggle() //line 5 top
                $("#full-container > div:eq(10)").toggle() //line 5 btm
                toggle(9);
            }
            if(!stateOfButtons[11]){
                $("#btn6").toggleClass("on")
                $("#btn6.on").css("background-color","#28a745");
                $("#btn6[class!='on']").css("background-color","white");
                $("#full-container > div:eq(11)").toggle() //line 6 top
                $("#full-container > div:eq(12)").toggle() //line 6 btm
                toggle(11);
            }
            if(!stateOfButtons[13]){
                $("#btn7").toggleClass("on")
                $("#btn7.on").css("background-color","#28a745");
                $("#btn7[class!='on']").css("background-color","white");
                $("#full-container > div:eq(13)").toggle() //line 7 top
                $("#full-container > div:eq(14)").toggle() //line 7 btm
                toggle(13);
            }
            if(!stateOfButtons[15]){
                $("#btn8").toggleClass("on")
                $("#btn8.on").css("background-color","#28a745");
                $("#btn8[class!='on']").css("background-color","white");
                $("#full-container > div:eq(15)").toggle() //line 8 top
                $("#full-container > div:eq(16)").toggle() //line 8 btm
                toggle(15);
            }
            if(!stateOfButtons[17]){
                $("#btn9").toggleClass("on")
                $("#btn9.on").css("background-color","#28a745");
                $("#btn9[class!='on']").css("background-color","white");
                $("#full-container > div:eq(17)").toggle() //line 9 top
                $("#full-container > div:eq(18)").toggle() //line 9 btm
                toggle(17);
            }
            if(!stateOfButtons[19]){
                $("#btn10").toggleClass("on")
                $("#btn10.on").css("background-color","#28a745");
                $("#btn10[class!='on']").css("background-color","white");
                $("#full-container > div:eq(19)").toggle() //line 10 top
                $("#full-container > div:eq(20)").toggle() //line 10 btm
                toggle(19);
            }
            if(!stateOfButtons[21]){
                $("#btn11").toggleClass("on")
                $("#btn11.on").css("background-color","#28a745");
                $("#btn11[class!='on']").css("background-color","white");
                $("#full-container > div:eq(21)").toggle() //line 11 top
                $("#full-container > div:eq(22)").toggle() //line 11 btm
                toggle(21);
            }
            if(!stateOfButtons[23]){
                $("#btn12").toggleClass("on")
                $("#btn12.on").css("background-color","#28a745");
                $("#btn12[class!='on']").css("background-color","white");
                $("#full-container > div:eq(23)").toggle() //line 12 top
                $("#full-container > div:eq(24)").toggle() //line 12 btm
                toggle(23);
            }
            if(!stateOfButtons[25]){
                $("#btn13").toggleClass("on")
                $("#btn13.on").css("background-color","#28a745");
                $("#btn13[class!='on']").css("background-color","white");
                $("#full-container > div:eq(25)").toggle() //line 13 top
                $("#full-container > div:eq(26)").toggle() //line 13 btm
                toggle(25);
            }
            if(!stateOfButtons[27]){
                $("#btn14").toggleClass("on")
                $("#btn14.on").css("background-color","#28a745");
                $("#btn14[class!='on']").css("background-color","white");
                $("#full-container > div:eq(27)").toggle() //line 14 top
                $("#full-container > div:eq(28)").toggle() //line 14 btm
                toggle(27);
            }
            if(!stateOfButtons[29]){
                $("#btn15").toggleClass("on")
                $("#btn15.on").css("background-color","#28a745");
                $("#btn15[class!='on']").css("background-color","white");
                $("#full-container > div:eq(29)").toggle() //line 15 top
                $("#full-container > div:eq(30)").toggle() //line 15 btm
                toggle(29);
            }
            if(!stateOfButtons[31]){
                $("#btn16").toggleClass("on")
                $("#btn16.on").css("background-color","#28a745");
                $("#btn16[class!='on']").css("background-color","white");
                $("#full-container > div:eq(31)").toggle() //line 16 top
                $("#full-container > div:eq(32)").toggle() //line 16 btm
                toggle(31);
            }
            if(!stateOfButtons[33]){
                $("#btn17").toggleClass("on")
                $("#btn17.on").css("background-color","#28a745");
                $("#btn17[class!='on']").css("background-color","white");
                $("#full-container > div:eq(33)").toggle() //line 17 top
                $("#full-container > div:eq(34)").toggle() //line 17 btm
                toggle(33);
            }
            if(!stateOfButtons[35]){
                $("#btn18").toggleClass("on")
                $("#btn18.on").css("background-color","#28a745");
                $("#btn18[class!='on']").css("background-color","white");
                $("#full-container > div:eq(35)").toggle() //line 18 top
                $("#full-container > div:eq(36)").toggle() //line 18 btm
                toggle(35);
            }
            if(!stateOfButtons[37]){
                $("#btn19").toggleClass("on")
                $("#btn19.on").css("background-color","#28a745");
                $("#btn19[class!='on']").css("background-color","white");
                $("#full-container > div:eq(37)").toggle() //line 19 top
                $("#full-container > div:eq(38)").toggle() //line 19 btm
                toggle(37);
            }
            if(!stateOfButtons[39]){
                $("#btn20").toggleClass("on")
                $("#btn20.on").css("background-color","#28a745");
                $("#btn20[class!='on']").css("background-color","white");
                $("#full-container > div:eq(39)").toggle() //line 20 top
                $("#full-container > div:eq(40)").toggle() //line 20 btm
                toggle(39);
            }
            if(!stateOfButtons[41]){
                $("#btn21").toggleClass("on")
                $("#btn21.on").css("background-color","#28a745");
                $("#btn21[class!='on']").css("background-color","white");
                $("#full-container > div:eq(41)").toggle() //line 21 top
                $("#full-container > div:eq(42)").toggle() //line 21 btm
                toggle(41);
            }
            if(!stateOfButtons[43]){
                $("#btn22").toggleClass("on")
                $("#btn22.on").css("background-color","#28a745");
                $("#btn22[class!='on']").css("background-color","white");
                $("#full-container > div:eq(43)").toggle() //line 22 top
                $("#full-container > div:eq(44)").toggle() //line 22 btm
                toggle(43);
            }
            if(!stateOfButtons[45]){
                $("#btn23").toggleClass("on")
                $("#btn23.on").css("background-color","#28a745");
                $("#btn23[class!='on']").css("background-color","white");
                $("#full-container > div:eq(45)").toggle() //line 23 top
                $("#full-container > div:eq(46)").toggle() //line 23 btm
                toggle(45);
            }
            if(!stateOfButtons[47]){
                $("#btn24").toggleClass("on")
                $("#btn24.on").css("background-color","#28a745");
                $("#btn24[class!='on']").css("background-color","white");
                $("#full-container > div:eq(47)").toggle() //line 24 top
                $("#full-container > div:eq(48)").toggle() //line 24 btm
                toggle(47);
            }

        });


        $("#btn1").single_double_click(function() {
            $("#btn1").toggleClass("on")
            $("#btn1.on").css("background-color","#28a745");
            $("#btn1[class!='on']").css("background-color","white");
            $("#full-container > div:eq(1)").toggle() //line 1 top
            $("#full-container > div:eq(2)").toggle() //line 1 btm
            toggle(1);
        }, function (){
            //do this when double clicked
        });
        $("#btn2").single_double_click(function() {
            $("#btn2").toggleClass("on")
            $("#btn2.on").css("background-color","#28a745");
            $("#btn2[class!='on']").css("background-color","white");
            $("#full-container > div:eq(3)").toggle() //line 2 top
            $("#full-container > div:eq(4)").toggle() //line 2 btm
            toggle(3);
        }, function (){
            //do this when double clicked
        });
        $("#btn3").single_double_click(function() {
            $("#btn3").toggleClass("on")
            $("#btn3.on").css("background-color","#28a745");
            $("#btn3[class!='on']").css("background-color","white");
            $("#full-container > div:eq(5)").toggle() //line 3 top
            $("#full-container > div:eq(6)").toggle() //line 3 btm
            toggle(5);
        }, function (){
            //do this when double clicked
        });
        $("#btn4").single_double_click(function() {
            $("#btn4").toggleClass("on")
            $("#btn4.on").css("background-color","#28a745");
            $("#btn4[class!='on']").css("background-color","white");
            $("#full-container > div:eq(7)").toggle() //line 4 top
            $("#full-container > div:eq(8)").toggle() //line 4 btm
            toggle(7);
        }, function (){
            //do this when double clicked

        });
        $("#btn5").single_double_click(function() {
            $("#btn5").toggleClass("on")
            $("#btn5.on").css("background-color","#28a745");
            $("#btn5[class!='on']").css("background-color","white");
            $("#full-container > div:eq(9)").toggle() //line 5 top
            $("#full-container > div:eq(10)").toggle() //line 5 btm
            toggle(9);

        }, function (){
            //do this when double clicked

        });
        $("#btn6").single_double_click(function() {
            $("#btn6").toggleClass("on")
            $("#btn6.on").css("background-color","#28a745");
            $("#btn6[class!='on']").css("background-color","white");
            $("#full-container > div:eq(11)").toggle() //line 6 top
            $("#full-container > div:eq(12)").toggle() //line 6 btm
            toggle(11);
        }, function (){
            //do this when double clicked

        });
        $("#btn7").single_double_click(function() {
            $("#btn7").toggleClass("on")
            $("#btn7.on").css("background-color","#28a745");
            $("#btn7[class!='on']").css("background-color","white");
            $("#full-container > div:eq(13)").toggle() //line 7 top
            $("#full-container > div:eq(14)").toggle() //line 7 btm
            toggle(13);
        }, function (){
            //do this when double clicked

        });
        $("#btn8").single_double_click(function() {
            $("#btn8").toggleClass("on")
            $("#btn8.on").css("background-color","#28a745");
            $("#btn8[class!='on']").css("background-color","white");
            $("#full-container > div:eq(15)").toggle() //line 8 top
            $("#full-container > div:eq(16)").toggle() //line 8 btm
            toggle(15);
        }, function (){
            //do this when double clicked

        });
        $("#btn9").single_double_click(function() {
            $("#btn9").toggleClass("on")
            $("#btn9.on").css("background-color","#28a745");
            $("#btn9[class!='on']").css("background-color","white");
            $("#full-container > div:eq(17)").toggle() //line 9 top
            $("#full-container > div:eq(18)").toggle() //line 9 btm
            toggle(17);
        }, function (){
            //do this when double clicked

        });
        $("#btn10").single_double_click(function() {
            $("#btn10").toggleClass("on")
            $("#btn10.on").css("background-color","#28a745");
            $("#btn10[class!='on']").css("background-color","white");
            $("#full-container > div:eq(19)").toggle() //line 10 top
            $("#full-container > div:eq(20)").toggle() //line 10 btm
            toggle(19);
        }, function (){
            //do this when double clicked

        });
        $("#btn11").single_double_click(function() {
            $("#btn11").toggleClass("on")
            $("#btn11.on").css("background-color","#28a745");
            $("#btn11[class!='on']").css("background-color","white");
            $("#full-container > div:eq(21)").toggle() //line 11 top
            $("#full-container > div:eq(22)").toggle() //line 11 btm
            toggle(21);
        }, function (){
            //do this when double clicked

        });
        $("#btn12").single_double_click(function() {
            $("#btn12").toggleClass("on")
            $("#btn12.on").css("background-color","#28a745");
            $("#btn12[class!='on']").css("background-color","white");
            $("#full-container > div:eq(23)").toggle() //line 12 top
            $("#full-container > div:eq(24)").toggle() //line 12 btm
            toggle(23);
        }, function (){
            //do this when double clicked

        });
        $("#btn13").single_double_click(function() {
            $("#btn13").toggleClass("on")
            $("#btn13.on").css("background-color","#28a745");
            $("#btn13[class!='on']").css("background-color","white");
            $("#full-container > div:eq(25)").toggle() //line 13 top
            $("#full-container > div:eq(26)").toggle() //line 13 btm
            toggle(25);
        }, function (){
            //do this when double clicked

        });
        $("#btn14").single_double_click(function() {
            $("#btn14").toggleClass("on")
            $("#btn14.on").css("background-color","#28a745");
            $("#btn14[class!='on']").css("background-color","white");
            $("#full-container > div:eq(27)").toggle() //line 14 top
            $("#full-container > div:eq(28)").toggle() //line 14 btm
            toggle(27);
        }, function (){
            //do this when double clicked

        });
        $("#btn15").single_double_click(function() {
            $("#btn15").toggleClass("on")
            $("#btn15.on").css("background-color","#28a745");
            $("#btn15[class!='on']").css("background-color","white");
            $("#full-container > div:eq(29)").toggle() //line 15 top
            $("#full-container > div:eq(30)").toggle() //line 15 btm
            toggle(29);
        }, function (){
            //do this when double clicked

        });
        $("#btn16").single_double_click(function() {
            $("#btn16").toggleClass("on")
            $("#btn16.on").css("background-color","#28a745");
            $("#btn16[class!='on']").css("background-color","white");
            $("#full-container > div:eq(31)").toggle() //line 16 top
            $("#full-container > div:eq(32)").toggle() //line 16 btm
            toggle(31);
        }, function (){
            //do this when double clicked

        });
        $("#btn17").single_double_click(function() {
            $("#btn17").toggleClass("on")
            $("#btn17.on").css("background-color","#28a745");
            $("#btn17[class!='on']").css("background-color","white");
            $("#full-container > div:eq(33)").toggle() //line 17 top
            $("#full-container > div:eq(34)").toggle() //line 17 btm
            toggle(33);
        }, function (){
            //do this when double clicked

        });
        $("#btn18").single_double_click(function() {
            $("#btn18").toggleClass("on")
            $("#btn18.on").css("background-color","#28a745");
            $("#btn18[class!='on']").css("background-color","white");
            $("#full-container > div:eq(35)").toggle() //line 18 top
            $("#full-container > div:eq(36)").toggle() //line 18 btm
            toggle(35);
        }, function (){
            //do this when double clicked

        });
        $("#btn19").single_double_click(function() {
            $("#btn19").toggleClass("on")
            $("#btn19.on").css("background-color","#28a745");
            $("#btn19[class!='on']").css("background-color","white");
            $("#full-container > div:eq(37)").toggle() //line 19 top
            $("#full-container > div:eq(38)").toggle() //line 19 btm
            toggle(37);
        }, function (){
            //do this when double clicked

        });
        $("#btn20").single_double_click(function() {
            $("#btn20").toggleClass("on")
            $("#btn20.on").css("background-color","#28a745");
            $("#btn20[class!='on']").css("background-color","white");
            $("#full-container > div:eq(39)").toggle() //line 20 top
            $("#full-container > div:eq(40)").toggle() //line 20 btm
            toggle(39);
        }, function (){
            //do this when double clicked

        });
        $("#btn21").single_double_click(function() {
            $("#btn21").toggleClass("on")
            $("#btn21.on").css("background-color","#28a745");
            $("#btn21[class!='on']").css("background-color","white");
            $("#full-container > div:eq(41)").toggle() //line 21 top
            $("#full-container > div:eq(42)").toggle() //line 21 btm
            toggle(41);
        }, function (){
            //do this when double clicked

        });
        $("#btn22").single_double_click(function() {
            $("#btn22").toggleClass("on")
            $("#btn22.on").css("background-color","#28a745");
            $("#btn22[class!='on']").css("background-color","white");
            $("#full-container > div:eq(43)").toggle() //line 22 top
            $("#full-container > div:eq(44)").toggle() //line 22 btm
            toggle(43);
        }, function (){
            //do this when double clicked

        });
        $("#btn23").single_double_click(function() {
            $("#btn23").toggleClass("on")
            $("#btn23.on").css("background-color","#28a745");
            $("#btn23[class!='on']").css("background-color","white");
            $("#full-container > div:eq(45)").toggle() //line 23 top
            $("#full-container > div:eq(46)").toggle() //line 23 btm
            toggle(45);
        }, function (){
            //do this when double clicked

        });
        $("#btn24").single_double_click(function() {
            $("#btn24").toggleClass("on")
            $("#btn24.on").css("background-color","#28a745");
            $("#btn24[class!='on']").css("background-color","white");
            $("#full-container > div:eq(47)").toggle() //line 24 top
            $("#full-container > div:eq(48)").toggle() //line 24 btm
            toggle(47);
        }, function (){
            //do this when double clicked

        });

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


    });

})();
