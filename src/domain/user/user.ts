export interface UserResponse {
  identifier: number;
  name: string;
  createUpdateDateTimeInfo: {
    createdAt: Date;
    updatedAt: Date;
  }
}

export interface UserCreate {
  name: string;
}