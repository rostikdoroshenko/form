import {FrameworkType} from "../types/framework.type";

export interface IFramework {
  name: string;
  versions: string[];
}

export interface IDev {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  framework: FrameworkType;
  frameworkVersion: string;
  email: string;
  hobby: IHobby[];
}

export interface IHobby {
  name: string;
  duration: string;
}
