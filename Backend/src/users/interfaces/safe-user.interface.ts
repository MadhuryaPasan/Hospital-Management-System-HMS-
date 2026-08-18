import { Role } from 'src/common/enums/role.enum';

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
