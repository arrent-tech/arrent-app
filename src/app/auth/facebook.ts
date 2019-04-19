export class Facebook {
  private FB;

  getApi(): Promise<any> {
    return new Promise(resolve => {
      if (this.FB) {
        return resolve(this.FB);
      }
      (window as any).fbAsyncInit = () => {
        this.FB = (window as any).FB;
        resolve(this.FB);
      };

      const SDK = document.createElement('script');
      SDK.id = 'facebook-jssdk';
      SDK.src = 'https://connect.facebook.net/en_US/sdk.js';
      document.body.appendChild(SDK);
    });
  }

  async init(args) {
    const FB = await this.getApi();
    FB.init(args);
  }

  async login(args) {
    const FB = await this.getApi();
    return await new Promise(resolve => {
      FB.login(resolve, args);
    });
  }

  async api(path) {
    const FB = await this.getApi();
    return await new Promise(resolve => {
      FB.api(path, resolve);
    });
  }
}
