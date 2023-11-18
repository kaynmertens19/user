import { auth, AuthOptions } from "express-oauth2-jwt-bearer";
import config from "../config/auth0";

if (!config || !config.auth0 || !config.auth0.audience || !config.auth0.issuer) {
    console.error("Auth0 Configuration:", config);
    throw new Error("Missing or incomplete Auth0 configuration.");
  }

const authOptions: AuthOptions = {
  audience: config.auth0.audience,
  issuerBaseURL: config.auth0.issuer, 
};

const checkJwtDTO = auth(authOptions);

export default checkJwtDTO;