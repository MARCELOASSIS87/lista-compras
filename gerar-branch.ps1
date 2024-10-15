# Obtém o nome da branch atual do Git
$branchName = git rev-parse --abbrev-ref HEAD

# Cria o conteúdo do arquivo branch.js
$branchJsContent = "export const BRANCH_NAME = '$branchName';"

# Salva o conteúdo no arquivo branch.js
Set-Content -Path "C:\Lista_Compras_System\lista-compras-app\branch.js" -Value $branchJsContent

# Exibe uma mensagem indicando que o arquivo foi gerado com sucesso
Write-Host "Arquivo branch.js gerado com a branch: $branchName"
