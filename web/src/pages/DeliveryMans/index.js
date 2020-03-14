import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdRefresh,
} from 'react-icons/md';

import {
  Container,
  StyledLink,
  ActionButton,
  ContextMenu,
  Button,
  BodyContent,
} from './styles';

import api from '~/services/api';

import history from '~/services/history';

export default function DeliveryMans() {
  const [page, setPage] = useState(1);
  const [deliverymans, setDeliverymans] = useState([]);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadDeliverymans() {
      const response = await api.get('deliverymans', {
        params: { page, q },
      });

      const data = response.data.rows.map(s => {
        return {
          ...s,
          avatarUrl: s.avatar
            ? s.avatar.url
            : `https://avatar.oxro.io/avatar?name=${s.name}`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setDeliverymans(data);
    }
    loadDeliverymans();
  }, [page, q, reg]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(id) {
    if (window.confirm('Deseja excluir esta entregador?') === true) {
      try {
        const response = await api.delete(`deliverymans/${id}`);

        if (response.data.error) {
          throw response.data;
        }

        setDeliverymans(deliverymans.filter(d => d.id !== id));

        toast.success('O entregador foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.error);
      }
    }
  }

  function handleVisible(deliveryman) {
    if (deliveryman === visible) {
      setVisible(0);
      return;
    }
    setVisible(deliveryman);
  }

  return (
    <Container>
      <header>
        <p>Gerenciando entregadores</p>
      </header>
      <div>
        <div className="search">
          <MdSearch size={20} color="#999999" />

          <Input
            name="search"
            type="text"
            placeholder="Buscar por entregadores"
            value={q}
            onChange={e => [setQ(e.target.value), setPage(1)]}
          />
        </div>

        <StyledLink to="/deliverymans/edit" type="button">
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </StyledLink>
      </div>

      <BodyContent visible={loading}>
        <div className="loadingIndicator">
          <MdRefresh size={100} color="#7d40e7" />
        </div>

        <div className="table">
          <div className="line lineTitle">
            <div className="tabTitle">ID</div>
            <div className="tabTitle">Foto</div>
            <div className="tabTitle">Nome</div>
            <div className="tabTitle">Email</div>
            <div className="tabTitle">Ações</div>
          </div>

          {reg !== 0 ? (
            ''
          ) : (
            <span className="noData">Não encontramos nenhum entregador.</span>
          )}

          {deliverymans.map(deliveryman => (
            <div key={deliveryman.id} className="line">
              <div className="tabTitle">#{deliveryman.id}</div>
              <div className="tabTitle">
                <img src={deliveryman.avatarUrl} alt="avatar" />
              </div>
              <div className="tabTitle">{deliveryman.name}</div>
              <div className="tabTitle">{deliveryman.email}</div>

              <div className="tabTitle">
                <ActionButton
                  focusOut={() => handleVisible(deliveryman.id)}
                  onClick={() => handleVisible(deliveryman.id)}
                >
                  {deliveryman.id === visible ? ' X' : '...'}
                </ActionButton>
                <ContextMenu
                  visible={visible === deliveryman.id}
                  className={deliveryman.id}
                >
                  <ul>
                    <li>
                      {' '}
                      <MdEdit size={20} color="#4D85EE" />{' '}
                      <button
                        type="button"
                        onClick={() =>
                          history.push(`/deliverymans/edit/${deliveryman.id}`, {
                            deliveryman,
                          })
                        }
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      {' '}
                      <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                      <button
                        type="button"
                        onClick={() => handleDelete(deliveryman.id)}
                      >
                        Excluir
                      </button>
                    </li>
                  </ul>
                </ContextMenu>
              </div>
            </div>
          ))}
        </div>
      </BodyContent>

      <footer>
        <Button type="button" onClick={handlePrevPage} disabled={page === 1}>
          Página anterior
        </Button>
        <Button
          type="button"
          onClick={handleNextPage}
          disabled={
            (page !== 1 && reg / 4 <= page) ||
            (page === 1 && deliverymans.length < 4) ||
            (q !== '' && reg === 4) ||
            reg === 4
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
