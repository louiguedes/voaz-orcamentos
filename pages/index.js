import { useState } from 'react'
import { useRouter } from 'next/router'

const USUARIOS = [{ login: 'VOAZ', senha: 'Vo@zer2026' }]

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  function handleLogin(e) {
    e.preventDefault()
    const ok = USUARIOS.find(u => u.login === login && u.senha === senha)
    if (ok) {
      sessionStorage.setItem('voaz_auth', '1')
      router.push('/historico')
    } else {
      setErro('Login ou senha incorretos.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 48, width: 360, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        {/* Logo VOAZ */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', gap: 4, border: '3px solid #111', padding: 8, borderRadius: 4 }}>
            {['V','O','A','Z'].map(l => (
              <span key={l} style={{ fontSize: 28, fontWeight: 900, color: '#111', lineHeight: 1, textAlign: 'center', width: 36 }}>{l}</span>
            ))}
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: '#666', letterSpacing: 2 }}>ORÇAMENTOS</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>LOGIN</label>
            <input
              className="input-field"
              value={login}
              onChange={e => setLogin(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#333', display: 'block', marginBottom: 4 }}>SENHA</label>
            <input
              type="password"
              className="input-field"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {erro && <p style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{erro}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Entrar</button>
        </form>
      </div>
    </div>
  )
}