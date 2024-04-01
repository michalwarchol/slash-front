export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  type: 'EDUCATOR' | 'STUDENT';
}
