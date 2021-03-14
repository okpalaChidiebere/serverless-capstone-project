//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html
export default {
    Type : "AWS::KMS::Key",
    Properties : {
        Description : "KMS key to encrypt JWT Auth secret",
        KeyPolicy : { //we add a KMS key tool to encrypt our jwt auth secret
            Version: "2012-10-17",
            Id: "key-default-1",
            Statement: [
                {
                    Sid: "Allow administration of the key",
                    Effect: "Allow",
                    Principal: {
                        AWS: {
                            //https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html
                            "Fn::Join": [
                                ":", 
                                [
                                    "arn:aws:iam:",
                                    {
                                        "Ref": "AWS::AccountId"
                                    },
                                    "root",
                                ]
                            ]
                        }
                    },
                    Action: "kms:*",
                    Resource: "*"
                },
            ],
        },
      }
}