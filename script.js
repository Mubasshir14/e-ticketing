const totalPriceSpan = document.getElementById('total-price');
const grandTotalAmountSpan = document.getElementById('grand-total-amount');
const seatInputCount = document.getElementById('seatInputCount');
const ticketTitlePriceListContainer = document.getElementById('ticket-title-price-list-container');
const availableSeat = document.getElementById('availableSeat');
const btnNext = document.getElementById('btn-next');
const phoneNumber = document.getElementById('phoneNumber');
const screenBlack = document.getElementById('screenBlack');
const popUp = document.getElementById('popUp');
const closePopUpBtn = document.getElementById('closePopUpBtn');
const couponApplyBtn = document.getElementById('couponApplyBtn');
const couponSuccessPara = document.getElementById('coupon-success-para');
const couponBox = document.getElementById('coupon-box');
const couponContainer = document.getElementById('coupon-container');
const discountMsgContainer = document.getElementById('discount-msg-container');
const seatBtnContainer = document.querySelectorAll('#seat-btn-container button'); 

let ticket = 0;
let phone;



for(const btn of seatBtnContainer) {
    btn.addEventListener('click', function(e) {
        if(!e.target.classList.contains('bg-[#1DD100]')) {
            
            ticket += 1;
            if(ticket <= 4) {
                e.target.classList.remove('bg-[#F7F8F8]');
                e.target.classList.add('bg-[#1DD100]');
                availableSeat.innerText = parseInt(availableSeat.innerText) - 1;
                seatInputCount.innerText = ticket;
                const div = document.createElement('div');
                div.classList.add('flex', 'justify-between');
                const p1 = document.createElement('p');
                p1.innerText = e.target.innerText;
                div.appendChild(p1);
                const p2 = document.createElement('p');
                p2.innerText = 'Economoy';
                div.appendChild(p2);
                const p3 = document.createElement('p');
                p3.innerText = 550;
                div.appendChild(p3);
                ticketTitlePriceListContainer.appendChild(div);
                totalPriceSpan.innerText = (550 * ticket);
                grandTotalAmountSpan.innerText = (550 * ticket);
                checkNextBtnValidation2();

                if(ticket === 4) {
                    couponApplyBtn.removeAttribute('disabled', true);
                }
                
            }
            else {
                alert(`You can't buy ticket now!!!`);
            }
        }
        
    });
}
let number;

phoneNumber.addEventListener('blur', function(event) {
    number = e.target.value;
    checkNextBtnValidation1(number.trim());
});

function checkNextBtnValidation2() {
    let num = phoneNumber.value.trim();
    if(num !== '') {
        btnNext.removeAttribute('disabled', true);
    }
    else {
        btnNext.setAttribute('disabled', true); 
    }
}

function checkNextBtnValidation1(n) {
    if(n !== '' && ticket > 0) {
        btnNext.removeAttribute('disabled', true);
    }
    else {
        btnNext.setAttribute('disabled', true); 
    }
}

btnNext.addEventListener('click', function() {
    screenBlack.classList.remove('hidden');
    popUp.classList.remove('hidden');
});


closePopUpBtn.addEventListener('click', function() {
    screenBlack.classList.add('hidden');
    popUp.classList.add('hidden');
});


couponApplyBtn.addEventListener('click', function() {
    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between');
    const p1 = document.createElement('p');
    p1.innerText = 'Total Discount';
    div.appendChild(p1);
    const p2 = document.createElement('p');
    

    const couponText = couponBox.value.trim();
    if(couponText === 'Couple 20') {
        p2.innerText = 'BDT ' + (parseInt(totalPriceSpan.innerText) * 20) / 100 ;
        div.appendChild(p2);
        discountMsgContainer.appendChild(div);
        grandTotalAmountSpan.innerText =parseInt(totalPriceSpan.innerText) - (parseInt(totalPriceSpan.innerText) * 20) / 100;
        couponContainer.classList.add('hidden');
    }
    
    else if(couponText === 'NEW15') {
        p2.innerText = (parseInt(totalPriceSpan.innerText) * 15) / 100 + ' BDT';
        div.appendChild(p2);
        discountMsgContainer.appendChild(div);
        grandTotalAmountSpan.innerText =parseInt(totalPriceSpan.innerText) - (parseInt(totalPriceSpan.innerText) * 15) / 100;
        couponContainer.classList.add('hidden');
    }
    else {
        grandTotalAmountSpan.innerText = parseInt(totalPriceSpan.innerText);
        couponBox.value = '';
        alert('Enter a valid coupon code.');
    }
});