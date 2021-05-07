import { createInterface } from 'readline'
import { writeFile } from 'fs'

const abortControl = new AbortController()
const signal = abortControl.signal

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'hdtn> '
})

signal.addEventListener('abort', () => {
  console.log('Closing, you pressed Q or unsupported option')
  rl.close()
}, { once: true })

function ord_suffix (i) {
  const j = i % 10
  const k = i % 100
  if (j == 1 && k != 11) {
    return i + 'st'
  }
  if (j == 2 && k != 12) {
    return i + 'nd'
  }
  if (j == 3 && k != 13) {
    return i + 'rd'
  }
  return i + 'th'
}

rl.question('Choose your option: (1, 2 or Q to quit) ', { signal }, opt => {
  switch (opt) {
    case 'Q':
      abortControl.abort()
      break
    case '1':
      firstOption()
      break
    case '2':
      console.log('2')
      secondOption()
      break
    default:
      abortControl.abort()
  }
})

const firstOption = () => {
  rl.question('Please enter the ordinal ', { signal }, opt => {
    const int = parseInt(opt.trim())
    let sum = 0
    const divisors = [1]
    for (let i = 1; i <= int; i++) {
      sum += i
    };
    for (let i = 2; i < sum; i++) {
      if (sum % i === 0) divisors.push(i)
    };
    divisors.push(sum)
    console.log(`${sum}: ${divisors}`)
    writeFile(`Divisors and sum of ${ord_suffix(opt)} term.txt`, `${sum}: ${divisors}`, 'utf8', (err) => {
      if (err) throw err
      console.log('The file has been saved!')
      rl.close()
    })
  })
}

const secondOption = () => {
  rl.question('Give minimum number of divisors triangle number should have? ', { signal }, opt => {
    const int = parseInt(opt.trim())
    const divisors = [1]
    function minDiv (N) {
      let i = 1
      let j = 1
      let m = 1
      for (j = i = m = 1; m - N || j - i; j > i ? i += m = j = 1 : m += !(i % ++j));
      return i
    }
    console.log(`The triangle number is ${minDiv(int)} and divisors are X`)
    writeFile(`The first triangle number ${int}.txt`, `The triangle number is ${minDiv(int)} and divisors are X`, 'utf8', (err) => {
      if (err) throw err
      console.log('The file has been saved!')
      rl.close()
    })
  })
}
