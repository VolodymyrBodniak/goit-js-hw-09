export function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

export function setInputDisabled(isDisabled) {
  const input = document.getElementById('datetime-picker');
  input.disabled = isDisabled;
}
