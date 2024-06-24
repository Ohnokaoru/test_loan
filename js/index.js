const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const repayment1El = document.querySelector("#repayment1");
const repayment2El = document.querySelector("#repayment2");
const feeEl = document.querySelector("#fee");
const error_formEl = document.querySelector("#error-form")
const calcEl = document.querySelector("#calc");
const resetEl = document.querySelector("#reset");

const resultEl = document.querySelector("#result");

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

    // 取得本金攤還或本息攤還
    let rule = repayment1El.checked ? 1 : 2;

    let totalInterest = amount * years * rate;
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

    }
    console.log(amount, years, rate, fee, rule, totalInterest, totalAmount);
}

resetEl.addEventListener("click", resetButton);

function resetButton() {
    resultEl.style.display = "none";

}