function writeCode(prefix,code,fn) {
    let domeCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domeCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n)
        domeCode.scrollTop = domeCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 50)
}
function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper >.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 25)
}

var result = `/*
*面试官你好，我是XXX
*我将以动画的形式来介绍我自己
*只用文字介绍太单调了
*我就用代码来介绍吧
*首先准备一些样式
*/
/* 首先给所有元素加上过渡效果*/
*{
    transition: all 1s
}
/* 白色背景太单调了，我们来点背景 */
html{
    background: rgb(222,222,222);
    font-size: 16px;
}
/* 文字离边框太近了 */
#code{
    border: 1px solid #aaa;
    padding: 16px;
}

/* 我需要一点代码高亮 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
/* 加一个呼吸效果 */
#code{
    animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
    width: 50%; height: 100%; left: 0; position: fixed;
}
#paper{
    padding: 16px;
    background: #444;
}
#papper >.content{
    display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var result2 = `/*
* 接下来用一个优秀的库marked.js
*把Markdown 变成HTML
*/
`
var md = `
# 自我介绍
我叫xxx
1992年6月出生
华南师范大学毕业
在饥人谷学习前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉Javascript CSS

# 项目介绍
1. 苹果风格轮播
2. 会动的简历
3. canvas画板

# 联系方式
QQ 2249639871
Email 2249639871@qq.com
手机 16620011756
`
var result3 = `
/*
*这就是我会动的简历
*谢谢观看
*/
`

writeCode('', result, ()=>{
    createPaper(()=>{
        writeCode(result,result2, ()=>{
            writeMarkdown(md, ()=>{
                markdownToHtml(()=>{
                    writeCode(result+result2, result3, ()=>{
                        console.log('完成')
                    })
                })
            })
        })
    })
})


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}
function convertMarkdownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
}
