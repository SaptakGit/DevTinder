# Amazon SES
    1) Sign in to AWS
    2) go to IAM
    3) go to Users & create a new User
        a) set User details
        b) Set permission -> attach policies directly
        c) choose policies according to SES
        d) click create User
    5) go to AWS console -> go to SES
    6) go to get setup page --> create identity --> verify by domain name
    7) in 'verifying your domain' choose Easy DKIM 
    8) add the CNAME provided by SES to the CNAME in CloudFlare, also turn-off the proxy while adding the CNAME in CloudFlare
    9) wait for approval
    10) After approval you may request for production access
    11) after that go to IAM Dashboard --> Users --> Security Credentials --> Create an Access Key --> select Other --> next --> put description --> create access key
    12) put the serect key & access key in .env in backend
    13) get the document of AWS SES node document
        a) https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_ses_code_examples.html
        b) https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
