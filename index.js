let firstOperand = ""
let secondOperand = ""
let finalResult = ""
let display = ""
let output = ""
let digits = ["0", "1", "2", "3", "7", "8", "9", "4", "5", "6"]
let operator = ["/", "-", "+", "*", "%"]
let choosenOperator = ""
let keys = [...digits, ...operator, "=", "."]
let clickable = [...keys, "clear", "sign"]

const print = (operation) => {

    console.log("operation : " + operation)
    console.log("first : " + firstOperand)
    console.log("second : " + secondOperand)
    console.log("result : " + finalResult)
    console.log("opeator : " + choosenOperator)
}

const helper = {
    parse: (digit) => {
        return [...digit].includes(".") ?
            parseFloat(digit) :
            parseInt(digit, 10)
    },
    displayFunction: (input = "0") => {

        document.getElementById("small-output").textContent = input
    }
}
const operatorFunction = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    '/': (a, b) => b === 0 ? Error("division by Zero") : a / b
}
const reinitialize = () => {
    firstOperand = "";
    secondOperand = "";
    finalResult = ""
    choosenOperator = "";
    helper.displayFunction()
    print("reinitialize")
}
const operate = (operator, a, b) => {
    helper.displayFunction(finalResult = operatorFunction[operator](a, b))
    print("operate")
        //reinitialize()
}
const changeSign = (input) => {
    if (input) {
        if (input != "0") {

            if (input[0] == "-") {
                return input.slice(1)
            }
            if (input[0] != "-")
                return "-" + input
        }
    }
    return input
}
const signFunction = () => {
    finalResult != "" ? helper.displayFunction(finalResult = changeSign(finalResult + "")) : (
        choosenOperator == "" ?
        helper.displayFunction(firstOperand = changeSign(firstOperand)) :
        helper.displayFunction(secondOperand = changeSign(secondOperand)))
}
const equalFunction = () => {

    if (firstOperand && secondOperand && choosenOperator) {
        operate(choosenOperator,
            helper.parse(firstOperand),
            helper.parse(secondOperand)
        )
        choosenOperator = "="
    }
    print("equal")
}
const setOperator = (operator) => {
    if (finalResult) {
        firstOperand = finalResult + ""
        secondOperand = ""
        finalResult = ""
    }

    choosenOperator = operator
        //helper.displayFunction(operator)
    print("setoperator")
}
const checkZero = (operand, input, a) => {
    console.log(a)
    console.log(`${ typeof operand } ${ operand }`)
    console.log(`${typeof input} ${input}`)
    if (((operand == "0" || operand == "") && input != "0") || operand != "") {
        return operand == "0" ? input : operand + input
    }
    return "0"
}
const fillOperand = (input) => {
    if (finalResult)
        reinitialize();
    if (choosenOperator == "") {
        if (checkZero(firstOperand, input, "firstoperand"))
            helper.displayFunction(firstOperand = checkZero(firstOperand, input, "firstoperand"))
    } else {
        if (checkZero(secondOperand, input, "firstoperand"))
            helper.displayFunction(secondOperand = checkZero(secondOperand, input, "secondoperand"))
    }


    //print("filloperand")

}

const eventKeyFunction = (key) => {
    console.log(key)
    if (digits.includes(key)) {
        fillOperand(key)
    } else if (operator.includes(key)) {
        setOperator(key)
    } else if (key == "=") {
        equalFunction()
    }
}

const eventClickFunction = (value) => {
    if (keys.includes(value)) {
        eventKeyFunction(value)
    } else if (value == "clear") {
        reinitialize()
    } else if (value == "sign") {
        signFunction()
    }
}

const eventFunction = (event) => {
    if (event.key && keys.includes(event.key)) {
        eventKeyFunction(event.key)
    } else if (clickable.includes(event.target.value)) {
        eventClickFunction(event.target.value)
    }
}

const listenerOnClick = (event) => {
    if (clickable.includes(event.target.value)) {
        eventFunction(event)
    }
}

const listenerOnKeydown = (event) => {
    if (keys.includes(event.key)) {
        eventFunction(event)
    }
}

const datas = [
    { class: "clear", value: "clear", display: "AC", key: "192" },
    { class: "sign", value: "sign", display: "+/-", key: "193" },
    { class: "percent", value: "%", display: "%", key: "194" },
    { class: "operator", value: "/", display: "/", key: "111" },
    { class: "operand", value: "7", display: "7", key: "103", },
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
    { class: "equal", value: "=", display: "=", key: "187" },
]


const init = () => {
    let container = document.querySelector("#pad")
    let buttons = datas.map(data => {
        let button = document.createElement('button')
        button.classList.add(data.class)
        button.setAttribute("value", data.value)
        button.setAttribute("data-key", data.key)
        button.textContent = data.display
        button.addEventListener("click", listenerOnClick)
        return button
    })
    let i = 1;
    let div = document.createElement("DIV");
    div.classList.add("button-range")
    for (let button of buttons) {
        div.appendChild(button)
        if ((i % 4 == 0 && i > 0) || i == 19) {
            container.appendChild(div)
            div = document.createElement("DIV")
            div.classList.add("button-range")
        }
        i++
    }
    helper.displayFunction()
        //listener for body
    document.body.addEventListener("keydown", listenerOnKeydown)
    return buttons
}

const main = (function() {
    console.log(init())

})()