export type UserProfile = {
  id: UserId;
  username: string;
  displayName: string;
  bio: string | null;
  image: string | null;
};

export type UserId = number;

export type UserSession = {
  id: UserId;
};
