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
    /*var month = this.getMonth()
        , year = this.getFullYear()
        , firstWeekday = new Date(year, month, 1).getDay()
        , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        , offsetDate = this.getDate() + firstWeekday - 1
        , index = 1 // start index at 0 or 1, your choice
        , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
        , week = index + Math.floor(offsetDate / 7)
    ;
    if (exact || week < 2 + index) return week;
    return week === weeksInMonth ? index + 5 : week;*/
    day = parseInt(this.getDate());
    di = new Date(this.getFullYear(), this.getMonth(), 1 );
    disc = parseInt(di.getDay());
    
    return (Math.ceil((disc+day)/7));
    
};

Date.prototype.countWeeksOfMonth = function() {
  
    
    var year         = this.getFullYear();
    var month_number = this.getMonth();
    /*
    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth  = new Date(year, month_number, 0);
    var used         = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil( used / 7);*/
    
    if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
        feb = 29;
    } else {
        feb = 28;
    }
        
    //console.log("month - "+month+" discount - "+disc);
    var days_in_month = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];    
    
    //var lastOfMonth  = new Date(year, month_number, 0);
    //var numberOfDays = lastOfMonth.getDate();
    preDiscount = new Date(this.getFullYear(), this.getMonth(), 1 );
    discount = parseInt(preDiscount.getDay());
    
    return (Math.ceil((discount+days_in_month[month_number])/7));
};

