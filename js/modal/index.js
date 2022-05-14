'use strict'

{
  const jsonURLs = {
    contents: 'http://posse-task.anti-pattern.co.jp/1st-work/study_contents.json',
    language: 'http://posse-task.anti-pattern.co.jp/1st-work/study_language.json',
  }

  const setItems = (target, keys) => {
    const ul = document.getElementById(`js-checkbox-${target}`)

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    keys.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('form__checkbox')
      li.innerHTML = `<label class="form__checkbox__label">
        <input type="checkbox" value="${item}">
        <span class="form__checkbox__label__inline form__checkbox__label__inline--background">
          <span class="form__checkbox__label__icon"><i class="fa-solid fa-check"></i></span>
          ${item}
        </span>
      </label>`

      ul.appendChild(li)
    })
  }


  /**
  * 学習言語
  */
  fetch(jsonURLs.language)
  .then((response) => response.json() )
  .then(function(json) {
    const obj = json[0]
    setItems('language', Object.keys(obj))
  })

  /**
  * 学習コンテンツ
  */
  fetch(jsonURLs.contents)
  .then((response) => response.json() )
  .then(function(json) {
    const obj = json[0]
    setItems('contents', Object.keys(obj))
  })

  // js-submitと言うidをもつDOMを取得する
  const submit = document.getElementById('js-submit');
  const loading = document.getElementById('js-loading');
  const success = document.getElementById('js-success');

  // ローディングモーダルを非表示、successモーダルを表示
  const submitSuccess = () => {
    success.setAttribute('aria-hidden', 'false')
  }

  // submitがclickイベントを拾えるようにする
  submit.addEventListener('click', () => {
    // loadingのaria-hiddenをfalseにして表示する
    loading.setAttribute('aria-hidden', 'false')

    // 2秒後にsubmitSuccessを呼び出す
    setTimeout(function(){
      submitSuccess();
    }, 2000)
  })

  $('#modal').on('hidden.bs.modal', () => {
    loading.setAttribute('aria-hidden', 'true')
    success.setAttribute('aria-hidden', 'true')
  })

  // // SP版の学習内容選択ゾーンに関する処理
  // let contentsExpanded = false;
  // // セレクトボックスのDOMを取得する
  // const contentsSelectBox = document.getElementById('modal-contents-select-box');
  // // チェックボックス欄のDOMを取得する
  // const contentsCheckbox = document.getElementById('modal-contents-check-box');
  // // セレクトボックスがclickイベントを拾えるようにする
  // contentsSelectBox.addEventListener('click', ()=>{
  //     // 選択肢が開いていたら、チェックボックス欄を非表示にする
  //     // 選択肢が閉じていたら、チェックボックス欄を表示にする
  //     contentsCheckbox.style.display = contentsExpanded ? "none" : "block"
  //     contentsExpanded = !contentsExpanded
  // });

  // // SP版の言語選択ゾーンに関する処理
  // let languageExpanded = false;
  // // セレクトボックスのDOMを取得する
  // const languageSelectBox = document.getElementById('modal-language-select-box');
  // // チェックボックス欄のDOMを取得する
  // const languageCheckbox = document.getElementById('modal-language-check-box');
  // // セレクトボックスがclickイベントを拾えるようにする
  // languageSelectBox.addEventListener('click', ()=>{
  //     // 選択肢が開いていたら、チェックボックス欄を非表示にする
  //     // 選択肢が閉じていたら、チェックボックス欄を表示にする
  //     languageCheckbox.style.display = languageExpanded ? "none" : "block"
  //     languageExpanded = !languageExpanded
  // });

}
