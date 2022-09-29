const palindrome = require('../utils/for_testing').palindrome

test('palindrome of neuquen', () => {
  const result = palindrome('neuquen')

  expect(result).toBe('neuquen')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})
