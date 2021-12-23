class FortuneWheel {
  constructor(options) {
    this.wheel = options.wheel;
    this.zoneSize = options.zoneSize ?? 30;
    this.symbolSegments = options.symbolSegments;
    this.buttonSpin = options.buttonSpin;
    this.compteur =
      options.compteur ?? 0; /* S'incrémente à chaque tour de roue */
    this.winSymbol = options.winSymbol;
    this.displayWin = options.displayWin;
    this.displayLose = options.displayLose;
  }

  /***************/
  /* Fonctions */
  /*************/

  /* Fonction de calcul de l'angle pour récupérer le segment du haut */

  handleWin(actualDeg) {
    const winningSymbolNr = Math.floor(actualDeg / this.zoneSize);

    setTimeout(() => {
      if (this.symbolSegments[winningSymbolNr] == this.winSymbol) {
        this.displayWin.style.display = "flex";
      } else {
        this.displayLose.style.display = "flex";
      }
    }, 5000);
  }

  /* Fonction d'animation de la roue déclenchée au clic */

  spinTheWheel() {
    /* Génération de l'angle de la roue (valeur aléatoire) */
    let deg = Math.floor(1080 + Math.random() * 3600);
    let actualDeg = deg % 360;

    this.handleWin(actualDeg);

    // Reset l'animation
    let spinAnimation = gsap.to(this.wheel, {
      duration: 0,
      rotation: 0,
    });
    spinAnimation.play(0);

    /* Nombre de chances défini à 3 */
    if (this.compteur < 3) {
      /* Définition de l'animation de la roue */
      let spinAnimation = gsap.to(this.wheel, {
        duration: 5,
        rotation: deg,
        ease: "ease",
      });
      spinAnimation.play(0);
      this.compteur++;

      /* On supprimme la mention "Vous avez gagné/perdu" à chaque nouveau tour de roue"*/
      this.displayWin.style.display = "none";
      this.displayLose.style.display = "none";

      /* Tant que l'animation n'est pas finie, on ne peut pas la relancer */
      this.buttonSpin.disabled = true;

      setTimeout(() => {
        this.buttonSpin.disabled = false;
      }, 5000);
    } else {
      /* Au bout de trois fois, on ne peut plus jouer */
      alert("Vous ne pouvez plus jouer");
    }
  }
}
