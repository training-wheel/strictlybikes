<template>
  <Page>
    <FlexboxLayout class="page">
      <StackLayout class="form" flex>
        <Image
          src="https://cdn.pixabay.com/photo/2019/04/02/21/47/cyclist-4098989_960_720.png"
        />
        <Label class="login-header" text="Scatter" />
        <TextField
          v-if="newUser"
          v-model="username"
          hint="Choose a username"
          @returnPress="onSignUp"
          returnKeyType="done"
        />
        <Button v-else text="Login" @tap="onLoginTap" class="button-blue" />
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>




<script>
  import { tnsOauthLogin } from '../../auth/auth-service';
  import * as appSettings from 'tns-core-modules/application-settings';
  import { SERVER_BASE_URL } from '../../config';
  import axios from 'axios';

  export default {
    methods: {
      onLoginTap() {
        tnsOauthLogin('google', (response) => {
          const { token, accessToken } = response.data;
          if (token) {
            appSettings.setString("jwt", token);
            this.$goto('Home');
          } else {
            this.accessToken = accessToken;
            this.newUser = true;
          }
        });
      },
      onSignUp() {
        const { accessToken, username } = this;
        axios.post(`${SERVER_BASE_URL}/signup`, { accessToken, username })
          .then((response) => {
            const token = response.data;
            appSettings.setString("jwt", token);
            this.$goto('Home');
          })
          .catch((err) => {
            console.error(`Failed to signup: ${err}`)
          });
      }
    },
    data: () => {
        return {
            accessToken: '',
            username: '',
            newUser: false,
        }
    },
  }
</script>

<style lang="scss" scoped>
@import "app/app.scss";
.page {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 200;
  font-weight: bold;
}



.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input-field .input {
  font-size: 54;
}



.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>