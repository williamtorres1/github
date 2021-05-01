export interface AuthContextDTO {
  signed: boolean;
  loading: boolean;
  token: string | null;
  signIn(): Promise<void>;
  signOut(): void;
}
