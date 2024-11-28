export interface IUser {
    id: String;
    first_name: String;
    last_name: String;
    nick_name: String;
    age: String;
    email: String;
    phone: String;
    photo: string;
    preferences: String; //description
    social_media: Array<ISocial>;
    visible_media: Boolean;
    visible_preferences: Boolean;
    complete_profile: Boolean;
    friends: String[];
    latitude: number;
    longitude: number;
    full_name: string;
  }

  export interface ISocial{
    media_key:string;
    media_value: string;
  }