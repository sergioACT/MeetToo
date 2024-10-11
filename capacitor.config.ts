import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MeetTooV2',
  webDir: 'www',
  plugins:{
    FacebookLogin:{
      appId: "1422381325105012",
      permissions: ["email", "public_profile"]
    }
  },
  server: {
    url: 'https://meettoo-cb9c9.web.app/register', // Cambia esta URL si es necesario
    cleartext: true
  }
};

export default config;
