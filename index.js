let firstOperand = 0
let secondOperand = 0
let output = ""
let operator = ""

const datas = [{
        class: "clear",
        value: "clear",
        display: "AC",
        key: "192",
        listenerOnClick: (event) => {

        },
    },
    { class: "sign", value: "sign", display: "+/-", key: "193" },
    { class: "percent", value: "%", display: "%", key: "194" },
    { class: "operator", value: "/", display: "/", key: "111" },
    { class: "operand", value: "7", display: "7", key: "103" },
    { class: "operand", value: "8", display: "8", key: "104" },
    { class: "operand", value: "9", display: "9", key: "105" },
    { class: "operator", value: "*", display: "X", key: "191" },
    { class: "operand", value: "4", display: "4", key: "100" },
    { class: "operand", value: "5", display: "5", key: "101" },
    { class: "operand", value: "6", display: "6", key: "102" },
    { class: "operator", value: "-", display: "-", key: "109" },
    { class: "operand", value: "1", display: "1", key: "97" },
    { class: "operand", value: "2", display: "2", key: "98" },
    { class: "operand", value: "3", display: "3", key: "99" },
    { class: "operator", value: "+", display: "+", key: "107" },
    { class: "operand", value: "0", display: "0", key: "96" },
    { class: "point", value: ".", display: ".", key: "110" },
    { class: "operator", value: "=", display: "=", key: "187" },
]
const operatorFunction = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    '/': (a, b) => b === 0 ? Error("division by Zero") : a / b
}

const operate = (operator, a, b) => operatorFunction[operator](a, b)

const init = () => {
    let container = document.querySelector("#pad")
    let buttons = datas.map(data => {
        let button = document.createElement('button')
        button.classList.add(data.class)
        button.setAttribute("value", data.value)
        button.setAttribute("data-key", data.key)
        button.textContent = data.display
        return button
    })
    let i = 1;
    let div = document.createElement("DIV")
    div.classList.add("button-range")
    for (let button of buttons) {
        if (i % 5 == 0) {
            container.appendChild(div)
            div = document.createElement("DIV")
            div.classList.add("button-range")
            i = 1
        }
        div.appendChild(button)
        i++
    }
    return buttons
}

const main = (function() {
    console.log(init())
})()