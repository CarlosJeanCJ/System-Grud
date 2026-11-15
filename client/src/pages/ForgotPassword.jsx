import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState('');

  const enviarCodigo = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/auth/forgot', { email });
      setEtapa(2);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao conectar com o servidor');
    }
  };

  const redefinir = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/auth/reset', { email, code: codigo, newPassword: novaSenha });
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao conectar com o servidor');
    }
  };
  return (
    <div style={styles.container}>
      <form onSubmit={etapa === 1 ? enviarCodigo : redefinir} style={styles.form}>
        <h2 style={styles.title}>Recuperar Senha</h2>

        {erro && <p style={{ color: '#d93025', fontSize: '14px', marginBottom: '1rem' }}>{erro}</p>}

        {etapa === 1 ? (
          <>
            <p style={styles.description}>
              Informe seu e-mail e enviaremos um código para redefinir a senha.
            </p>
            <div style={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" value={email} required
                onChange={(e) => setEmail(e.target.value)} style={styles.input} />
            </div>
            <button type="submit" style={styles.button}>Enviar código</button>
          </>
        ) : (
          <>
            <p style={styles.description}>
              Se o e-mail estiver cadastrado, enviamos um código de 6 dígitos (válido por 15 minutos).
            </p>
            <div style={styles.inputGroup}>
              <label htmlFor="codigo">Código</label>
              <input id="codigo" type="text" value={codigo} required maxLength={6}
                onChange={(e) => setCodigo(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="novaSenha">Nova senha</label>
              <input id="novaSenha" type="password" value={novaSenha} required
                onChange={(e) => setNovaSenha(e.target.value)} style={styles.input} />
            </div>
            <button type="submit" style={styles.button}>Redefinir senha</button>
          </>
        )}

        <p style={styles.backText}>
          Lembrou a senha? <Link to="/login" style={styles.link}>Voltar para o login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    fontFamily: 'sans-serif',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '360px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '1.5rem',
    lineHeight: '1.4',
  },
  inputGroup: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginTop: '4px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  successBox: {
    backgroundColor: '#e6f4ea',
    border: '1px solid #ceead6',
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  successText: {
    color: '#137333',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.4',
    textAlign: 'center',
  },
  backText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};