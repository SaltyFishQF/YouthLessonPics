const numChar=['零','一','二','三','四','五','六','七','八','九']
const numUnit=['','十','百','千']         //权位
const numSection=['','万','亿','万亿','亿亿']     //节权位
function formatSection(num){
    let arr=(num+'').split('').reverse();
    let str=''
    for(let i=0;i<arr.length;i++){          //将0-9转化为零到九
        let char=arr[i]==0?numChar[0]:numChar[arr[i]]+numUnit[i]   //当数字为0时不加权位，非零加权位
        str=char+str;
    }
    let s=str.replace(/零+/g,'零').replace(/零+$/,'')       //将多个零合并为一个零，并剔除尾端的零
    return s;
}
function formatNum(num,str){      //将字符串按个数拆分
    let len=Math.ceil(str.length/num);
    let arr=[]
    for(let i=0;i<len;i++){
        let reverseStr=str.split('').reverse().join('')
        let s=reverseStr.slice(i*num,i*num+num).split('').reverse().join('')
            arr.unshift(s)
        }
    return arr
}
function numberTranToCN(num){
    let arr=formatNum(4,num+'')         //将数字每四个拆分一次
    let list=[]
    for(let i=0;i<arr.length;i++){
        let str=formatSection(arr[i])
        list.push(str)

    }
    let reverseList=list.reverse();
    for(let j=0;j<reverseList.length;j++){
        reverseList[j]+=numSection[j]
    }
    return reverseList.reverse().join('')
}

function getQueryVariable(variable)
{
    var query = decodeURI(decodeURI(window.location.search.substring(1)))
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}


function setMetaTitle(title) {
  document.title = title
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', 'static/img/blank.png')
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}
 


export {
    formatSection,
    formatNum,
    numberTranToCN,
    setMetaTitle
}