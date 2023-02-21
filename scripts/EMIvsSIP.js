'use strict';

    let futureValue,
        invested,
        SIPAmount,
        AmtInvested,
        TotalPay,
        catchInvested = document.getElementById("MonthlyEMI"),
        catchPayable = document.getElementById("Payable"),
        catchshowAmtInvested = document.getElementById("showAmtInvested"),
        catchshowTotalPay = document.getElementById("showTotalPay"),
        catchshowAmps = document.getElementById("showAmps"),
        returnedValue;
        var amountSlider = document.getElementById("myAmount");
        var amountOutput = document.getElementById("inputAmount");
        var roiSlider = document.getElementById("myRoi");
        var roiOutput = document.getElementById("inputRoi");
        var yearSlider = document.getElementById("myYears");
        var yearOutput = document.getElementById("inputYears");

        amountOutput.innerHTML = amountSlider.value;
        roiOutput.innerHTML = roiSlider.value;
        yearOutput.innerHTML = yearSlider.value;

        amountSlider.oninput = function () {
            amountOutput.innerHTML = this.value;
        }
        roiSlider.oninput = function () {
            roiOutput.innerHTML = this.value;
        }
        yearSlider.oninput = function () {
            yearOutput.innerHTML = this.value;
        }

        function showValAmount(newVal) {
            amountSlider.value = newVal;
            calculateIt();
        };
        function showValRoi(newVal) {
            roiSlider.value = newVal;
            calculateIt();
        };
        function showValYears(newVal) {
            yearSlider.value = newVal;
            calculateIt();
        };

        amountSlider.addEventListener("input", updateValueAmount);
        roiSlider.addEventListener("input", updateValueRoi);
        yearSlider.addEventListener("input", updateValueYears);

        function updateValueAmount(e) {
            amountOutput.value = e.srcElement.value;
            calculateIt();
        }
        function updateValueRoi(e) {
            roiOutput.value = e.srcElement.value;
            calculateIt();
        }
        function updateValueYears(e) {
            yearOutput.value = e.srcElement.value;
            calculateIt();
        }

        var calculatorMode = 'sip';
        var heading = document.getElementById("heading");
        var amountLabel = document.getElementById("amountLabel");

        function changeMode(mode){
            calculatorMode = mode;
            heading.innerHTML = mode === 'sip' ? 'SIP Calculator' : 'Lumpsum Calculator';
            amountLabel.innerHTML = mode === 'sip' ? 'Monthly Investment :' : 'Total Investment :';
            calculateIt();
        }
        let myChart;
        function calculateIt() {
            var EMI = document.getElementById("MonthlyEMI");
            var A = document.sipForm.realAmount.value;
            var R = document.sipForm.realRoi.value;
            var N = document.sipForm.realYears.value;

            invested = (formulajs.PMT((R / 100)/12, N * 12, -A, 0, 0));//EMI Monthly
            SIPAmount=invested*(10/100);
            var Test=SIPAmount;
            AmtInvested=SIPAmount*30*12;//Amount invested in SIP
            returnedValue = invested * N * 12;//Total Amount payable after tenure
            TotalPay= returnedValue + AmtInvested;//Your Total Pay
            futureValue=(formulajs.FV((15/100) / 12, N * 12, -Test, 0, 1));//You Receive
            
            var newinvested = invested.toLocaleString('en-US');
            catchInvested.innerHTML = "Rs. " + newinvested;      //-------EMI Monthaly

            var newreturnedValue = returnedValue.toLocaleString('en-US');
            catchPayable.innerHTML = "Rs. " + newreturnedValue;         //  Payable

            var newAmtInvested = AmtInvested.toLocaleString('en-US');
            catchshowAmtInvested.innerHTML = "Rs. " + newAmtInvested;         //  Amount in SIP

            var newTotalPay = TotalPay.toLocaleString('en-US');
            catchshowTotalPay.innerHTML = "Rs. " + newTotalPay;         //  Total Pay

            var newfutureValue = futureValue.toLocaleString('en-US');
            catchshowAmps.innerHTML = "Rs. " + newfutureValue;         //  Receive

            // catchInvested.innerHTML = "Rs. " + invested.toFixed(2);
            // catchPayable.innerHTML = "Rs. " + returnedValue.toFixed(2);
            // catchshowAmtInvested.innerHTML = "Rs. " + AmtInvested.toFixed(2);
            // catchshowTotalPay.innerHTML = "Rs. " + TotalPay.toFixed(2);
            // catchshowAmps.innerHTML = "Rs. " + futureValue.toFixed(2);
            // console.log('VALUES :', futureValue, invested, returnedValue)

            console.log(invested);
           generateChart(parseInt(futureValue),  parseInt(invested), parseInt(returnedValue))
        }
        calculateIt();


        function generateChart(a,b,c) {   
            console.log('CHART===========',a,b,c)
            if (!(isNaN(futureValue), isNaN(invested), isNaN(returnedValue))) {
                if (myChart !== undefined) {
                    myChart.destroy();
                }
                const data = {
                    labels: [
                      'Total',
                      'Invested',
                      'Return'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [a,b,c],
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                };
                const config = {
                    type: 'doughnut',
                    data: data,
                };
                myChart = new Chart(
                  document.getElementById('myChart'),
                  config
                );
            }
        };