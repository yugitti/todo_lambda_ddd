import * as aws from 'aws-sdk';

aws.config.update({ region: 'ap-northeast-1' });
if (process.env.NODE_ENV == 'local') {
  const credential = new aws.SharedIniFileCredentials({ profile: 'spotdev2' });
  aws.config.update({ credentials: credential });
}

export const AWS = aws;
