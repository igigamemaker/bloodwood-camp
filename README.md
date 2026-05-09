# Bloodwood Camp — aplikacja Electron

Ten projekt uruchamia grę jako aplikację desktopową, nie w przeglądarce.

## Dla graczy

Gracz nie musi instalować Node.js ani wpisywać komend. Po zbudowaniu release dostaje:

- `Bloodwood-Camp-Setup-Windows.exe` — instalator Windows,
- `Bloodwood-Camp-macOS.dmg` — instalator macOS.

Strona pobierania znajduje się w:

```txt
/downloads/index.html
```

Po włączeniu GitHub Pages możesz kierować graczy na:

```txt
https://igigamemaker.github.io/bloodwood-camp/downloads/
```

Na stronie pojawią się przyciski:

- Pobierz grę dla Windows,
- Pobierz grę dla macOS.

## Uruchomienie lokalne dla twórcy

Wymagane: Node.js LTS.

```bash
npm install
npm start
```

## Zbudowanie instalatora Windows

```bash
npm run build:win
```

Wynik pojawi się w folderze `dist/` jako `.exe`.

## Zbudowanie instalatora macOS

Najlepiej na komputerze z macOS:

```bash
npm run build:mac
```

Wynik pojawi się w folderze `dist/` jako `.dmg`.

## Automatyczne buildy na GitHubie

Dodałem workflow:

```txt
.github/workflows/build-desktop.yml
```

Po wrzuceniu projektu na GitHuba możesz wejść w zakładkę **Actions** i uruchomić **Build desktop apps**. GitHub sam zbuduje wersję Windows i macOS, a pliki pojawią się jako artifacts.

Żeby przyciski pobierania działały bezpośrednio z `/downloads/`, utwórz release z tagiem, np. `v1.0.0`. Workflow automatycznie wrzuci do release pliki `.exe` i `.dmg`.

## Ważne dla macOS

Jeśli aplikacja nie jest podpisana certyfikatem Apple, macOS może ostrzec użytkownika. Wtedy gracz może kliknąć aplikację prawym przyciskiem i wybrać **Otwórz**.
