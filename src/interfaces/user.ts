export interface User {
    id: String;
    first_name: String;
    last_name: String;
    nick_name: String;
    age: String;
    email: String;
    phone: String;
    photo: string;
    preferences: String; //description
    social_media: Array<social_media>;
    visible_media: Boolean;
    visible_preferences: Boolean;
    complete_profile: Boolean;
    friends: string[];
  }

  export interface social_media{
    facebook: string;
    instagram: string;
    whatsapp: string;
    x: string;
    snapchat: string;

  }