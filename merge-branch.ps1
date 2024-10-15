# Verifica se o Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git não está instalado ou não está no PATH. Por favor, instale o Git." -ForegroundColor Red
    exit
}

# Verifica a branch atual
$currentBranch = git branch --show-current
Write-Host "Você está na branch: $currentBranch"

# Commita as alterações pendentes (se houver)
if ((git status --porcelain) -ne "") {
    $commitMessage = Read-Host "Há alterações pendentes. Digite a mensagem para o commit"
    git add .
    git commit -m "$commitMessage"
}

# Muda para a branch principal (main/master)
$mainBranch = "master" 
Write-Host "Mudando para a branch $mainBranch..."
git checkout $mainBranch

# Atualiza a branch principal
Write-Host "Atualizando a branch $mainBranch..."
git pull origin $mainBranch

# Faz o merge da branch anterior
Write-Host "Fazendo merge da branch $currentBranch para $mainBranch..."
git merge $currentBranch

# Verifica se o merge foi bem-sucedido
if ($LASTEXITCODE -eq 0) {
    Write-Host "Merge realizado com sucesso." -ForegroundColor Green

    # Envia as alterações para o repositório remoto
    Write-Host "Enviando para o repositório remoto..."
    git push origin $mainBranch
} else {
    Write-Host "Erro ao realizar o merge. Verifique se há conflitos." -ForegroundColor Red
}
