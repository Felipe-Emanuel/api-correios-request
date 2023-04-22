export interface User {
  id: string;
  guestId: string;
  cep: string;
  city: string;
  uf: string;
  error: {
    cepError: boolean | undefined;
  }
}
