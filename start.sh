echo "ASIKUS";
echo "For MySQL connect need";

read -p "Enter host [localhost]: " host;
read -p "Enter database [asikusdb]: " dbname;
read -p "Enter root [root]: " user;
read -p "Enter port[3306]: " port;

host=${host:-localhost}
dbname=${dbname:-asikusdb}
user=${user:-root}
port=${port:-3306}

mysql 

read "hello";