'use strict'

{
    /**
     * 親要素より大きい要素は、white-spaceをnormalにする
     * @param {string} targetQuery white-spaceを調整したいdomのquery
     * @param {string} targetParentQuery 調整したいdomの親要素のquery
     * @returns {void}
     */
    function changeWhiteSpace(targetQuery, targetParentQuery) {
        // targetQueryに関するdom(複数)を取得
        const targetDoms = document.querySelectorAll(targetQuery)
        // targetParentQueryに関するdom(単数)を取得し、そのdomの横幅(paddingとborderは含むが、marginは含まない)
        const parentDomWidth = document.querySelector(targetParentQuery).offsetWidth
        // 各項目横の青ポチの幅 + margin-right
        const listDecorationWidth = 20
        // 各項目のpadding-right
        const paddingRight = 10
        targetDoms.forEach((targetDom) => {
            // 親要素の幅 - 確認したいDOMの幅 + リストの丸ぽちの幅 + リストアイテムのpadding
            // -> 子要素が親要素に収まる場合は何もしない
            if (parentDomWidth - targetDom.offsetWidth + listDecorationWidth + paddingRight > 0) return
            // 子要素が親要素に収まらない場合は、子要素を折り返すようにする
            targetDom.style.whiteSpace = 'normal'
        })
    }

    // ブラウザサイズが変更されると、0.25秒の猶予を持って処理を走らせる
    window.addEventListener('resize', $.throttle(250, function(){
        changeWhiteSpace('.item', '.item-list')
    }))
}