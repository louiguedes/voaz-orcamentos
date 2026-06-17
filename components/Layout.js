import { useRouter } from 'next/router'

export default function Layout({ children, propostaId }) {
  const router = useRouter()
  const path = router.pathname

  function logout() {
    sessionStorage.removeItem('voaz_auth')
    router.push('/')
  }

  const navItem = (label, href, ativo) => (
    <button
      onClick={() => router.push(href)}
      style={{
        background: ativo ? '#fff' : 'transparent',
        color: ativo ? '#111' : '#ccc',
        border: 'none',
        borderRadius: ativo ? '4px 4px 0 0' : 0,
        padding: '8px 20px',
        fontWeight: ativo ? 700 : 400,
        fontSize: 13,
        cursor: 'pointer',
        letterSpacing: 0.5,
      }}
    >{label}</button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      {/* Navbar */}
      <nav style={{ background: '#1a1a1a', padding: '0 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          {/* Logo */}
          <div style={{ marginRight: 24, paddingBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', gap: 2, border: '2px solid #fff', padding: 4, borderRadius: 3 }}>
              {['V','O','A','Z'].map(l => (
                <span key={l} style={{ fontSize: 14, fontWeight: 900, color: '#fff', lineHeight: 1, textAlign: 'center', width: 18 }}>{l}</span>
              ))}
            </div>
          </div>

          {navItem('📋 Propostas', '/historico', path === '/historico')}
          {propostaId && navItem('📝 Escopo', `/escopo?id=${propostaId}`, path === '/escopo')}
          {propostaId && navItem('💰 Proposta / PDF', `/proposta?id=${propostaId}`, path === '/proposta')}
        </div>

        <button onClick={logout} style={{ background: 'none', border: 'none', color: '#888', fontSize: 12, cursor: 'pointer', padding: '12px 0' }}>
          Sair
        </button>
      </nav>

      {/* Conteúdo */}
      <main>{children}</main>
    </div>
  )
}