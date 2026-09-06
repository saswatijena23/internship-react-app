import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  const title = mode === 'login' ? 'Login' : 'Create Account'
  const submitLabel = loading
    ? 'Please wait...'
    : mode === 'login'
      ? 'Login'
      : 'Create Account'
  const switchLabel =
    mode === 'login'
      ? 'Need an account? Create Account'
      : 'Already have an account? Login'

  return (
    <main className="auth">
      <form
        className="auth__form"
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit()
        }}
      >
        <h1 className="auth__title">{title}</h1>

        <label className="auth__field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="auth__field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
            required
          />
        </label>

        {error && <p className="auth__error">{error}</p>}

        <button className="auth__submit" type="submit" disabled={loading}>
          {submitLabel}
        </button>

        <button
          className="auth__toggle"
          type="button"
          onClick={toggleMode}
          disabled={loading}
        >
          {switchLabel}
        </button>
      </form>
    </main>
  )
}

export default AuthView
