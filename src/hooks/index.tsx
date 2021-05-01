import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { AuthContextDTO } from '../libs/AuthContextDTO';

export function useAuth(): AuthContextDTO {
  const context = useContext(AuthContext);

  return context;
}
