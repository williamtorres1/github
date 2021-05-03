export interface User {
  id: number;
  username: string;
  name: string | null;
  avatar: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  biography: string | null;
  twitter: string | null;
  repositories: string;
  public_repositories_number: number;
  private_repositories_number: number | undefined;
  stars: string;
}
