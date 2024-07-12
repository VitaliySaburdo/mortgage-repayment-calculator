const form = document.querySelector('form');
const mortgageAmount = document.getElementById('amount');
const mortgageTerm = document.getElementById('term');
const interestRate = document.getElementById('rate');
const mortgageType = document.querySelector('input[name="mortgage-type"]');
const calculateBtn = document.getElementById('btn');
const errorMessage = document.querySelector('.error_message');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const amount = parseFloat(form.elements.amount.value);
  const term = parseInt(form.elements.term.value);
  const rate = parseFloat(form.elements.rate.value);

  if (!amount || !term || !rate || !mortgageType.checked) {
    console.log('error');
    return;
  }

  console.log(amount);

  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const totalPayment = monthlyPayment * term;
}
