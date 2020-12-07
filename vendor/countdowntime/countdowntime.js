(function ($) {
    "use strict";

    $.fn.extend({ 

      countdown100: function(options) {
        var defaults = {
          timeZone: "",
          eventTime: "2020-12-1 00:00"
        }

        var options =  $.extend(defaults, options);

        return this.each(function() {
          var obj = $(this);
		  //var moment=require("moment-timezone");
		  
          var timeNow = moment.tz();

          var tZ = options.timeZone; 
		  //console.log(tZ);
          var eventTime = options.eventTime;
          
          if(tZ == "") {
            var deadline = moment.tz(eventTime,"YYYY-MM-DD HH:mm","Asia/Kolkata");
          } 
          else {
            var deadline = moment.tz(eventTime,"YYYY-MM-DD HH:mm",tZ);
          }
      
          initializeClock(deadline);

          function getTimeRemaining(endtime) { 
            var duration = moment.duration(endtime.diff(moment.tz()));
            var seconds = duration.seconds();
            var minutes = duration.minutes();
            var hours = duration.hours();
            var days = duration.days();
            return {
              'total': duration.asSeconds(),
              'days': days,
              'hours': hours,
              'minutes': minutes,
              'seconds': seconds
            };
          }

          function initializeClock(endtime) {
			//console.log(endtime);
            var daysSpan = $(obj).find('.days');
            var hoursSpan = $(obj).find('.hours');
            var minutesSpan = $(obj).find('.minutes');
            var secondsSpan = $(obj).find('.seconds');

            function updateClock() { 
              var t = getTimeRemaining(endtime);

              daysSpan.html(t.days);
              hoursSpan.html(('0' + t.hours).slice(-2));
              minutesSpan.html(('0' + t.minutes).slice(-2));
              secondsSpan.html(('0' + t.seconds).slice(-2))

              if (t.total <= 0) {
                clearInterval(timeinterval);
              }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
          }

          


        });
      }
    });

    

})(jQuery);