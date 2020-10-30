import React, { useEffect, useState } from 'react';

// api
import { api } from '../../services/api';

// imagens
import MaleDummy from '../../assets/img/dummys/male.png';
import FemaleDummy from '../../assets/img/dummys/female.png';
import ProfileLink from '../../components/ProfileLink';

// icones
import { AiOutlineWarning } from 'react-icons/ai';
import LazyCard from '../LazyCard';

function ProfilesList({ friend }) {

  const [users, setUsers] = useState([]);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`?acao=retornaUsuariosJSON`)
      .then(response => {
        let usersArray = response.data.dados;
        if (usersArray) {
          setUsers(usersArray);
          setError(false);
          setLoading(false);
        } else {
          setUsers(null);
          setError(true);
          setLoading(false);
        }
      }).catch(error => {
        console.warn(error);
        setError(true);
        setLoading(false);
      })
  }, []);

  return (
    <div className="users-list">
      {loading && <>
        <LazyCard loaders={8}></LazyCard>
      </>}
      {error &&
        <><div className="main-card-error">
          <AiOutlineWarning className="svg-icon" />
          <p className="text">
            Ocorreu um erro ao carregar seus amigos
          </p>
        </div></>}
      {users &&
        <> {users.map(user => (
          <ProfileLink
            key={user.cdusuario}
            cdusuario={user.cdusuario}
            className={`profile-card ${user.cdusuario !== friend.cdusuario || '-active'}`}>
            <div className="user-thumbnail">
              <img
                src={user.txfoto1}
                onError={(e) => user.txsexo === "masculino"
                  ? e.target.src = MaleDummy
                  : e.target.src = FemaleDummy}
                alt={user.txnome}
                className="image-fluid" />
            </div>
            <div className="user-descript">
              <p className="_text-truncate typo-fw-bold typo-body-2 typo-formal typo-color-dark-secondary">
                {user.txnome}
              </p>
            </div>
          </ProfileLink>
        ))}
        </>
      }
    </div>
  );
}

export default ProfilesList;