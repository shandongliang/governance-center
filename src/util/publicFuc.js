


export function randomNamber() {
    let data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let result = ''
    let timeStamp = Date.parse(new Date())
    for (let i = 0; i < 19; i++) {
        r = Math.floor(Math.random() * 10)
        result += data[r]
    }
   // console.log('363', result + timeStamp)
    return timeStamp + result
}

export function deploy(v) {
    if (v == 'M') {
        return 'M-马坡'
    }
    if (v == 'P') {
        return 'P-鹏博士'
    }
    if (v == 'Z') {
        return 'Z-郑州'
    }
}
export function ConsumeMode(v) {
    if (v == 'earliest') {
        return '从最早开始消费'
    }
    if (v == 'latest') {
        return '从当前开始消费'
    }

}

