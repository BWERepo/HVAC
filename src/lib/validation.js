/**
 * Shared field validation for both lead capture surfaces (the main form and
 * the mobile schedule sheet), so the two can never drift apart.
 *
 * Messages state the cause AND the fix, per the project's form standards —
 * "Invalid input" is never an acceptable error string.
 */

const rules = {
  name: (v) => {
    if (!v.trim()) return 'Please enter your name so we know who to ask for.'
    if (v.trim().length < 2) return 'That looks too short — please enter your full name.'
    return null
  },

  phone: (v) => {
    const digits = v.replace(/\D/g, '')
    if (!digits) return 'Please enter a phone number we can reach you on.'
    if (digits.length < 10) return 'A phone number needs 10 digits — please check and try again.'
    return null
  },

  email: (v) => {
    if (!v.trim()) return 'Please enter an email address.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
      return 'That address is missing something — check for a typo around the @ or the domain.'
    return null
  },

  zip: (v) => {
    const digits = v.replace(/\D/g, '')
    if (!digits) return 'Please enter your ZIP code so we can confirm we cover your area.'
    if (digits.length !== 5) return 'A ZIP code is 5 digits — please check and try again.'
    return null
  },

  help: (v) => (v ? null : 'Please choose what you need help with.'),
  need: (v) => (v ? null : 'Please choose what you need help with.'),
  timing: (v) => (v ? null : 'Please choose when you would like us to come out.'),
  contact: (v) => (v ? null : 'Please choose how you would like us to reach you.'),
}

export function validateField(field, value) {
  return rules[field] ? rules[field](value ?? '') : null
}

/** Returns an object of field → message for every invalid field. */
export function validateAll(values, fields) {
  const errors = {}
  fields.forEach((field) => {
    const message = validateField(field, values[field])
    if (message) errors[field] = message
  })
  return errors
}

/** Formats digits as the user types: (555) 555-0142 */
export function formatPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}
