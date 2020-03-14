import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { StyledForm, Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('E-mail é obrigatório.'),
  password: Yup.string().required('Senha é obrigatório.'),
});

export default function Sign() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="FastFeet" />

        <strong>SEU E-MAIL</strong>
        <br />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <strong>SUA SENHA</strong>
        <br />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </StyledForm>
    </Container>
  );
}
