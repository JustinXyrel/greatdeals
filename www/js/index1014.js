/*
 * 7 to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// HOST ADDRESS
var remoteHost = 'http://www.pointonesolutions.com.ph/';
//var remoteHost = 'http://appsandserver.hostoi.com/';
 //var remoteHost = 'http://127.0.0.1/';
// var remoteHost = 'http://192.168.254.7/';
// var remoteHost = 'http://192.168.254.4/';
// var remoteHost = 'http://122.3.195.117/';
sessionStorage.remoteHost = remoteHost;


$(document).ready(function() {
    /*******************************************************************************************************
    GLOBAL FUNCTIONS
    *******************************************************************************************************/
    remoteHost = sessionStorage.remoteHost;

    self.isEmpty = function (val,ret) {
        ret = ret || " ";
        if (
            val === ""          ||
            val === 0           ||
            val === "0"         ||
            val === null        ||
            val === "NULL"      ||
            val === undefined   ||
            val === false
        ) {
            return ret;
        }
        if (typeof(val) === 'object') {
            var i = 0;
            for (key in val) {
                i++;
            }
            if (i === 0) { return ret; }
        }
        return val;
    }
    self.displayInCurr = function (amt){
        amt = amt || 0;
        if(amt != 0)
            return Number(amt).toFixed(2);

        return Number(amt).toFixed(2);
    }

    self.limiter = function (element){
        var max_chars = 2;

        if(element.value.length > max_chars) {
            element.value = element.value.substr(0, max_chars);
        }
    }


    self.loadProvinces = function(e){
        var defaultProvince = 47; //Metro Manila
        // console.log(remoteHost+"resto/globalFunction/get_provinces/");
        $.ajax({
            url : remoteHost+"resto/globalFunction/get_provinces/",
            type: 'POST',
            dataType : "json",
            data: {"name":"JSON_Request"},
            success:function(data) {
                // console.log(data);
                provinces = JSON.stringify(data.provinces);
                provinces = JSON.parse(provinces);
                var select = $('select.provincesList');
                $.each(provinces, function(index, v) {
                    var optTempl = '<option value="' +v.id+ '">'+v.name+'</option>';
                    select.append(optTempl)
                });
                var option4 = $($("option", select).get(47));

                select.trigger( "change" );
                option4.attr('selected', 'selected');
                select.selectmenu();
                select.selectmenu('refresh', true);
            }
        },function(){
            alert('eeee');
        });
    }
    self.loadCities = function(e){
        $('select.provincesList').change(function() {
            // alert( "Handler for .change() called." );
            var val = $(this).val();
            if(val == '')   val = 47;
            // alert(val);
            console.log(remoteHost+"resto/globalFunction/get_cities/"+val);
            $.ajax({
                url : remoteHost+"resto/globalFunction/get_cities/"+val,
                type: 'POST',
                dataType : "json",
                data: {"name":"JSON_Request"},
                success:function(data) {
                    cities = JSON.stringify(data.cities);
                    cities = JSON.parse(cities);
                    var select2 = $('select.citiesList');
                    var opts = '';
                    $.each(cities, function(index, v) {
                        opts += '<option value="' +v.id+ '">'+v.name+'</option>';
                    });
                    select2.html(opts);
                    var option4 = $($("option", select2).get(0));
                    select2.attr('selected', 'selected');
                    select2.selectmenu();
                    select2.selectmenu('refresh', true);
                }
            });
        });
    }
    self.getUrlParameter = function(sParam){
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }
 /**idle loading function - JX**/
     self.loaderz = function(e){
        
    }
 
 
 /**END idle loader**/
    $.fn.serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    // alert($(".provincesList").is(":hidden"));
    var aaa = $(".provincesList").length;
    if (aaa !== 0){
        // loadProvinces();
        // loadCities();
    }else{
        // console.log('zzzz');
    }
    var dateFormat = function () {
        var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var    _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };


});
