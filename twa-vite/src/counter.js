export function setupCounter(element) {
  let counter = 10
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
    // mostrar o valor no título do separador
    document.title = `Contador: ${counter}`
  }
  // contar para baixo
  element.addEventListener('click', () => setCounter(counter - 1))
  setCounter(10)
}
