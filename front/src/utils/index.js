const getAnimalStatus = (status) => {
  if (status === 0) return 'Perdido';
  if (status === 1) return 'Comunicado';
  if (status === 2) return 'Encontrado';

  return '';
};

export default getAnimalStatus;
