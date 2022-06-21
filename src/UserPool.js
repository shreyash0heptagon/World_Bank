import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData={
    UserPoolId: "us-west-2_BVBkxCNFC",
    ClientId:"56n8c7pua25655pou09te70flp"
}

export default new CognitoUserPool(poolData); 