function weekCount(year, month_number) {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

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

var listaGeral = [];

d = function(){
    return new Date(this.d);   
};

/*
var listaGeral = [{'id': 1,
                  'title': "20 de Outubro",
                  'date': new Date(2014,9,20,10,20),
                  'checked': false,
                  'precision':'days'},
                  {'id': 2,
                  'title': "30 de outubro (precisão mês)",
                  'date': new Date(2014,9,30),
                  'checked': false,
                  'precision':'months'},
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
                 ];
/*
if(localStorage.getItem("taskList")){
        listaGeral = JSON.parse(localStorage.getItem("taskList"));
    }else{
        localStorage.setItem("taskList", "");
        sync();
    }*/

    function createMonthTask(title, date, precision){
        if(typeof(date)==undefined){
            
        }else{
            
        }
        node = {  'id': generateUUID(),
                  'title': title,
                  'date': date/*new Date(date.getFullYear(), date.getMonth() ,date.getDate())*/,
                  'checked': false,
                  'precision': precision
               };
        listaGeral.push(node);
        save();
        updateMonthList(new Date(date.getFullYear(), date.getMonth()-1, date.getDate() ));
        console.log("month task - "+date);
    }

    function createDayTask(title, date, precision){
        if(typeof(date)==undefined){
            
        }else{
               
        }
        node = {  'id': generateUUID(),
                  'title': title,
                  'date': date/*new Date(date.getFullYear(), date.getMonth() ,date.getDate())*/,
                  'checked': false,
                  'precision': precision
               };
        listaGeral.push(node);
        save();
        updateDayList(date);
    }

    //function appendNode

    /***********************

    function updateList(d, p){
        //d.setMonth(d.getMonth()+1);
        
        var c = 0, checked=0;
        
        $("ul.tasks-list").empty();

        for(i=0;i<listaGeral.length;i++){
            //if(listaGeral[i].date.getMonth()==month){
            console.log(i+ " "+listaGeral[i].date);
            if((p="day" && listaGeral[i].date.getMonth()==d.getMonth() && listaGeral[i].date.getFullYear()==d.getFullYear())listaGeral[i].date.getMonth()==d.getMonth() && listaGeral[i].date.getFullYear()==d.getFullYear()){
                c++;
                checkbox = jQuery("<input id='"+listaGeral[i].id+"' type='checkbox'>").prop("checked",listaGeral[i].checked);
                li = jQuery("<li id="+listaGeral[i].id+"></li>").append(checkbox);
                title = li.append("<span class='title'>"+listaGeral[i].title+"</span><input type='text' class='edit-input'>");
                if(listaGeral[i].precision=="days"){
                    title.append("<span class='day'>"+listaGeral[i].date.getDate()+"</span>");
                }
                title.append("<div class='task-options' id="+listaGeral[i].id+"><div class='task-options-container'><button id="+listaGeral[i].id+" class='delete'></button><button id="+listaGeral[i].id+" class='edit'></button><button id="+listaGeral[i].id+" class='cal'></button></div></div>");
                $("ul.tasks-list").append(title);
            }
        }
        if(c==0){
            $("div.no-tasks").show();
        }else{
            $("div.no-tasks").hide();
        }
        
        updateProgressBar(0, d.getMonth(), d.getFullYear());
    }

    /************************/
    
    function updateMonthList(d){
        //d.setMonth(d.getMonth()+1);
        
        var c = 0, checked=0;
        
        $("ul.tasks-list").empty();

        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].date.getMonth()==d.getMonth()+1 && listaGeral[i].date.getFullYear()==d.getFullYear()){
                c++;
                checkbox = jQuery("<input id='"+listaGeral[i].id+"' type='checkbox'>").prop("checked",listaGeral[i].checked);
                li = jQuery("<li id="+listaGeral[i].id+"></li>").append(checkbox);
                title = li.append("<span class='title'>"+listaGeral[i].title+"</span><textarea class='edit-input'></textarea>");
                if(listaGeral[i].precision=="days"){
                    title.append("<span class='day'>"+listaGeral[i].date.getDate()+"</span>");
                }
                title.append("<div class='task-options' id="+listaGeral[i].id+"><div class='task-options-container'><button id="+listaGeral[i].id+" class='delete'></button><button id="+listaGeral[i].id+" class='edit'></button><button id="+listaGeral[i].id+" class='cal'></button></div></div>");
                $("ul.tasks-list").append(title);
                //("ul.tasks-list").append("<li><input id='"+listaGeral[i].id+"' type='checkbox'>"+listaGeral[i].title+"</li>");
            }
        }
        if(c==0){
            $("div.no-tasks").show();
        }else{
            $("div.no-tasks").hide();
        }
        
        updateProgressBar(0, d.getMonth()+1, d.getFullYear());
    }

    function updateDayList(d){
        var c = 0;
        
        $("ul.tasks-list").empty();
        //console.log(d);

        for(i=0;i<listaGeral.length;i++){
            //if(listaGeral[i].date.getMonth()==month){
            if(listaGeral[i].date.getMonth()==d.getMonth() && listaGeral[i].date.getFullYear()==d.getFullYear() && listaGeral[i].date.getDate()==d.getDate()){
                c++;
                checkbox = jQuery("<input id='"+listaGeral[i].id+"' type='checkbox'>").prop("checked",listaGeral[i].checked);
                li = jQuery("<li></li>").append(checkbox);
                title = li.append("<span class='title'>"+listaGeral[i].title+"</span><textarea class='edit-input'></textarea>");
                if(listaGeral[i].date.getHours()!=0 || listaGeral[i].date.getMinutes()!=0){
                    title.append("<span class='time'>"+("0" + listaGeral[i].date.getHours()).slice(-2)+":"+("0" + listaGeral[i].date.getMinutes()).slice(-2)+"</span>");
                }
                title.append("<div class='task-options' id="+listaGeral[i].id+"><div class='task-options-container'><button id="+listaGeral[i].id+" class='delete'></button><button id="+listaGeral[i].id+" class='edit'></button><button id="+listaGeral[i].id+" class='cal'></button></div></div>");
                
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

    function adjustCalendar(date){
        month = date.getMonth();
        year = date.getFullYear();
        weeks_in_month = date.countWeeksOfMonth();
        console.log("adj - "+date);
        
        date.setDate(1);
        disc = date.getDay();
        date.setDate(0);
        days_in_month = date.getDate();
        
        //weeks_in_month =  weekCount(month,year);
        
        $("div.calendar-area").removeClass("week-4 week-5 week-6");
        //$("div.calendar-area").addClass("week-"+weeks_in_month);
        $("div.calendar-area").addClass("week-"+weeks_in_month);
        
        if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
            feb = 29;
        } else {
            feb = 28;
        }
        
        //console.log("month - "+month+" discount - "+disc);
        
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days_in_month = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];        
        
        $("span.month-name").text(monthList[month]);
        $("span.year").text(year);
    
        
        $("table.calendar td").html("");
        for(i=1; i<=days_in_month[month];i++){
            $("table.calendar td").eq(i+disc-1).html(i);
        }
        
        $("table.calendar td").removeClass("today");
        
        if(month==now().getMonth() && year==now().getFullYear()){
            $("table.calendar td").eq(now().getDate()+disc-1).addClass("today");
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
        save();
    }

    function unchecked(id){
        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].id==id){
                listaGeral[i].checked = false;
            }
        }
        save();
    }

    function del(id){
        var index;
        
        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].id==id){
                index = i;
            }
        }
        listaGeral.splice(index, 1);
        save();
    }

    function edit(id, title){
        var ind;
        
        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].id==id){
                ind = i;
            }
        }
        listaGeral[ind].title = title;
        save();
    }


    function now(){
        var now = new Date();
        return now;
    }

    function save(){
       localStorage.setItem("taskList", JSON.stringify(listaGeral));
    }

    function sync(){
        
    }

    function search(s){
        var list = [];
        
        for(i=0;i<listaGeral.length;i++){
            str = listaGeral[i].title.toLowerCase();
            if(str.search(s.toLowerCase())!=-1){
                list.push(listaGeral[i]);
            }
        }
        return list;
    }

