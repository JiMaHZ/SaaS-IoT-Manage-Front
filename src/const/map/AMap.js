export default function MapLoader () { // <-- 原作者这里使用的是module.exports
    return new Promise((resolve, reject) => {
    if (window.AMap) {
    resolve(window.AMap)
    } else {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'http://webapi.amap.com/maps?v=1.4.14&callback=initAMap&key=d3781f735fcd6c3c4417f90ba2fa5764'
    script.onerror = reject
    document.head.appendChild(script)
    }
    window.initAMap = () => {
    resolve(window.AMap)
    }
    })
}