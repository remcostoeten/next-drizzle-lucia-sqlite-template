export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export type HeaderProps = {
  user?: User
}
