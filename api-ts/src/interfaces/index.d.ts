export interface OwnerProps {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AnimalProps {
  id?: number;
  picture: string;
  name: string;
  age: number;
  info: string;
  city: string;
  uf: string;
  status: number;
  ownerId: OwnerProps['id'];
}

export interface CommuniqueProps {
  name: string;
  phone: string;
  info: string;
  animalId: AnimalProps['id'];
}

export interface OwnerAnimalsProps extends AnimalProps {
  communiques: CommuniqueProps[];
}
