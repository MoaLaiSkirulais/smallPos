Set-Location C:\dev\paperSavingTool
ng build --base-href /pst/
Set-Location C:\dev\basdu-la\pst\
git pull
Get-ChildItem -Exclude .git | Remove-Item -Recurse -Force
Copy-Item C:\dev\paperSavingTool\dist\paper-saving-tool\browser\* -Destination C:\dev\basdu-la\pst\ -recurse -Force
git add . 
git commit -m "update"
git push