# Deployment Steps:
    1) Create an AWS Account
        Root Email: sadcat2.cdr@gmail.com
        root password: rootOFsd@aws0225
        Kotak Credit Card Used
        Account Name: saptakDevAccount
        Account Id: 277707129673
    2) go to EC2 Instance: (Elastic Transpute)
    3) launch an Instance
    4) choose ubantu instance 
    5) free tier t2.micro
    6) use key pair login (RSA & .pem)
    7) kepp other as default
    8) click on launch instance
    9) wait for Instance Status & Status Check
    10) click on the instance Id
    11) click on connect
    12) choose SSH client
    13) use git bash for run ubuntu
    13) use command:  chmod 400 "devTinder-serect.pem"
    14) then use command to login(change the IP accordingly): 
            ssh -i "devTinder-serect.pem" ubuntu@ec2-13-201-190-226.ap-south-1.compute.amazonaws.com
    15) install node in ubuntu same version( V - 22.12) via curl 
        -> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

    https://nodejs.org/en/download

    16) install same node version as local (22.12.0)
        
        command: nvm install 22.12.0
    17) clone the git-repo of both frontend & backend via git link
        command: git clone https://github.com/SaptakGit/devTinder-web.git
                 git clone https://github.com/SaptakGit/devTinder-web.git
    18) Deploying frontend 
    19) build the project local machine
        command: npm run build
    20) build the project in AWS
        Steps:
          a) cd devTinder-web
          b) npm install
          c) npm run build
          d) install NGINX
                sudo apt update
                sudo apt install nginx
                sudo systemctl start nginx (to start nginx)
                sudo systemctl enable nginx
          e) Copy code from dist(build files) to var/www/html/
             command: sudo scp -r dist/* /var/www/html/
          d) NGINX default port is 80, we have to enable it of out instance from security group

    21) Deploying Backend
        Steps
            a) cd devTinder-server
            b) npm install
            d) update DB Password (Optional)
            e) go to MongoDB database and allow access
                => Network Access
                => set the IP for specific system to access
                0.0.0.0/0 => bad practice
            f) set security Group Permission for backend port 7777 also in AWS
            g) use pm2 process manager to run the server in backend forever
               command: npm install pm2 -g
            h) to run the 'npm start' in the background forever via pm2
                command: pm2 start npm -- start
            i) to check the pm2 log for issue and status
                command: pm2 logs
                other IMP Commands:
                pm2 list   -----------------> Shows Process List
                pm2 flush <name> -----------------> 
                pm2 stop <name> -----------------> Stop Process
                pm2 delete <name> -----------------> Delete Process
                ** here name = npm

                To rename the pm2's name: 
                pm2 start --name "devtinder-backend" -- start
            j) frontend = http://3.110.101.211
                backend = http://3.110.101.211:7777

                Domain name = devtinder.com => 3.110.101.211

                Frontend = devtinder.com
                Backend = devtinder.com:7777 => devtinder.com/api

                to replace the port 7777 with /api we will use NGNIX proxy_pass. 
                So basically we have to proxy pass /api to 7777. So any body waite /api it should map it to 7777. For
                that we nned to put some configuration in ngnix config.

                NGNIX Config File:
                    File path => sudo nano /etc/nginx/sites-available/default

                    Config change:
                        server_name 3.110.101.211;

                        location /api/ {
                            proxy_pass http://localhost:7777/;
                            proxy_http_version 1.1;
                            proxy_set_header Upgrade $http_upgrade;
                            proxy_set_header Connection 'upgrade';
                            proxy_set_header Host $host;
                            proxy_cache_bypass $http_upgrade;
                        }

                        CTRL+O -> save nano
                        CTRL+X -> exit nano

            k) restart nginx -> sudo systemctl restart nginx
            l) Modify the BASE_URL in frontend project to /api and push to github
            m) go to devTinder-web & make a pull request
            n) again make a build
            o) copy the latest build from git to our Ec2 /var/www/html

        22) Attach A Domain
            a) go to godaddy & login
            b) search the domain name
            c) Purchase a domain
            d)  go to my products
            e) in product list choose your domain and click on DNS

        23) To manage our domain and also get a ssl certificate we will use CloudFlare.
            a) Go to cloudflare and create an account.
            b) search your domain and choose free plan & countinue.
            c) get the name servers from CloudFlare by clicking 'continue to activation'
            d) change the name servers in godaddy with the CloudFlare nameservers
            e) wait untill the change reflacts on CloudFlare dashboard.
            f) after activation change the DNS records.
                *) keep only one A Record and change its IP to our IP
            g) go to SSL/TLS in CloudFlare
                *) SSL/TLS --> Overview --> click configure --> Custom SSL/TLS --> choose Flexible --> save
                *) got to Edge Cretificate --> keep 'Automatic HTTPS Rewrites' on



        



        

                    

                    




