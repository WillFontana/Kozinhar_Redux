import React, { useState, useEffect } from "react";

// imagens
import MaleDummy from '../../assets/img/dummys/male.png';
import FemaleDummy from '../../assets/img/dummys/female.png';

import { GiFemale, GiMale } from "react-icons/gi";
import { AiOutlineWarning } from 'react-icons/ai';
import { MdHourglassEmpty } from 'react-icons/md';

// Controle do usuário
import { getToken } from '../../services/auths';
import { api } from '../../services/api';

// 1,5,6,11,14

function ProfileInfo({ friend }) {
  const idUsuario = friend.cdusuario;

  const [profile, setProfile] = useState({});

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    api.get(`?acao=retornaDadosUsuarioJSON&cdusuario=${idUsuario}`)
      .then(response => {
        let profile = response.data.dados;
        if (profile) {
          setProfile(profile);
          setError(false);
          setLoading(false);
        } else {
          setProfile(null);
          setError(true);
          setLoading(false);
        }
      }).catch(error => {
        console.warn(error);
        setError(true);
        setLoading(false);
      })
  }, [idUsuario]);

  return (
    <div className="profile-info">
      {loading &&
        <><div className="main-card-loader">
          <MdHourglassEmpty className="svg-icon" />
          <p className="loader-text">
            Carregando
        </p>
        </div></>
      }
      {error &&
        <><div className="user-headline">
          <div className="user-thumb-box">
            <div className="user-thumbnail">
              <AiOutlineWarning className="svg-icon" />
            </div>
            <div className="user-descript">
              <p className="_text-truncate typo-fw-bold typo-sub-heading typo-formal typo-color-primary">
                Ocorreu ao carregar os dados do perfil
              </p>
            </div>
          </div>
        </div></>
      }
      {profile &&
        <><div className="user-headline">
          <div className="user-thumb-box">
            <div className="user-thumbnail">
              <img
                src={profile.txfoto1}
                onError={(e) => profile.txsexo === "masculino"
                  ? e.target.src = MaleDummy
                  : e.target.src = FemaleDummy}
                alt={profile.txnome || `Nome não informado`}
                className="image-fluid" />
            </div>
            <div className="user-descript">
              <p className="_text-truncate typo-fw-bold typo-sub-heading typo-formal typo-color-primary">
                {profile.txnome || `Nome não informado`}
              </p>
              <p className="_text-truncate typo-fw-bold typo-body-2 typo-color-dark-secondary _mt-xs">
                {profile.txemail || `Sem email de contato`}
              </p>
            </div>
            <div className="_d-flex _mt-xs _al-center">
              {profile.txsexo === 'masculino'
                ? <GiMale className="svg-icon"></GiMale>
                : <GiFemale className="svg-icon"></GiFemale>
              }
              <p className="text typo-sub-heading typo-color-dark-secondary">
                {profile.fltipo = 1
                  ? <>Cozinhando <span className="typo-color-primary">por amor</span></>
                  : <>Cozinhando <span className="typo-color-primary">pela profissão</span></>}
              </p>
            </div>
          </div>
        </div>
          <div className="empty-content-box">
            <AiOutlineWarning className="svg-icon"></AiOutlineWarning>
            <h3 className="typo-sub-heading _text-center typo-color-dark-secondary typo-fw-regular">
              Nenhuma outra informação <br />
            relacionada a esse perfil.
          </h3>
          </div>
        </>}
    </div>
  );
}

export default ProfileInfo;
