export type User = {
  id: number;
  username: string;
  password?: string;
  role?: UserRole;
};

export enum UserRole {
  TENANT = "Tenant",
  PM = "Property Manager",
}
