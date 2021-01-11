'use strict'

{
    /**
     * 親要素より大きい要素は、white-spaceをnormalにする
     * @param {string} targetQuery white-spaceを調整したいdomのquery
     * @param {string} targetParentQuery 調整したいdomの親要素のquery
     * @returns {void}
     */
    function changeWhiteSpace(targetQuery, targetParentQuery) {
        const targetDoms = document.querySelectorAll(targetQuery)
        const parentDomWidth = document.querySelector(targetParentQuery).offsetWidth
        const listDecorationWidth = 20
        const paddingRight = 10
        targetDoms.forEach((targetDom) => {
            // 親要素の幅 - 確認したいDOMの幅 + リストの丸ぽちの幅 + リストアイテムのpadding
            if (parentDomWidth - targetDom.offsetWidth + listDecorationWidth + paddingRight > 0) return
            targetDom.style.whiteSpace = 'normal'
        })
    }

    window.addEventListener('resize', $.throttle(250, function(){
        changeWhiteSpace('.language', '.language-tag')
        changeWhiteSpace('.content', '.contents-tag')
    }))
}