const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const repayment1El = document.querySelector("#repayment1");
const repayment2El = document.querySelector("#repayment2");
const feeEl = document.querySelector("#fee");
const error_formEl = document.querySelector("#error-form")
const calcEl = document.querySelector("#calc");
const resetEl = document.querySelector("#reset");
const tableEl = document.querySelector("#table");
const tbodyEl = document.querySelector("#table tbody");

const resultEl = document.querySelector("#result");

console.log(amountEl, yearsEl, rateEl, repayment1El, repayment2El, feeEl, calcEl, tableEl);

// element監聽器 ，calcEl.addEventListener("監聽的東西",function);
calcEl.addEventListener("click", calcloan);

function calcloan() {
    let amount = amountEl.value * 10000;
    let years = yearsEl.value;
    let rate = rateEl.value;
    let fee = feeEl.checked ? 5000 : 0;


    // let fee = 0;
    // if (feeEl.checked) {
    //     fee = 5000
    // }

    // 取得本金攤還或本息攤還
    let rule = repayment1El.checked ? 1 : 2;

    let result;
    if (rule == 1) {
        result = rule1(amount, years, rate);
        console.log(result);

    } else {
        result = rule2(amount, years, rate);
        console.log(result);
    }
    // 總付款金額
    let totalInterest = result[1];
    let totalAmount = amount + totalInterest + fee;

    document.querySelector(".totalAmount").innerText = totalAmount + "元" + (fee == 0 ? "" : "(含手續費)");
    document.querySelector(".totalInterest").innerText = totalInterest + "元";


    if (amount < 0 || rate < 0) {
        console.log("數值輸入錯誤");
        error_formEl.innerHTML = `<b>數值輸入錯誤</b>`;
        error_formEl.style.display = "block";
        resultEl.style.display = "none";
    } else {
        error_formEl.style.display = "none";
        // 預設框架未跳出，
        resultEl.style.display = "none";
        // 藉由含式，若有再次輸入，則等100毫秒跳出
        setTimeout(function () {
            resultEl.style.display = "block";
        }, 100);

        setTimeout(function () {
            tableEl.style.display = "block";
        }, 100);


    }
    // console.log(amount, years, rate, fee, rule);
    drawTable(result[0]);
}


function drawTable(datas) {
    let tableStr = "";
    for (let i = 0; i < datas.length; i++) {
        tableStr += "<tr>";
        for (let j = 0; j < datas[i].length; j++) {
            tableStr += `<td>${datas[i][j]}</td>`;
            // console.log(datas[i][j]);

        }
        tableStr += "</tr>";
    }
    tbodyEl.innerHTML = tableStr;
    // let tableStr = "<ul>";
    // for (let i = 0; i < datas.length; i++) {
    //     console.log(datas[i].join(","));
    //     tableStr += `<li>${datas[i].join(",")}</li>`;
    // }
    // tableStr += "</ul>;"
    // console.log(tableStr);

}





resetEl.addEventListener("click", resetButton);

function resetButton() {
    resultEl.style.display = "none";
    tableEl.style.display = "none";
    amountEl.value = 10;
    yearsEl.value = 5;
    rateEl.value = 2;
    feeEl.checked = true;
    repayment1El.checked = true;
    repayment2El.checked = false;

}

function rule1(total_amount, years, rate) {
    let amount = total_amount;
    let month_rate = rate / 100 / 12;
    let period = years * 12;
    let month_pay = parseInt(amount / period);

    let datas = [];
    let totalInterest = 0
    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate);
        amount -= month_pay;
        totalInterest += interest;


        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_pay + interest + amount, 0]);

        } else {
            datas.push([i + 1, month_pay, interest, month_pay + interest, amount]);
        }
    }
    // console.log(datas);
    return [datas, totalInterest];
}


function rule2(total_amount, years, rate) {


    let amount = total_amount;
    let month_rate = rate / 100 / 12;
    let period = years * 12;

    let month_pay = amount * month_rate * (Math.pow((1 + month_rate), period)) / (Math.pow((1 + month_rate), period) - 1);
    month_pay = Math.ceil(month_pay);

    datas = [];
    totalInterest = 0;

    for (let i = 0; i < period; i++) {
        pay_month_interest = amount * month_rate;
        pay_month_interest = Math.round(pay_month_interest);
        amount -= (month_pay - pay_month_interest);
        totalInterest += pay_month_interest;


        if (i != period - 1) {

            datas.push([i + 1, month_pay - pay_month_interest, pay_month_interest, month_pay, amount])
        } else {

            datas.push([i + 1, amount + month_pay - pay_month_interest, pay_month_interest, amount + month_pay, 0])
        }
    }

    // 總支出利息
    console.log(totalInterest);

    // 總還款金額
    console.log(totalInterest + total_amount);
    return [datas, totalInterest];
}