import React, { useState, useCallback } from 'react';

// Componentes
import TextField from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Warningbox from '../../components/Warningbox';


// Icones
import { AiOutlineWarning } from 'react-icons/ai';

// Apis
import axios from 'axios';
import qs from 'qs';

import { useAuth } from '../../hooks/auth';

function Login() {

  const { login } = useAuth();

  const [form, setForm] = useState({
    login: '',
    ErroLogin: false,
    senha: '',
    ErrorSenha: false,
    ErroResponse: false,
  });

  const [sysLogado, setSysLogado] = useState(false);

  const [{ icon, status, title, message }, setMessage] = useState({
    icon: <AiOutlineWarning />,
    message: 'Mensagem',
    status: 'info',
    title: 'Titulo',
  })

  const handleChange = useCallback(({ target }) => {
    setForm(state => ({ ...state, [target.name]: target.value }))
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    setForm(state => ({ ...state, ErroLogin: false, ErrorSenha: false, ErroResponse: false }));
    if (!form.login) {
      setMessage(state => ({
        ...state,
        message: 'Voce precisa inserir seu email',
        icon: <AiOutlineWarning />,
        title: 'Opa!',
        status: 'error'
      }));
      setForm(state => ({ ...state, ErroLogin: true, ErrorSenha: false }));
      setTimeout(() => {
        setForm(state => ({ ...state, ErrorSenha: false, ErroLogin: false }));
      }, 6000);
      return;
    } else if (!form.senha) {
      setMessage(state => ({
        ...state,
        message: 'Voce precisa informar sua senha',
        icon: <AiOutlineWarning />,
        title: 'Opa!',
        status: 'error'
      }));
      setForm(state => ({ ...state, ErroLogin: false, ErrorSenha: true }));
      setTimeout(() => {
        setForm(state => ({ ...state, ErrorSenha: false, ErroLogin: false }));
      }, 6000);
      return;
    }

    try {
      const response = await axios({
        method: 'post',
        url: 'https://admin.kozinhar.com/gera-json.php',
        data: qs.stringify({
          acao: 'realizarLogin',
          txemail: form.login,
          txsenha: form.senha,
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      if (response.data.retorno === 'erro') {
        setForm(state => ({ ...state, ErroResponse: true }));
        setMessage(state => ({
          ...state,
          message: 'A senha ou o login inseridos estão errados',
          icon: <AiOutlineWarning />,
          title: 'Vixe!',
          status: 'error'
        }));
        return;
      }

      let sysUser = response.data.dados.cdusuario;
      login(sysUser);


    } catch (error) {
      console.log(error);
      setForm(state => ({ ...state, ErroResponse: true }));
      setMessage(state => ({
        ...state,
        message: 'Ocorreu um erro ao realizar o login',
        icon: <AiOutlineWarning />,
        title: 'Vixe!',
        status: 'error'
      }));
    }

  }
  return (
    <section className="login-section">
      {(form.ErroLogin || form.ErrorSenha || form.ErroResponse) &&
        <Warningbox icon={icon} status={status} title={title} message={message} />
      }
      <div className="login-container">
        <div className="container-header">
          <h3 className="title typo-display-1 typo-color-primary typo-fw-bold">
            Seja bem vindo
          </h3>
        </div>
        <form className="main-form grid-component -fr-1 -xl-row-gap" method="post" onSubmit={handleLogin}>
          <TextField onChange={handleChange}
            label={'Email de acesso'}
            value={form.login}
            id={"txname"}
            name={'login'}
            type={"email"}
            className={`input ${form.login && "-used"} ${form.ErroLogin && "-error"}`}
            grid={'grid-card'} />
          <TextField onChange={handleChange}
            label={'Senha de acesso'}
            value={form.senha}
            id={"txsenha"}
            name={'senha'}
            type={"password"}
            className={`input ${form.senha && "-used"} ${form.ErrorSenha && "-error"}`}
            grid={'grid-card'} />
          <div className="grid-card _d-flex _al-center _jc-between">
            <Checkbox label="Manter conectado" onChange={() => setSysLogado(!sysLogado)} />
            <button type="submit" className="main-button">
              <div className="text">
                Entrar
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;