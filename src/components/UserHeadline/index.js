import React, { useState, useEffect } from 'react';

// imagens
import MaleDummy from '../../assets/img/dummys/male.png';
import FemaleDummy from '../../assets/img/dummys/female.png';

// icones
import { GiFemale, GiMale } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import { MdHourglassEmpty } from 'react-icons/md';
import { AiOutlineWarning } from 'react-icons/ai';

// Controle do usuário
import { useAuth } from '../../hooks/auth';
import { getToken } from '../../services/auths';

// api
import { api } from '../../services/api';

function UserHeadline() {

  const token = getToken();

  const { logout } = useAuth();

  const [user, setUser] = useState({});

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`?acao=retornaDadosUsuarioJSON&cdusuario=${token}`)
      .then(response => {
        let user = response.data.dados;
        if (user) {
          setUser(user);
          setError(false);
          setLoading(false);
        } else {
          setUser(null);
          setError(true);
          setLoading(false);
        }
      }).catch(error => {
        console.warn(error);
        setError(true);
        setLoading(false);
      })
  }, [token]);

  return (
    <>
      {loading && <>
        <div className="main-card-loader">
          <MdHourglassEmpty className="svg-icon" />
          <p className="loader-text">
            Carregando
            </p>
        </div></>}
      <div className="user-headline">
        {error && <>
          <div className="user-thumb-box">
            <div className="user-thumbnail">
              <AiOutlineWarning className="svg-icon" />
            </div>
            <div className="user-descript">
              <p className="_text-truncate typo-fw-bold typo-sub-heading typo-formal typo-color-primary">
                Ocorreu ao carregar os dados do perfil
              </p>
            </div>
          </div></>}
        {user && <>
          <div className="user-thumb-box">
            <div className="user-thumbnail">
              <img
                src={user.txfoto1}
                onError={(e) => user.txsexo === "masculino"
                  ? e.target.src = MaleDummy
                  : e.target.src = FemaleDummy}
                alt={user.txnome || `Nome não informado`}
                className="image-fluid" />
            </div>
            <div className="user-descript">
              <p className="_text-truncate typo-fw-bold typo-sub-heading typo-formal typo-color-primary">
                {user.txnome || `Nome não informado`}
              </p>
              <p className="_text-truncate typo-fw-bold typo-body-2 typo-color-dark-secondary _mt-xs">
                {user.txemail || `Sem email de contato`}
              </p>
            </div>
          </div>
          <div className="user-status">
            <div className="_d-flex _al-center">
              {user.txsexo === 'masculino'
                ? <GiMale className="svg-icon"></GiMale>
                : <GiFemale className="svg-icon"></GiFemale>
              }
              <p className="text typo-sub-heading typo-color-dark-secondary">
                {user.fltipo = 1
                  ? <>Cozinhando <span className="typo-color-primary">por amor</span></>
                  : <>Cozinhando <span className="typo-color-primary">pela profissão</span></>}
              </p>
            </div>
            <button onClick={() => logout()} className="dummy-logout">
              <FiLogOut className="svg-icon"></FiLogOut>
            </button>
          </div>
        </>}
      </div>
    </>
  );
}

export default UserHeadline;