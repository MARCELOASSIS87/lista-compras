# Verifica se o Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git não está instalado ou não está no PATH. Por favor, instale o Git." -ForegroundColor Red
    exit
}

# Pergunta a mensagem de commit
$commitMessage = Read-Host "Digite a mensagem para o commit"

# Executa os comandos Git
git add .
git commit -m "$commitMessage"

# Verifica se o commit foi bem-sucedido
if ($LASTEXITCODE -eq 0) {
    Write-Host "Commit realizado com sucesso." -ForegroundColor Green
    git push
} else {
    Write-Host "Erro ao realizar o commit. Verifique se há alterações pendentes." -ForegroundColor Red
}
