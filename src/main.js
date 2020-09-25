const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x =localStorage.getItem('x')
//JSON.parse是把字符串重新变为对象
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'R', url: 'http://www.ruanyifeng.com/blog/javascript/'},
    {logo: 'G', url: 'https://github.com/FrankFang'},
    {logo: 'C', url: 'https://www.cnblogs.com/rubylouvre/'},
]



const simplifyUrl = (url)=>{
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')         //匹配删除所有以   /   开头的内容
}

const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(
        (node,index) => {
            console.log(index);
            const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>
        `).insertBefore($lastLi)
            $li.on('click',()=>{
                window.open(node.url)
            })
            $li.on('click','.close',(e)=>{
                e.stopPropagation()         //阻止冒泡
                hashMap.splice(index,1)
                render()
            })
        }
    )
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: "text",
        url: simplifyUrl(url)
    })
    $siteList.find('li:not(.last)').remove()

    render()
})

window.onbeforeunload = () =>{
    //JSON.stringify可以把对象变为字符串
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}


//键盘响应事件
$(document).on('keypress',(e)=>{
    const {key} = e
    console.log(key)
    for (let i = 0;i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase()===key){
            // console.log(hashMap[i].url)
            window.open(hashMap[i].url)
        }
    }
})