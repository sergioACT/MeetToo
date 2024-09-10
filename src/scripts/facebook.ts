import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';

export class Facebook {
  async loginWithFacebook() {
    const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];

    // Iniciar sesión en Facebook
    const result: FacebookLoginResponse = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

    if (result.accessToken) {
      // Usuario ha iniciado sesión correctamente
      console.log('Access Token: ', result.accessToken.token);

      // Obtener la información del perfil del usuario
      const userProfile = await FacebookLogin.getProfile({ fields: ['email', 'name', 'picture'] });
      console.log('Perfil del Usuario: ', userProfile);
    } else {
      // Usuario canceló o no pudo iniciar sesión
      console.log('Login cancelado o fallido');
    }
  }
}
