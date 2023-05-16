export interface UserModel {
  name: string;
  id: number;
  firstName: string;
  lastName: string;
  imgUrl: string;
  userName: string;
  email: string;
  phone: string;
  sex: 'male' | 'female';
  birthday: string;
  lang: 'en' | 'de';
  country: string;
  city: string;
  address1: string;
  address2?: string;
  zipcode: number;
  website?: string;
  point: string;
  socials?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}
