import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const { data } = await api.post('/auth/login', { email, password: senha });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao conectar com o servidor');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.forgotPassword}>
          <Link to="/forgot" style={styles.link}>
            Esqueci minha senha
          </Link>
        </div>

        <button type="submit" style={styles.button}>
          Entrar
        </button>

        <p style={styles.registerText}>
          Não tem uma conta?{' '}
          <Link to="/Register" style={styles.link}>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

// Estilos básicos inline para deixar a tela organizada sem precisar de CSS externo agora
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
    marginBottom: '1.5rem',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '1rem',
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
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '1.5rem',
    fontSize: '13px',
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
  registerText: {
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