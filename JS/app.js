jQuery.fn.extend({ 
        disableSelection : function() { 
                return this.each(function() { 
                        this.onselectstart = function() { return false; }; 
                        this.unselectable = "on"; 
                        jQuery(this).css('user-select', 'none'); 
                        jQuery(this).css('-o-user-select', 'none'); 
                        jQuery(this).css('-moz-user-select', 'none'); 
                        jQuery(this).css('-khtml-user-select', 'none'); 
                        jQuery(this).css('-webkit-user-select', 'none'); 
                }); 
        } 
}); 

Date.prototype.getWeekOfMonth = function(exact) {
    var month = this.getMonth()
        , year = this.getFullYear()
        , firstWeekday = new Date(year, month, 1).getDay()
        , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        , offsetDate = this.getDate() + firstWeekday - 1
        , index = 1 // start index at 0 or 1, your choice
        , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
        , week = index + Math.floor(offsetDate / 7)
    ;
    if (exact || week < 2 + index) return week;
    return week === weeksInMonth ? index + 5 : week;
};

Date.prototype.countWeeksOfMonth = function() {
  var year         = this.getFullYear();
  var month_number = this.getMonth();
  var firstOfMonth = new Date(year, month_number-1, 1);
  var lastOfMonth  = new Date(year, month_number, 0);
  var used         = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil( used / 7);
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

//var myapp = angular.module("taask");

var listaGeral = [{'id': 1,
                  'title': "20 de Outubro",
                  'date': new Date(2014,9,20),
                  'checked': false,
                  'precision':'days'},
                  {'id': 2,
                  'title': "30 de outubro (precisão mês)",
                  'date': new Date(2014,9,30),
                  'checked': false,
                  'precision':'days'},
                  {'id': 3,
                  'title': "20 de Outubro 2",
                  'date': new Date(2014,9,20),
                  'checked': true,
                  'precision':'days'},
                  {'id': 4,
                  'title': "20 de Outubro 3",
                  'date': new Date(2014,10,20),
                  'checked': false,
                  'precision':'days'}
                 ]



    function createTask(title, date, precision){
        if(typeof(date)==undefined){
            
        }else{
               
        }
        node = {  'id': generateUUID(),
                  'title': title,
                  'date': new Date(date.getFullYear(),date.getMonth()+1,date.getDate()),
                  'checked': false,
                  'precision': precision
               };
        listaGeral.push(node);
    }

    //function appendNode
    
    function updateMonthList(d/*month*/){
        d.setMonth(d.getMonth()+1);
        
        var c = 0, checked=0;
        
        $("ul.tasks-list").empty();

        for(i=0;i<listaGeral.length;i++){
            //if(listaGeral[i].date.getMonth()==month){
            if(listaGeral[i].date.getMonth()==d.getMonth() && listaGeral[i].date.getFullYear()==d.getFullYear()){
                c++;
                checkbox = jQuery("<input id='"+listaGeral[i].id+"' type='checkbox'>").prop("checked",listaGeral[i].checked);
                li = jQuery("<li></li>").append(checkbox);
                title = li.append(listaGeral[i].title);
                $("ul.tasks-list").append(title);
                //("ul.tasks-list").append("<li><input id='"+listaGeral[i].id+"' type='checkbox'>"+listaGeral[i].title+"</li>");
            }
        }
        if(c==0){
            $("div.no-tasks").show();
        }else{
            $("div.no-tasks").hide();
        }
        
        updateProgressBar(0, d.getMonth(), d.getFullYear());
    }

    function updateDayList(d){
        var c = 0;
        
        $("ul.tasks-list").empty();

        for(i=0;i<listaGeral.length;i++){
            //if(listaGeral[i].date.getMonth()==month){
            if(listaGeral[i].date.getMonth()==d.getMonth() && listaGeral[i].date.getFullYear()==d.getFullYear() && listaGeral[i].date.getDate()==d.getDate()){
                c++;
                checkbox = jQuery("<input id='"+listaGeral[i].id+"' type='checkbox'>").prop("checked",listaGeral[i].checked);
                li = jQuery("<li></li>").append(checkbox);
                title = li.append(listaGeral[i].title);
                $("ul.tasks-list").append(title);
                //$("ul.tasks-list").append("<li><input type='checkbox'>"+listaGeral[i].title+"</li>");
            }
        }
        if(c==0){
            $("div.no-tasks").fadeIn();
        }else{
           $("div.no-tasks").hide();
        }
        updateProgressBar(d.getDate(), d.getMonth(), d.getFullYear());
    }

/*
    function adjustCalendar(date){
        date.setDate(1);
        disc = date.getDay();
        date.setDate(0);
        d = date.getDate();
        c=0;
        
        console.log(d);
        
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $("span.month-name").text(monthList[date.getMonth()+1]);
        
        $("div.add-a-task").text(date.getMonth()+1);
        
        $("table.calendar td").html("");
        for(i=1; i<=d+1;i++){
            $("table.calendar td").eq(i+disc-1).html(i);
        }
        updateMonthList(date); 
    }
*/

function calendar(month) {

    //Variables to be used later.  Place holders right now.
    var padding = "";
    var totalFeb = "";
    var i = 1;
    var testing = "";

    var current = new Date();
    var cmonth = current.getMonth(); // current (today) month
    var day = current.getDate();
    var year = current.getFullYear();
    var tempMonth = month + 1; //+1; //Used to match up the current month with the correct start date.
    var prevMonth = month - 1;

    //Determing if Feb has 28 or 29 days in it.  
    if (month == 1) {
        if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
            totalFeb = 29;
        } else {
            totalFeb = 28;
        }
    }

    // Setting up arrays for the name of the months, days, and the number of days in the month.
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    var totalDays = ["31", "" + totalFeb + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

    // Temp values to get the number of days in current month, and previous month. Also getting the day of the week.
    var tempDate = new Date(tempMonth + ' 1 ,' + year);
    var tempweekday = tempDate.getDay();
    var tempweekday2 = tempweekday;
    var dayAmount = totalDays[month];

    // After getting the first day of the week for the month, padding the other days for that week with the previous months days.  IE, if the first day of the week is on a Thursday, then this fills in Sun - Wed with the last months dates, counting down from the last day on Wed, until Sunday.
    while (tempweekday > 0) {
        padding += "<td class='premonth'></td>";
        //preAmount++;
        tempweekday--;
    }
    // Filling in the calendar with the current month days in the correct location along.
    while (i <= dayAmount) {

        // Determining when to start a new row
        if (tempweekday2 > 6) {
            tempweekday2 = 0;
            padding += "</tr><tr>";
        }

        // checking to see if i is equal to the current day, if so then we are making the color of that cell a different color using CSS. Also adding a rollover effect to highlight the day the user rolls over. This loop creates the actual calendar that is displayed.
        if (i == day && month == cmonth) {
            padding += "<td class='currentday'  onMouseOver='this.style.background=\"#00FF00\"; this.style.color=\"#FFFFFF\"' onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>" + i + "</td>";
        } else {
            padding += "<td class='currentmonth' onMouseOver='this.style.background=\"#00FF00\"' onMouseOut='this.style.background=\"#FFFFFF\"'>" + i + "</td>";
        }
        tempweekday2++;
        i++;
    }


    // Outputing the calendar onto the site.  Also, putting in the month name and days of the week.
    var calendarTable = "<table class='calendar'> <tr class='currentmonth'><th colspan='7'>" + monthNames[month] + " " + year + "</th></tr>";
    calendarTable += "<tr class='weekdays'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td> <td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
    calendarTable += "<tr>";
    calendarTable += padding;
    calendarTable += "</tr></table>";
    document.getElementById("calendar").innerHTML += calendarTable;
}

    function adjustCalendar(date){
        month = date.getMonth();
        year = date.getFullYear();
        
        date.setDate(1);
        disc = date.getDay();
        date.setDate(0);
        days_in_month = date.getDate();
        weeks_in_month=date.countWeeksOfMonth();
        
        $("div.calendar-area").removeClass("week-4 week-5 week-6");
        $("div.calendar-area").addClass("week-"+weeks_in_month);
        
        if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
            feb = 29;
        } else {
            feb = 28;
        }
        
        console.log("month - "+month+" discount - "+disc);
        
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days_in_month = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];        
        
        $("span.month-name").text(monthList[month]);
        
        $("div.add-a-task").text(month);
        
        $("table.calendar td").html("");
        for(i=1; i<=days_in_month[month];i++){
            $("table.calendar td").eq(i+disc-1).html(i);
        }
        updateMonthList(date); 
    }

    function updateProgressBar(d, m, y){
        t=0;
        c=0;
        for(i=0;i<listaGeral.length;i++){
            if(d==0 && m==listaGeral[i].date.getMonth() && y==listaGeral[i].date.getFullYear()){
                t++;
                if(listaGeral[i].checked){   
                    c++;
                }
            }else if(d==listaGeral[i].date.getDate() && m==listaGeral[i].date.getMonth() && y==listaGeral[i].date.getFullYear()){
                t++;
                if(listaGeral[i].checked){   
                    c++;
                }
            }
        }
        if(t==0){
            $("progress.progress").attr("value", 0);
        }else{
            $("progress.progress").attr("value", c/t);
        }
    }

    function checked(id){
        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].id==id){
                listaGeral[i].checked = true;
            }
        }
    }

    function unchecked(id){
        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].id==id){
                listaGeral[i].checked = false;
            }
        }
    }


    function now(){
        var now = new Date();
        return now;
    }



