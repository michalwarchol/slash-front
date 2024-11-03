export enum EUserTypes {
  STUDENT = "STUDENT",
  EDUCATOR = "EDUCATOR",
}

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  type: EUserTypes;
  isVerified: boolean;
};
