const amountChecked = document.getElementById('100');

const smallDevice = window.matchMedia("(max-width: 900px)");

smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) amountChecked.checked = true;
}

// Run it initially
handleDeviceChange(smallDevice);