$(function(){
    dat = new Date();
    //adjustCalendar(dat.getMonth(), dat.getFullYear());
    adjustCalendar(dat);
    cYear = dat.getFullYear();
    cMonth = dat.getMonth();
    cDay = 0;

    $("div.add-a-task").click(function(){
        if($("ul.tasks-list li.new-task").length){
            $("ul.tasks-list li.new-task input.new-task-text").focus();
            window.scrollTo(0,document.body.scrollHeight);
        }else{
            $("ul.tasks-list").append("<li class='new-task'><input type='checkbox'><input type='text' class='new-task-text'></li>");
            $("ul.tasks-list li.new-task input.new-task-text").focus();
            window.scrollTo(0,document.body.scrollHeight);
        }
    });

    $("ul.tasks-list").on("keypress", "input.new-task-text", function(e) {
      if(e.which==13){
          text = $(this).val();
          if(cDay==0){
            p = "month";   
          }else{
            p = "day";   
          }
          createTask(text, new Date(cYear, cMonth, cDay), p);
          updateMonthList(new Date(cYear, cMonth, cDay));
          window.scrollTo(0,document.body.scrollHeight);
      }
    });
    
    $("ul.tasks-list").on("click", "input[type=checkbox]", function(e) {
        //alert(typeof(cDay));
        if($(this).prop("checked")==false){
            unchecked($(this).attr("id"));
        }else{
            checked($(this).attr("id"));
        }
        updateProgressBar(cDay, cMonth, cYear);
    });
    
    $("table.calendar tr td").click(function(){
        var day = $(this).text();
        var d = new Date(cYear,cMonth,day);
        cDay = parseInt(day);
        
        /*$("table.calendar tr:not(:eq("+$(this).parent("tr").index()+"))").addClass("invisible");*/
        
        $("table.calendar").addClass("week-"+d.getWeekOfMonth());
        $("div.calendar-area").height("71px");
        $("table.calendar tr td").removeClass("chosen");
        $(this).addClass("chosen");
        
        updateDayList(d);
        updateProgressBar(cDay, cMonth, cYear);
    });
    
    $("div.calendar-area").on("swipedown", function(){
    //Hammer("div.calendar-area").on("swipedown", function(){
    //$("div.calendar-area").Hammer().on("swipedown", function(){
    
        var d = new Date(cYear,cMonth,0);
        cDay = 0;
        
        /*$("table.calendar tr").removeClass("invisible");*/
        $("table.calendar").removeClass("week-1 week-2 week-3 week-4 week-5 week-6");
        $("div.calendar-area").height("255px");
        $("table.calendar tr td").removeClass("chosen");
        
        updateMonthList(d);
        updateProgressBar(cDay, cMonth, cYear);
        
    });
    
    $("div.calendar-area table.calendar").disableSelection();
    
    $("div.calendar-area").on("swipeleft", function(){
        cMonth++;
        //$("div.add-a-task").text(cMonth);
        adjustCalendar(new Date(cYear, cMonth, cDay));
    });
    
    $("div.calendar-area").on("swiperight", function(){
        cMonth--;
        //$("div.add-a-task").text(cMonth);
        adjustCalendar(new Date(cYear, cMonth, cDay));
    });
    
    $('ul.tasks-list').click(function(){
         
        
    });
    
});