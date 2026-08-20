const USERS_KEY = 'real-estate-users'
const SESSION_KEY = 'real-estate-session'
const RESET_KEY = 'real-estate-reset'
const AUTH_VIEW_KEY = 'real-estate-auth-view'

const AUTH_VIEWS = new Set(['login', 'signup', 'forgot', 'reset', 'success'])

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers() {
  return readJson(USERS_KEY, [])
}

function saveUsers(users) {
  writeJson(USERS_KEY, users)
}

export function getSession() {
  return readJson(SESSION_KEY, null)
}

export function setSession(user) {
  writeJson(SESSION_KEY, { name: user.name, email: user.email })
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function registerUser({ name, email, password }) {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim().toLowerCase()
  const users = getUsers()

  if (!trimmedName || !trimmedEmail || !password) {
    return { ok: false, message: 'Please fill in all fields.' }
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' }
  }

  if (users.some((user) => user.email === trimmedEmail)) {
    return { ok: false, message: 'An account with this email already exists.' }
  }

  users.push({
    id: crypto.randomUUID(),
    name: trimmedName,
    email: trimmedEmail,
    password,
  })
  saveUsers(users)
  return { ok: true, message: 'Account created successfully.' }
}

export function loginUser({ email, password }) {
  const trimmedEmail = email.trim().toLowerCase()
  const user = getUsers().find(
    (entry) => entry.email === trimmedEmail && entry.password === password,
  )

  if (!user) {
    return { ok: false, message: 'Invalid email or password.' }
  }

  setSession({ name: user.name, email: user.email })
  return { ok: true, user: { name: user.name, email: user.email } }
}

export function requestPasswordReset(email) {
  const trimmedEmail = email.trim().toLowerCase()
  const user = getUsers().find((entry) => entry.email === trimmedEmail)

  if (!user) {
    return { ok: false, message: 'No account found with that email.' }
  }

  const token = crypto.randomUUID().slice(0, 8)
  writeJson(RESET_KEY, { email: trimmedEmail, token, createdAt: Date.now() })
  return { ok: true, message: 'Reset link generated.', token, email: trimmedEmail }
}

export function getPendingReset() {
  return readJson(RESET_KEY, null)
}

export function clearPendingReset() {
  localStorage.removeItem(RESET_KEY)
}

export function resetPassword({ email, token, password }) {
  const pending = getPendingReset()
  const trimmedEmail = email.trim().toLowerCase()

  if (!pending || pending.email !== trimmedEmail || pending.token !== token) {
    return { ok: false, message: 'Invalid or expired reset token.' }
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' }
  }

  const users = getUsers()
  const index = users.findIndex((user) => user.email === trimmedEmail)
  if (index === -1) {
    return { ok: false, message: 'Account not found.' }
  }

  users[index] = { ...users[index], password }
  saveUsers(users)
  clearPendingReset()
  return { ok: true, message: 'Password updated successfully.' }
}

export function getStoredAuthView() {
  try {
    const view = sessionStorage.getItem(AUTH_VIEW_KEY)
    if (view === 'reset' && !getPendingReset()) return 'login'
    return AUTH_VIEWS.has(view) ? view : 'login'
  } catch {
    return 'login'
  }
}

export function setStoredAuthView(view) {
  try {
    if (AUTH_VIEWS.has(view)) {
      sessionStorage.setItem(AUTH_VIEW_KEY, view)
    }
  } catch {
    // ignore storage errors
  }
}

export function getInitials(name) {
  return (name?.trim()?.[0] || 'G').toUpperCase()
}
