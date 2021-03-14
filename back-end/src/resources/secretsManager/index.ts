//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-secretsmanager-secret.html
export default {
    Type : "AWS::SecretsManager::Secret",
    Properties : {
        Description : "Jwt Auth secret",
        KmsKeyId : { Ref: "KMSKey" },
        Name : "${self:provider.environment.JWT_AUTH_SECRET_ID}",
    }
}