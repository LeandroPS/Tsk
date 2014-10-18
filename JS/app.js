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
                  'title': "Teste",
                  'date': new Date(2014,9,20),
                  'checked': false},
                  {'id': 2,
                  'title': "Teste",
                  'date': new Date(2014,9,20),
                  'checked': false},
                  {'id': 2,
                  'title': "Teste",
                  'date': new Date(2014,9,20),
                  'checked': false},
                  {'id': 2,
                  'title': "Teste",
                  'date': new Date(2014,9,20),
                  'checked': false}
                 ]



    function createTask(title, date){
        if(typeof(date)==undefined){
            
        }else{
               
        }
        node = {  'id': generateUUID(),
                  'title': title,
                  'date': new Date(date),
                  'checked': false};
        listaGeral.push(node);
    }

    //function appendNode
    
    function updateMonthList(month){
        var c = 0;
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        $("span.month-name").text(monthList[month]);
        
        $("ul.tasks-list").empty();

        for(i=0;i<listaGeral.length;i++){
            if(listaGeral[i].date.getMonth()==month){
                c++;
                //if()
                $("ul.tasks-list").append("<li><input type='checkbox'>"+listaGeral[i].title+"</li>");
            }
        }
        if(c==0){
            $("div.no-tasks").show();   
        }
    }


    function adjustCalendar(month, year){
        first = new Date(year, month, 1);
        disc = first.getDay();
        d = new Date(year,month,0).getDate();

        c=0;
        for(i=1; i<=d+1;i++){
            $("table.calendar td").eq(i+disc+1).html(i);
        }

        updateMonthList(month);      
    }

$(function(){
    dat = new Date();
    adjustCalendar(dat.getMonth(), dat.getYear());
    cYear = dat.getYear();
    cMonth = dat.getMonth();
    cDay = dat.getDay();

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
          createTask(text, dat);
          updateMonthList(dat.getMonth());
          window.scrollTo(0,document.body.scrollHeight);
      }
    });
    
    $("table.calendar tr td").click(function(){
        var day = $(this).text();
        var d = new Date(cYear,cMonth,day);
        
        alert
        
        $("table.calendar").addClass("week-"+d.getWeekOfMonth());
        $("div.calendar-area").height("71px");
        $("table.calendar tr td").removeClass("chosen");
        $(this).addClass("chosen");
    });
    
});