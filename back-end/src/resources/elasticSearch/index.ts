//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticsearch-domain.html
export default {
    Type:"AWS::Elasticsearch::Domain",
    Properties:{
        ElasticsearchVersion: "7.4", //must specify the version, otherwise the default version will be the earliest version 1.5 which you may not want :)
        DomainName: "invoices-search-${self:provider.stage}-0",
        ElasticsearchClusterConfig: {
            InstanceCount: 1,
            ZoneAwarenessEnabled: false,
            InstanceType: "m5.large.elasticsearch"
        },
        EBSOptions: {
            EBSEnabled: true,
            Iops: 0,
            VolumeSize: 20,
            VolumeType: "gp2"
        },
        AccessPolicies: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                    AWS: {
                        "Fn::Sub": "*"
                    }
                },
                Action: [
                    "es:ESHttp*"
                ],
                //IP-based access policy
                //more on why we use this here https://aws.amazon.com/premiumsupport/knowledge-center/anonymous-not-authorized-elasticsearch/
                //https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-ac.html#es-ac-types-ip
                Condition: {
                    IpAddress: {
                        "aws:SourceIp": [ //your wifi public IPaddress or our CIDR goten from VPC for your cloud
                            "70.64.68.15" //here is public IP address for my wifi
                        ]
                    }
                },
                Resource: {
                    "Fn::Sub": "arn:aws:es:${AWS::Region}:${AWS::AccountId}:domain/invoices-search-${self:provider.stage}-0/*",
                }
              }
            ]
        }
    }
}
//Note: The configurations for this elastic search is not a production oriented configuration.
//It is a single small instance that will process all our queries. We want to minimize the cost
//by provisioning a single machine

/*
https://serverfault.com/questions/947971/how-to-pick-aws-cidr-within-the-cidr-ranges-of-vpc
https://serverfault.com/questions/1013554/cidr-is-not-within-the-cidr-ranges-of-vpc
*/