import {IFramework} from "../interfaces/form";
import {FrameworkType} from "../types/framework.type";

export const TAKEN_EMAIL = 'test@test.test';
export const HOBBY = 'hobby';
export const FRAMEWORK_VERSION = 'frameworkVersion';
export const DATE_OF_BIRTH = 'dateOfBirth';
export const FRAMEWORK = 'framework';
export const EMAIL = 'email';
export const FIRST_NAME = 'firstName';
export const LAST_NAME = 'lastName';
export const HOBBY_NAME = 'name';
export const HOBBY_DURATION = 'duration';
export const EMAIL_ERROR = 'emailExists';

export const FRAMEWORKS: IFramework[] = [
  {
    name: FrameworkType.ANGULAR,
    versions: ['1.1.1', '1.2.1', '1.3.3'],
  },
  {
    name: FrameworkType.REACT,
    versions: ['2.1.2', '3.2.4', '4.3.1'],
  },
  {
    name: FrameworkType.VUE,
    versions: ['3.3.1', '5.2.1', '5.1.3'],
  }
];
