var game = `1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bd2 O-O
5. e3 d5 6. Bd3 c5 7. Nf3 Nc6 8. dxc5 Bxc5
9. Qe2 Nb4 10. Bb1 dxc4 11. Qxc4 b6 12. Qh4 Ba6
13. Ne4 Nd3+ 14. Bxd3 Qxd3 15. Nxf6+ gxf6 16. O-O-O Ba3
17. bxa3 Rac8+ 18. Kb2 Qc2+ 19. Ka1 Bc4`

var withoutMoveNumbers = game.replace(/\d+\./g, ' ')
console.log(withoutMoveNumbers.split(/\s+/))