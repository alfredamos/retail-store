import Axios from "../interceptor/axios.interceptor"

export class APIAuthService<U, T> {
  constructor(public url: string) {}

  //----> This is used for both login and signup.
  loginAndSignup = async (resource: T) => {
    console.log("In login", {resource, url: this.url});
    const { data } = await Axios.post<U>(this.url, resource);

    return data;
  };

  //----> This is used for both password-change and profile-update.
  passwordAndProfileUpdate = async (resource: T) => {
    const data = await Axios.patch<U>(this.url, resource);

    return data;
  };
}