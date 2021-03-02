'use strict'

{
    // calendar
    const calendarToday = new Date();
    let calendarYear = calendarToday.getFullYear();
    let calendarMonth = calendarToday.getMonth();
    let calendarDate = calendarToday.getDate();

    function studyDateText(date = String(calendarDate).padStart(2, '0'), year = calendarYear, month = calendarMonth) {
        return `${year}年${String(month + 1).padStart(2, '0')}月${date}日`;
    }

    document.getElementById('studyDate').value = studyDateText()

    function getPrevMonth(){
        const dates = [];
        const prevLastDate = new Date(calendarYear, calendarMonth, 0).getDate();
        const prevDays = new Date(calendarYear, calendarMonth, 1).getDay();

        for(let i = 0; i < prevDays; i++){
            dates.unshift({
                date: prevLastDate - i,
                selectedDate: false,
                disabled: true,
                pastDays: false,
            });
        }

        return dates
    }

    function getThisMonth(){
        const dates = [];
        const lastDate = new Date(calendarYear, calendarMonth + 1, 0).getDate();

        for(let i = 1; i <= lastDate; i++){
            if(i < calendarToday.getDate()){
                dates.push({
                    date: i,
                    selectedDate: false,
                    disabled: false,
                    pastDays: true,
                });
            }else{
                dates.push({
                    date: i,
                    selectedDate: false,
                    disabled: false,
                    pastDays: false,
                });
            }

            if(calendarYear === calendarToday.getFullYear() && calendarMonth < calendarToday.getMonth()){
                dates[i - 1].pastDays = true;
            }
            if(calendarYear < calendarToday.getFullYear()){
                dates[i - 1].pastDays = true;
            }

            if(calendarYear === calendarToday.getFullYear() && calendarMonth > calendarToday.getMonth()){
                dates[i - 1].pastDays = false;
            }
            if(calendarYear > calendarToday.getFullYear()){
                dates[i - 1].pastDays = false;
            }
        }

        if(calendarYear === calendarToday.getFullYear() && calendarMonth === calendarToday.getMonth()){
            dates[calendarToday.getDate() - 1].selectedDate = true;
        }

        return dates;
    }

    function getNextMonth(){
        const dates = [];
        const nextDays = new Date(calendarYear, calendarMonth + 1, 0).getDay();
        for(let i = 1; i < 7 - nextDays; i++){
            dates.push({
                date: i,
                selectedDate: false,
                disabled: true,
                pastDays: false,
            });
        }

        return dates;
    }

    function createCalendar(){
        const tbody = document.querySelector('tbody.calendar');
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }

        const calendarThisMonth = `${calendarYear}年${String(calendarMonth + 1).padStart(2, '0')}月`;
        document.getElementById('calendarThisMonth').textContent = calendarThisMonth;

        const dates = [
            ...getPrevMonth(),
            ...getThisMonth(),
            ...getNextMonth(),
        ];
        const weeks = [];
        const weeksCount = dates.length / 7;

        for(let i = 0; i < weeksCount; i++){
            weeks.push(dates.splice(0, 7));
        }
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');

                td.textContent = date.date;

                if(date.selectedDate){
                    td.classList.add('selected-date');
                }
                if(date.disabled){
                    td.classList.add('disabled');
                }
                if(date.pastDays){
                    td.classList.add('past-days');
                }

                tr.appendChild(td);
            });
            document.querySelector('tbody.calendar').appendChild(tr);
        });

        addSetToday()
    }

    function addSetToday() {
        const validaDates = document.querySelectorAll('tbody.calendar td:not(.disabled):not(.past-days)')
        validaDates.forEach(td => {
            td.addEventListener('click', (e) => {
                document.getElementById('studyDate').value = studyDateText(e.target.textContent)
                const selectedDate = document.querySelector('td.selected-date')
                if (selectedDate) {
                    selectedDate.classList.remove('selected-date')
                }
                td.classList.add('selected-date')
            })
        })
    }

    document.getElementById('calendarPrev').addEventListener('click', ()=>{
        calendarMonth--;
        if(calendarMonth < 0){
            calendarYear--;
            calendarMonth = 11;
        }

        createCalendar();
    });

    document.getElementById('calendarNext').addEventListener('click', ()=>{
        calendarMonth++;
        if(calendarMonth > 11){
            calendarYear++;
            calendarMonth = 0;
        }
        createCalendar();
    });

    createCalendar();
}