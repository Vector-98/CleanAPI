// ==UserScript==
// @name         Cleaner API
// @namespace    http://tampermonkey.net/
// @version      0.98
// @description  try to make things better for everyone
// @author       Vector
// @match        https://fireflycomputers.com/api-sro/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        GM_addStyle
// ==/UserScript==
var $ = window.jQuery;

(function() {
    'use strict';

    $(".flex_layout_row.layout_2_across.bgnone.bottom-call-action.container_widewidth").hide()
    $(".footer").hide()
    $("#masthead").hide()

})();