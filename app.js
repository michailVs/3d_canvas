const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

function vec3(x, y, z) {
    return {x, y, z}
}

function vec2(x, y) {
    return {x, y}
}

function z(cord) {
    return {x: cord[0] + cord[2], y: cord[1] + cord[2]}
}
function validateY(arr, i) {
    let temp = []
    arr.forEach(el => {
        if (arr[i][2] === el[2] && arr[i][0] === el[0] && arr[i][1] > el[1]) {
            temp = el
        }
        if (arr[i][2] === el[2] && arr[i][0] === el[0] && arr[i][1] < el[1]) {
            temp = el
        }
    })
    return temp
}
function validateX(arr, i) {
    let temp = []
    arr.forEach(el => {
        if (arr[i][2] === el[2] && arr[i][1] === el[1] && arr[i][0] > el[0]) {
            temp = el
        }
        if (arr[i][2] === el[2] && arr[i][1] === el[1] && arr[i][0] < el[0]) {
            temp = el
        }
    })
    return temp
}

function validateZ(arr, i) {
    let temp = []
    arr.forEach(el => {
        if (arr[i][2] < el[2] && arr[i][1] === el[1] && arr[i][0] === el[0]) {
            temp = el
        }
        if (arr[i][2] > el[2] && arr[i][1] === el[1] && arr[i][0] === el[0]) {
            temp = el
        }
    })
    return temp
}

function web() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 1
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(canvas.width, 0)
    ctx.stroke()
}
web()

function cube(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let z1 = z(matrix[i])
        ctx.lineWidth = 1
        ctx.strokeStyle = 'blue'
        const zY = validateY(matrix, i)
        const z2 = z(zY)
        const zX = validateX(matrix, i)
        const z3 = z(zX)
        const zZ = validateZ(matrix, i)
        const z4 = z(zZ)
        ctx.beginPath()
        ctx.moveTo(z1.x + matrix[i][0], canvas.height - z1.y - matrix[i][1])
        ctx.lineTo(z2.x + zY[0], canvas.height - z2.y - zY[1])
        ctx.moveTo(z1.x + matrix[i][0], canvas.height - z1.y - matrix[i][1])
        ctx.lineTo(z3.x + zX[0], canvas.height - z3.y - zX[1])
        ctx.moveTo(z1.x + matrix[i][0], canvas.height - z1.y - matrix[i][1])
        ctx.lineTo(z4.x + zZ[0], canvas.height - z4.y - zZ[1])
        ctx.stroke()
    }
}

function triangle(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let z1 = z(matrix[i])
        ctx.lineWidth = 1
        ctx.strokeStyle = 'blue'
        let zXZ = triangleValidate(matrix, i)
        if (zXZ.length === 0) {
            let zY = matrix.filter(el => el[1] < matrix[i][1])
            zY.forEach(el => {
                const z1 = z(matrix[i])
                const z2 = z(el)
                ctx.beginPath()
                ctx.moveTo(z1.x + matrix[i][0], canvas.height - z1.y - matrix[i][1])
                ctx.lineTo(z2.x + el[0], canvas.height - z2.y - el[1])
                ctx.stroke()
            })
        } else {
            zXZ.forEach(el => {
                const z2 = z(el)
                ctx.beginPath()
                ctx.moveTo(z1.x + matrix[i][0], canvas.height - z1.y - matrix[i][1])
                ctx.lineTo(z2.x + el[0], canvas.height - z2.y - el[1])
                ctx.stroke()
            })
        }
    }
}
function triangleValidate(arr, i) {
    let temp = []
    arr.forEach(el => {
        const xz = arr[i][1] === el[1] && (arr[i][2] < el[2] || arr[i][2] > el[2]) && (arr[i][0] < el[0] || arr[i][0] > el[0])
        const x = arr[i][1] === el[1] && arr[i][2] === el[2] && (arr[i][0] < el[0] || arr[i][0] > el[0])
        if (xz) {
            temp.push(el)
        }
        if (x) {
            temp.push(el)
        }
    })
    return temp
}
const matrix = [
    [
        [0, 0, 0],
        [15, 0, 0],
        [15, 0, 15],
        [0, 0, 15],
        [0, 15, 0],
        [15, 15, 0],
        [15, 15, 15],
        [0, 15, 15]
    ],
    [
        [50, 50, 50],
        [150, 50, 50],
        [100, 50, 150],
        [100, 150, 100],
    ],
    [
        [50, 50, 50],
        [150, 50, 50],
        [150, 50, 150],
        [50, 50, 150],
        [50, 150, 50],
        [150, 150, 50],
        [150, 150, 150],
        [50, 150, 150]
    ],
]
cube(matrix[0])
cube(matrix[2])
triangle(matrix[1])
