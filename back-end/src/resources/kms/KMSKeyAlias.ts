//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html
export default {
    Type : "AWS::KMS::Alias",
    Properties : {
      AliasName : "alias/jwtAuthKey-${self:provider.stage}", //human readable name for our key
      TargetKeyId : { Ref: "KMSKey" }
    }
}