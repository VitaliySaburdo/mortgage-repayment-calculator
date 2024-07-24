const form = document.querySelector('form');
const inputs = document.querySelectorAll('input[type="number"]');
const inputsSymbol = document.querySelectorAll('.side_indicator');
const mortgageAmount = document.getElementById('amount');
const mortgageTerm = document.getElementById('term');
const interestRate = document.getElementById('rate');
const mortgageTypes = document.querySelectorAll('input[name="mortgage-type"]');
const calculateBtn = document.getElementById('btn');
const errorMessage = document.querySelectorAll('.error_message');
const clearAll = document.querySelector('.link');
const answerContainer = document.querySelector('.answer_container');
const emptyContainer = document.querySelector('.empty_answer');

const fields = [
  { element: mortgageAmount, errorId: 'amount_error', symbolId: 'amount_symbol' },
  { element: mortgageTerm, errorId: 'term_error', symbolId: 'term_symbol' },
  { element: interestRate, errorId: 'rate_error', symbolId: 'rate_symbol' },
];



inputs.forEach(input => {
  input.addEventListener('input', () => {

    const field = fields.find(f => f.element === input);

    if (!input.value && !'.') {
      document.getElementById(field.errorId).style.display = 'block';
      document.getElementById(field.errorId).textContent = 'Value must be a number';
      input.classList.add('input_error');
      document.getElementById(field.symbolId).classList.add('side_indicator_error');
    } else {
      document.getElementById(field.errorId).style.display = 'none';
      input.classList.remove('input_error');
      document.getElementById(field.symbolId).classList.remove('side_indicator_error');

    }
  });
});

mortgageTypes.forEach(radio => {
  radio.addEventListener('input', () => {
    if (!Array.from(mortgageTypes).some(r => r.checked)) {
      document.getElementById('type_error').style.display = 'block';
      document.querySelectorAll('.input_wrapper').forEach(item => (item.style.borderColor = 'hsl(4, 69%, 50%)'));
    } else {
      document.getElementById('type_error').style.display = 'none';
      document.querySelectorAll('.input_wrapper').forEach(item => (item.style.borderColor = 'hsl(200, 24%, 40%)'));

    }
  });
});

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const amount = parseFloat(form.elements.amount.value);
  const term = parseInt(form.elements.term.value);
  const rate = parseFloat(form.elements.rate.value);

  let isValid = false;

  fields.forEach(({ element, errorId, symbolId }) => {
    if (!element.value || !parseFloat(element.value)) {
      document.getElementById(errorId).style.display = 'block';
      document.getElementById(errorId).textContent = 'This field is required';
      element.classList.add('input_error');
      document.getElementById(symbolId).classList.add('side_indicator_error');
      isValid = false;
    } else {
      document.getElementById(errorId).style.display = 'none';
      element.classList.remove('input_error');
      document.getElementById(symbolId).classList.remove('side_indicator_error');
      isValid = true;
    }
  });

  const isMortgageTypeChecked = Array.from(mortgageTypes).some(radio => radio.checked);

  if (!isMortgageTypeChecked) {
    document.getElementById('type_error').style.display = 'block';
    document
      .querySelectorAll('.input_wrapper')
      .forEach(item => (item.style.borderColor = 'hsl(4, 69%, 50%)'));
    isValid = false;
  } else {
    document.getElementById('type_error').style.display = 'none';
    document
      .querySelectorAll('.input_wrapper')
      .forEach(item => (item.style.borderColor = 'hsl(200, 24%, 40%)'));
    isValid = true;
  }

  if (isValid) {
    renderResult(amount, term, rate);
  }

}

function renderResult(amount, term, rate){
  const termInMonths = term * 12;
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths));
  const totalPayment = monthlyPayment * termInMonths;

  function ResultNumberToString(result){
    let str = String(result.toFixed(2));
    let strArray = str.split("");
    
    for (let i = strArray.length - 6; i > 0; i -= 3) {
      strArray.splice(i, 0, ",");
    }
    
   return str = strArray.join("");
  }

  answerContainer.innerHTML = `
              <div class="valid_answer">
                <h2 class="valid_title_answer">Your result</h2>
                <p class="valid_text_answer">
                  Your results are show below based on the information you provided. To adjust the
                  results, edit the form and click "calculate repayments" again.
                </p>
                <div class="valid_box_answer">
                  <p  class="valid_text_answer">Your monthly repayments</p>
                  <h2 class="valid_repayments_answer">£ ${ResultNumberToString(monthlyPayment)}</h2>
                  <div class="valid_line_answer"></div>
                  <p class="valid_text_answer">Total you'll repay over the term</p>
                  <h3 class="valid_repay_answer">£ ${ResultNumberToString(totalPayment)}</h3>
                </div>
  `
}


clearAll.addEventListener('click', onClearAll);

function onClearAll(event) {
  event.preventDefault();

  inputs.forEach(input => {
    input.value = '';
  });

  mortgageTypes.forEach(radio => {
    radio.checked = false;
  });

  fields.forEach(({ element, errorId, symbolId }) => {
    document.getElementById(errorId).style.display = 'none';
    element.classList.remove('input_error');
    document.getElementById(symbolId).classList.remove('side_indicator_error');
    document.getElementById('type_error').style.display = 'none';
    document
      .querySelectorAll('.input_wrapper')
      .forEach(item => (item.style.borderColor = 'hsl(200, 24%, 40%)'));
  });
  answerContainer.innerHTML = '';
  answerContainer.appendChild(emptyContainer);
}
