'use strict'

{
    // Dateオブジェクトを用意し、年月を取得する
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    // 年月をDOMに埋め込む
    function displayThisMonth(){
        // 年月を表示するための文言を組み立てる
        const thisMonth = `${year}年 ${String(month + 1).padStart(2, '0')}月`;
        // 組み立てた文言をthisMonthというidをもつDOMに埋め込む
        document.getElementById('thisMonth').textContent = thisMonth;
    }

    displayThisMonth();

    // prevというidをもつDOMにclickイベントをバインドする
    document.getElementById('prev').addEventListener('click', ()=>{
        // clickされたら月を一つ前にする
        month--;
        // 1月の時にクリックされたら昨年の12月にする
        if(month < 0){
            year--;
            month = 11;
        }
        // DOMに表示する年月の文言を更新する
        displayThisMonth();
    });

    // nextというidをもつDOMにclickイベントをバインドする
    document.getElementById('next').addEventListener('click', ()=>{
        // clickされたら月を一つ後にする
        month++;
        // 12月の時にクリックされたら翌年の1月にする
        if(month > 11){
            year++;
            month = 0;
        }
        // DOMに表示する年月の文言を更新する
        displayThisMonth();
    });
}
