export interface PostsObject {
    _id: string;
    title: string;
    description: string;
    image: string;
    short_desc: string;
  }

  export interface PostUserData {
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    skills: string[];
    agreeTerms: boolean;
  }

  // types.ts
export interface UserFormData {
  firstName: string;
  lastName: string;
  age: number;
  sex: "male" | "female" | "other";
  skills: string[];
  agreeTerms: boolean;
}

export type AgeOptions = {
  value: number;
  label: string;
};


