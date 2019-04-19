import * as Parse from 'parse';

export interface UserModel {
  username: string;
  name: string;
  email: string;
  privateData: UserDataModel;
}

export interface UserDataModel {
  fullName: string;
}

export interface UserRegisterRequest {
  fullName: string;
  password: string;
  email: string;
}

export class UserData extends Parse.Object {
  constructor() {
    super('UserData');
  }
}
