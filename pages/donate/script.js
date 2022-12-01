const amountChecked = document.getElementById('100');
const defaultAmountChecked = document.getElementById('1000');

const smallDevice = window.matchMedia("(max-width: 900px)");

smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) amountChecked.checked = true;
  else defaultAmountChecked.checked = true;
}

// Run it initially
handleDeviceChange(smallDevice);