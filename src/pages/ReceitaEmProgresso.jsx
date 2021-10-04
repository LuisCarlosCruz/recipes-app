import React from 'react';
import InProgress from '../components/InProgress';
import useCurrentPage from '../context/hooks/useCurrentPage';

export default function ReceitaEmProgresso() {
  useCurrentPage('Em progresso');

  return (
    <div className="page">
      Receita em progresso
      <InProgress />
    </div>
  );
}
