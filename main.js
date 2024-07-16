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
const answerContainer = document.querySelector('.answer_container')

const fields = [
  { element: mortgageAmount, errorId: 'amount_error', symbolId: 'amount_symbol' },
  { element: mortgageTerm, errorId: 'term_error', symbolId: 'term_symbol' },
  { element: interestRate, errorId: 'rate_error', symbolId: 'rate_symbol' },
];

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const amount = parseFloat(form.elements.amount.value);
  const term = parseInt(form.elements.term.value);
  const rate = parseFloat(form.elements.rate.value);

  fields.forEach(({ element, errorId, symbolId }) => {
    if (!element.value) {
      document.getElementById(errorId).style.display = 'block';
      element.classList.add('input_error');
      document.getElementById(symbolId).classList.add('side_indicator_error');
      return;
    } else {
      document.getElementById(errorId).style.display = 'none';
      element.classList.remove('input_error');
      document.getElementById(symbolId).classList.remove('side_indicator_error');
    }
  });

  const isMortgageTypeChecked = Array.from(mortgageTypes).some(radio => radio.checked);

  if (!isMortgageTypeChecked) {
    document.getElementById('type_error').style.display = 'block';
    document
      .querySelectorAll('.input_wrapper')
      .forEach(item => (item.style.borderColor = 'hsl(4, 69%, 50%)'));
    return;
  } else {
    document.getElementById('type_error').style.display = 'none';
    document
      .querySelectorAll('.input_wrapper')
      .forEach(item => (item.style.borderColor = 'hsl(200, 24%, 40%)'));
  }

  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const totalPayment = (monthlyPayment * term).toFixed(2);
  console.log(totalPayment);

  answerContainer.innerHTML = `
  <div class="valid_answer">
  <h2>Your result</h2>
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
}
