import * as Parse from 'parse';

export interface UserModel {
  username: string;
  name: string;
  email: string;
  phone: string;
  privateData: UserDataModel;
}

export interface UserDataModel {
  fullName: string;
}

export interface UserRegisterRequest {
  fullName: string;
  password: string;
  email: string;
  phone: string;
}

export class UserData extends Parse.Object {
  constructor() {
    super('UserData');
  }
}
