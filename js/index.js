const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const repayment1El = document.querySelector("#repayment1");
const repayment2El = document.querySelector("#repayment2");
const feeEl = document.querySelector("#fee");
const error_formEl = document.querySelector("#error-form")
const calcEl = document.querySelector("#calc");

console.log(amountEl, yearsEl, rateEl, repayment1El, repayment2El, feeEl, calcEl);

// element監聽器 ，calcEl.addEventListener("監聽的東西",function);
calcEl.addEventListener("click", calcloan);

function calcloan() {
    let amount = amountEl.value * 10000;
    let years = yearsEl.value;
    let rate = rateEl.value / 100;
    let fee = feeEl.checked ? 5000 : 0;

    // let fee = 0;
    // if (feeEl.checked) {
    //     fee = 5000
    // }
    if (amount || rate < 0) {

        console.log("數值輸入錯誤");
        error_formEl.innerHTML = `<b>數值輸入錯誤</b>`

    }
    // 取得本金攤還或本息攤還
    let rule = repayment1El.checked ? 1 : 2;

    let interest = amount * years * rate;
    let totalAmount = amount + interest + fee;
    console.log(amount, years, rate, fee, rule, interest, totalAmount);
}
