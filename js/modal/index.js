'use strict'

{
    // to-modalLoadingと言うidをもつDOMを取得する
    const toModalLoading = document.getElementById('to-modalLoading');

    // toModalLoadingがclickイベントを拾えるようにする
    toModalLoading.addEventListener('click', ()=>{
        // 投稿モーダルを非表示にし、ローディングモーダルを表示する
        // これも関数に切り出しても良いかもね
        $('#modalPost').modal('hide');
        $('#modalLoading').modal('show');

        // 2秒後にtoModalSuccessを呼び出す
        setTimeout(function(){
            toModalSuccess();
        }, 2000)
    })

    // ローディングモーダルを非表示、successモーダルを表示
    function toModalSuccess(){
        $('#modalLoading').modal('hide');
        $('#modalSuccess').modal('show');
    }

    // SP版の学習内容選択ゾーンに関する処理
    let contentsExpanded = false;
    // セレクトボックスのDOMを取得する
    const contentsSelectBox = document.getElementById('modal-contents-select-box');
    // チェックボックス欄のDOMを取得する
    const contentsCheckbox = document.getElementById('modal-contents-check-box');
    // セレクトボックスがclickイベントを拾えるようにする
    contentsSelectBox.addEventListener('click', ()=>{
        // 選択肢が開いていたら、チェックボックス欄を非表示にする
        // 選択肢が閉じていたら、チェックボックス欄を表示にする
        contentsCheckbox.style.display = contentsExpanded ? "none" : "block"
        contentsExpanded = !contentsExpanded
    });

    // SP版の言語選択ゾーンに関する処理
    let languageExpanded = false;
    // セレクトボックスのDOMを取得する
    const languageSelectBox = document.getElementById('modal-language-select-box');
    // チェックボックス欄のDOMを取得する
    const languageCheckbox = document.getElementById('modal-language-check-box');
    // セレクトボックスがclickイベントを拾えるようにする
    languageSelectBox.addEventListener('click', ()=>{
        // 選択肢が開いていたら、チェックボックス欄を非表示にする
        // 選択肢が閉じていたら、チェックボックス欄を表示にする
        languageCheckbox.style.display = languageExpanded ? "none" : "block"
        languageExpanded = !languageExpanded
    });

    // decideCalendarというidをもつDOMを取得し、clickイベントを監視する
    document.getElementById('decideCalendar').addEventListener('click', ()=>{
        // カレンダーモーダルを閉じる
        $('#modalCalendar').modal('hide');
    })
}