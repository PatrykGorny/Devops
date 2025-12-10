DevOps

Git – komendy podstawowe

git init: Inicjuje nowe repozytorium Git w katalogu projektu.
git clone: Klonuje zdalne repozytorium Git na lokalny komputer. Przykład: git clone <adres_repozytorium>
git add: Dodaje zmiany plików do indeksu (staging area), przygotowując je do zatwierdzenia. Przykład: git add <nazwa_pliku> (dodaje pojedynczy plik) lub git add . (dodaje wszystkie zmienione pliki).
git commit: Zatwierdza zmiany dodane do indeksu (staging area) i tworzy nowy punkt w historii. Przykład: git commit -m "Opis zmian"
git status: Pokazuje status bieżącego repozytorium, w tym listę zmienionych plików. Przykład: git status
git log: Wyświetla historię commitów w repozytorium. Przykład: git log
git push: Wysyła zatwierdzone zmiany do zdalnego repozytorium. Przykład: git push origin <branch> (wysyła zmiany na określony branch)
git pull: Pobiera i łączy zmiany z zdalnego repozytorium do lokalnego repozytorium. Przykład: git pull origin <branch> (pobiera zmiany z określonego branch)
git branch: Wyświetla listę dostępnych branchy w repozytorium. Przykład: git branch
git checkout: Przełącza się między branchami lub przywraca pliki do wcześniejszych stanów. Przykład: git checkout <nazwa_brancha> (przełącza na inny branch)
git merge: Łączy zmiany z jednego brancha do drugiego. Przykład: git merge <nazwa_brancha> (łączy zmiany z podanego brancha do aktualnego)
git remote: Wyświetla listę zdalnych repozytoriów, które są powiązane z lokalnym repozytorium. Przykład: git remote -v
