echo "ASIKUS";
echo "For MySQL connect need";

read -p "Enter host [localhost]: " host;
read -p "Enter database [asikusdb]: " dbname;
read -p "Enter user [user]: " user;
read -s -p "Enter password: " password;
echo 
read -p "Enter port[3306]: " port;


host=${host:-localhost}
dbname=${dbname:-asikusdb}
user=${user:-user}
port=${port:-3306}
password=${password:-password}

node run.js $host $dbname $user $password $port

read "hello";