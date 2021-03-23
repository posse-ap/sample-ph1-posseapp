'use strict'

{
    // 当日の年月日を取得する
    const calendarToday = new Date();
    let calendarYear = calendarToday.getFullYear();
    // getMonthは0から始まる ex: 1月の場合は0、12月の場合は11
    let calendarMonth = calendarToday.getMonth();
    let calendarDate = calendarToday.getDate();

    // 年月日を表示するための文言を作成する
    function studyDateText(date = String(calendarDate).padStart(2, '0'), year = calendarYear, month = calendarMonth) {
        return `${year}年${String(month + 1).padStart(2, '0')}月${date}日`;
    }

    document.getElementById('studyDate').value = studyDateText()

    // 先月の日付のうち、今月カレンダーに含まれる(表示はしない)日付配列を取得する
    function getPrevMonth(){
        const dates = [];
        // 先月の末日を取得する
        const prevLastDate = new Date(calendarYear, calendarMonth, 0).getDate();
        // 今月の初日の曜日を取得する
        const prevDays = new Date(calendarYear, calendarMonth, 1).getDay();
        // 日曜から今月初日の曜日までの日数でループを回す
        for(let i = 0; i < prevDays; i++){
            // 配列の先頭に順に日付を入れていく
            // ex: [31, 30, 29. 28]
            dates.unshift({
                date: prevLastDate - i,
                selectedDate: false,
                disabled: true,
                pastDays: true,
            });
        }
        return dates
    }

    function getThisMonth(){
        const dates = [];

        // 今月の末日を取得する
        const lastDateInThisMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

        // 今月1日から今月末日までの日数でループを回す
        for(let i = 1; i <= lastDateInThisMonth; i++){
            // 配列の末尾に順に日付を入れていく
            // ex: [1, 2, 3 ~ 30]
            dates.push({
                date: i,
                // 日付が当日の場合、selectedDateをtrueにする
                selectedDate: new Date(calendarYear, calendarMonth, i) === calendarToday,
                disabled: false,
                // 日付が過去日の場合、pastDaysをtrueにする
                pastDays: new Date(calendarYear, calendarMonth, i) < calendarToday,
            });
        }

        return dates;
    }

    // 来月の日付のうち、今月カレンダーに含まれる(表示はしない)日付配列を取得する
    function getNextMonth(){
        const dates = [];
        // 今月の末日の曜日を取得する
        const lastDayInThisMonth = new Date(calendarYear, calendarMonth + 1, 0).getDay();
        // 今月末日から最終週の土曜までの日数でループを回す
        for(let i = 0; i < 6 - lastDayInThisMonth; i++){
            // 配列の末尾に順に日付を入れていく
            // ex: [1, 2, 3]
            dates.push({
                date: i + 1,
                selectedDate: false,
                disabled: true,
                pastDays: true,
            });
        }

        return dates;
    }

    function createCalendar(){
        // calendarというclassをもつtbodyを取得する
        const tbody = document.querySelector('tbody.calendar');
        // 念の為tbodyが中身(カレンダー)を持っていたら消して初期化する
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }

        // カレンダーのタイトルを作成し、calendarThisMonthというidをもつDOMに表示する ex: 2021年03月
        const calendarThisMonth = `${calendarYear}年${String(calendarMonth + 1).padStart(2, '0')}月`;
        document.getElementById('calendarThisMonth').textContent = calendarThisMonth;

        // 先月、当月、来月の日付を一つの配列にまとめる
        const dates = [
            ...getPrevMonth(),
            ...getThisMonth(),
            ...getNextMonth(),
        ];
        // 日数を7で割って何週あるかを算出する
        const weeks = [];
        const weeksCount = dates.length / 7;

        // 週の数だけループを回す
        for(let i = 0; i < weeksCount; i++){
            // 7日ごとに配列にし、weeks配列に突っ込む
            weeks.push(dates.splice(0, 7));
        }
        // weeksの要素分だけループする
        weeks.forEach(week => {
            // weekは日付をまとめた配列
            // trを作成(週を表現する)
            const tr = document.createElement('tr');
            // weekの日付分だけループさせる
            week.forEach(date => {
                // tdを作成(日にちを表現する)
                const td = document.createElement('td');

                // tdに日付を設定する
                td.textContent = date.date;

                // その日がselectedDateがtrueならselected-dateというclassを加える
                if(date.selectedDate){
                    td.classList.add('selected-date');
                }
                // その日がdisabledがtrueならdisabledというclassを加える
                if(date.disabled){
                    td.classList.add('disabled');
                }
                // その日がpastDaysがtrueならpast-daysというclassを加える
                if(date.pastDays){
                    td.classList.add('past-days');
                }

                // trの配下にtdをくっつける
                tr.appendChild(td);
            });
            // 取得していたtbodyの配下にtrをくっつける
            tbody.appendChild(tr);
        });

        addSetToday()
    }

    function addSetToday() {
        // 昨日以前とdisabled(前月と来月の日にち)以外の日にちDOMを取得する
        const validaDates = document.querySelectorAll('tbody.calendar td:not(.disabled):not(.past-days)')
        // 取得した日にちでループを回す
        validaDates.forEach(td => {
            // tdには日にちのDOM1つが入り、それがclickされた時の挙動を設定する
            td.addEventListener('click', (e) => {
                // 学習日を更新する
                document.getElementById('studyDate').value = studyDateText(e.target.textContent)
                // selected-dateというclassをもつtdを取得する
                const selectedDate = document.querySelector('td.selected-date')
                // selected-dateというclassをもつtdがあれば、そのdomからselected-dateを取り除く
                if (selectedDate) {
                    selectedDate.classList.remove('selected-date')
                }
                // clickされたtdにselected-dateというclassを追加する
                td.classList.add('selected-date')
            })
        })
    }

    // calendarPrevというidをもつDOMにclickイベントをバインドする
    document.getElementById('calendarPrev').addEventListener('click', ()=>{
        // 月を一つ前にする
        calendarMonth--;
        // 当月が1月の時、年を1つ前にし、月を12月にする
        if(calendarMonth < 0){
            calendarYear--;
            calendarMonth = 11;
        }

        createCalendar();
    });

    // calendarNextというidをもつDOMにclickイベントをバインドする
    document.getElementById('calendarNext').addEventListener('click', ()=>{
        // 月を一つ後にする
        calendarMonth++;
        // 当月が12月の時、年を1つ後にし、月を1月にする
        if(calendarMonth > 11){
            calendarYear++;
            calendarMonth = 0;
        }
        createCalendar();
    });

    createCalendar();
}