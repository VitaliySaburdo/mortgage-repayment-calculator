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

  if (!amount || !term || !rate || !mortgageType.checked) {
    inputs.forEach(item => (item.style.borderColor = 'hsl(4, 69%, 50%)'));
    errorMessage.forEach(item => (item.style.display = 'block'));
    inputsSymbol.forEach(item => {
      item.style.backgroundColor = 'hsl(4, 69%, 50%)';
      item.style.color = 'hsl(0, 0%, 100%)';
    });
    //   errorMessage.style.display = 'block';
    //   mortgageAmount.style.borderColor = 'hsl(4, 69%, 50%)'
    return;
  }

  console.log(amount);

  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const totalPayment = monthlyPayment * term;
}
