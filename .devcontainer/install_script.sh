echo "Ajustando git para melhorar performance"
git config oh-my-zsh.hide-info 1
echo "Mudando para branch master"
git config --global --add safe.directory /workspace/todo
git checkout master
echo "Removendo os node_modules"
rm -rf node_modules/*
echo "Executando npm i --legacy-peer-deps --force --unsafe-perm"
npm i --legacy-peer-deps --force --unsafe-perm
echo "--> CONTAINER PRONTO PARA SER USADO <--"