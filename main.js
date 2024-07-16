const form = document.querySelector('form');
const inputs = document.querySelectorAll('input[type="number"]');
const inputsSymbol = document.querySelectorAll('.side_indicator');
const mortgageAmount = document.getElementById('amount');
const mortgageTerm = document.getElementById('term');
const interestRate = document.getElementById('rate');
const mortgageType = document.querySelector('input[name="mortgage-type"]');
const calculateBtn = document.getElementById('btn');
const errorMessage = document.querySelectorAll('.error_message');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const amount = parseFloat(form.elements.amount.value);
  const term = parseInt(form.elements.term.value);
  const rate = parseFloat(form.elements.rate.value);

  let valid = true;
  const fields = [
    { element: mortgageAmount, errorId: 'amount_error', symbolId: 'amount_symbol' },
    { element: mortgageTerm, errorId: 'term_error', symbolId: 'term_symbol' },
    { element: interestRate, errorId: 'rate_error', symbolId: 'rate_symbol' },
  ];

  fields.forEach(({ element, errorId, symbolId }) => {
    if (!element.value) {
      document.getElementById(errorId).style.display = 'block';
      element.classList.add('input_error');
      document.getElementById(symbolId).classList.add('side_indicator_error');
      valid = false;
    } else {
      document.getElementById(errorId).style.display = 'none';
      element.classList.remove('input_error');
      document.getElementById(symbolId).classList.remove('side_indicator_error');
    }
  });

    if(!mortgageType.checked) {
      document.getElementById('type_error').style.display = 'block';
      document.querySelectorAll('.input_wrapper').forEach(item => item.style.borderColor = 'hsl(4, 69%, 50%)')
    } else {
      document.getElementById('type_error').style.display = 'none';
      document.querySelectorAll('.input_wrapper').forEach(item => item.style.borderColor = 'hsl(200, 24%, 40%)');
    }

  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const totalPayment = monthlyPayment * term;
}
