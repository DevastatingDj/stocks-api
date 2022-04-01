docker run -it -p 8000:8000 devastatingdj/stocks-api
docker build . -t devastatingdj/stocks-api
docker push devastatingdj/stocks-api
docker login

ssh -i "stocks-api-key-pair.pem" ec2-user@ec2-13-233-158-140.ap-south-1.compute.amazonaws.com