$(function(){
    dat = new Date();
    //adjustCalendar(dat.getMonth(), dat.getFullYear());
    cYear = dat.getFullYear();
    cMonth = dat.getMonth();
    cDay = 0;
    context = "month";
    
    
    
    if(localStorage.getItem("taskList")){
        listaGeral = JSON.parse(localStorage.getItem("taskList"));
        for(i=0;i<listaGeral.length;i++){
            d = listaGeral[i].date;
            listaGeral[i].date = new Date(d);
        };
    }else{
        localStorage.setItem("taskList", "");
        sync();
    }
    
    $("ul.tasks-list textarea.new-task-text, textarea.edit-input").autosize();
    
    adjustCalendar(dat);
    updateProgressBar(cDay, cMonth, cYear);
    /*
    $("input.search").click(function(){
       alert("teste"); 
    });
    */
    $(".menu input.search").keyup(function(){
        //alert("work");
        
        s = $(this).val();
        mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if(s!=""){
            $("ul.search-result").addClass("show");
            $("ul.menu-options").addClass("hidden");
            result = search(s);
            $("ul.search-result").empty();
            for(i=0;i<result.length;i++){
                //$("ul.search-result").append("<li>"+result[i].title+"</li>");
                /**/
                checkbox = jQuery("<input id='"+result[i].id+"' type='checkbox'>").prop("checked",result[i].checked);
                li = jQuery("<li></li>").append(checkbox);
                title = li.append("<span class='title'>"+result[i].title+"</span>");
                div = jQuery("<div class='date'></div>");
                if(result[i].precision=="days"){
                    div.append("<span class='day'>"+result[i].date.getDate()+"</span>");
                }
                div.append("<span class='month'>"+mon[result[i].date.getMonth()]+"</span>");
                title.append(div);
                $("ul.search-result").append(title);
                
                /**/
            }
        }else{
            $("ul.search-result").removeClass("show");
            $("ul.menu-options").removeClass("hidden");
        }
        
    });

    $(".main.login a.skip").click(function(){
        $(".main.login").hide();
        $(".main.calendar").show();
    });
    
    $("button.menu").click(function(){
        $("div.menu, div.main").toggleClass("expanded");
    });
    
    $("ul.menu-options li.calendar").click(function(){
        $("div.main").hide();
        $("div.main").addClass("expanded");
        $("div.main.calendar").show();
        $("div.main.calendar, div.menu").removeClass("expanded");
            
    });
    
    $("ul.menu-options li.settings").click(function(){
        $("div.main").hide();
        $("div.main").addClass("expanded");
        $("div.main.settings").show();
        $("div.main.settings, div.menu").toggleClass("expanded");
    });
    
    $("ul.menu-options li.credits").click(function(){
        $("div.main").hide();
        $("div.main").addClass("expanded");
        $("div.main.credits").show();
        $("div.main.credits, div.menu").removeClass("expanded");
    });
    
    $("ul.menu-options li.donate").click(function(){
        $("div.main").hide();
        $("div.main").addClass("expanded");
        $("div.main.donate").show();
        $("div.main.donate, div.menu").removeClass("expanded");
    });
    
    
    $("div.add-a-task").click(function(){
        if($("ul.tasks-list li.new-task").length){
            $("ul.tasks-list li.new-task textarea.new-task-text").focus();
            window.scrollTo(0,document.body.scrollHeight);
        }else{
            $("ul.tasks-list").append("<li class='new-task'><input type='checkbox'><textarea class='new-task-text'></textarea></li>");
            $('textarea.new-task-text').autosize();
            $("ul.tasks-list li.new-task textarea.new-task-text").focus();
            window.scrollTo(0,document.body.scrollHeight);
        }
    });

    $("ul.tasks-list").on("keypress", "textarea.new-task-text", function(e) {
      if(e.which==13){
          text = $(this).val();
          if(cDay==0){
            p = "month";
            createMonthTask(text, new Date(cYear, cMonth+1, cDay), p);
          }else{
            p = "day";
            createDayTask(text, new Date(cYear, cMonth, cDay), p);
          }
          
          //updateMonthList(new Date(cYear, cMonth+1, cDay));
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
        e.stopPropagation();
    });
    
    $("table.calendar tr td").click(function(){
        var day = $(this).text();
        var d = new Date(cYear,cMonth,day);
        cDay = parseInt(day);
        context = "day";
        
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
        context = "month";
        
        /*$("table.calendar tr").removeClass("invisible");*/
        $("table.calendar").removeClass("week-1 week-2 week-3 week-4 week-5 week-6");
        $("div.calendar-area").height("255px");
        $("table.calendar tr td").removeClass("chosen");
        
        updateMonthList(d);
        updateProgressBar(cDay, cMonth, cYear);
        
    });
    
    $("div.calendar-area table.calendar").disableSelection();
    
    $("div.calendar-area").on("swipeleft", function(){
        if(cMonth==11){
            cYear++;
            cMonth=0;
        }else{
            cMonth++;
        }
        adjustCalendar(new Date(cYear, cMonth+1, cDay));
    });
    
    $("div.calendar-area").on("swiperight", function(){
        if(cMonth==0){
            cYear--;
            cMonth=11;
        }else{
            cMonth--;
        }
        adjustCalendar(new Date(cYear, cMonth+1, cDay));
    });
    
    $("button.right").click(function(){
        if(cMonth==11){
            cYear++;
            cMonth=0;
        }else{
            cMonth++;
        }
        console.log(cMonth);
        //$("div.add-a-task").text(cMonth);
        adjustCalendar(new Date(cYear, cMonth+1, cDay));
    });
    
    $("button.left").click(function(){
        if(cMonth==0){
            cYear--;
            cMonth=11;
        }else{
            cMonth--;
        }
        console.log(cMonth);
        //$("div.add-a-task").text(cMonth);
        adjustCalendar(new Date(cYear, cMonth+1, cDay));
    });
    
    $("ul.tasks-list").on("click", "li", function(e) {
        if($(this).children("div.task-options").is(":visible")){
            $(this).children("div.task-options").slideUp();
        }else{
           $("div.task-options").slideUp();
            $(this).children("div.task-options").slideDown(); 
        }
        
    });
    
    $("ul.tasks-list").on("click", "div.task-options button.delete", function(e) {
        id = $(this).attr("id");
        del(id);
        updateMonthList(new Date(cYear, cMonth, cDay));
        e.stopPropagation();
        
    });
    /*
    $("ul.tasks-list").on("keypress","input.edit-input", function(e) {
      if(e.which==13){
          id = $(this).attr("id");
          text = $(this).val();
          edit(id, text);
          updateMonthList(new Date(cYear, cMonth, cDay));
      }
    });*/

    $("ul.tasks-list").on("click","textarea.edit-input, button", function(e) {
        e.stopPropagation();
    });
    
    $("ul.tasks-list").show().focus().on("focusout", "input.edit-input", function(e) {              text = $(this).val();
           id = $(this).parent("li").attr("id");
           edit(id, text);
           updateMonthList(new Date(cYear, cMonth, cDay));
    });
    
    $("ul.tasks-list").on("click", "div.task-options button.edit", function(e) {
        id = $(this).attr("id");
        text = $("ul.tasks-list li#"+id+" span.title").text();
        $("ul.tasks-list li#"+id+" textarea.edit-input").val(text);
        $("ul.tasks-list li#"+id+" span.title").hide();
        $("ul.tasks-list li#"+id+" textarea.edit-input").css("visibility","visible");
        $("ul.tasks-list li#"+id+" textarea.edit-input").trigger("autosize.resize");
        $("ul.tasks-list li#"+id+" textarea.edit-input").show().focus().on("keypress", function(e) {
          if(e.which==13){
              text = $(this).val();
              edit(id, text);
              updateMonthList(new Date(cYear, cMonth, cDay));
          }
        });
        $("ul.tasks-list li#"+id+" textarea.edit-input").autosize();
        
        
        //updateMonthList(new Date(cYear, cMonth, cDay));
        e.stopPropagation();
        
    });
    
    $("input, textarea").blur(function() {
        $("div.add-a-task div.progress-area").show();
    });

    $("input, textarea").focus(function() {
        $("div.add-a-task div.progress-area").hide();
    });
    
});