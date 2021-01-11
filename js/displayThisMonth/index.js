'use strict'

{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    function displayThisMonth(){
        const thisMonth = `${year}年 ${String(month + 1).padStart(2, '0')}月`;
        document.getElementById('thisMonth').textContent = thisMonth;
    }

    displayThisMonth();

    document.getElementById('prev').addEventListener('click', ()=>{
        month--;
        if(month < 0){
            year--;
            month = 11;
        }
        displayThisMonth();
    });

    document.getElementById('next').addEventListener('click', ()=>{
        month++;
        if(month > 11){
            year++;
            month = 0;
        }
        displayThisMonth();
    });
}
