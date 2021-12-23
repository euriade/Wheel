(function ($) {
  $.fn.fortuneWheel = function (options) {
    const settings = $.extend(
      {
        compteur: 0,
        nbTours: 3,
        parts: 6,
        symbolSegments: [360, 60, 120, 180, 240, 300],
        winValue: 180,
        wheel: $("#wheel-face"),
      },
      options
    );

    const looseDegs = [60, 120, 240, 300, 360];
    const winDeg = 180;

    const button = $("#button-spin");

    button.click(function () {
      spinTheWheel();
    });

    /* Fonction d'animation de la roue déclenchée au clic */
    function spinTheWheel() {
      // Reset l'animation
      gsap.to(settings.wheel, {
        duration: 0,
        rotation: 0,
      });

      /* Au bout de trois fois, on ne peut plus jouer */
      if (settings.compteur >= settings.nbTours) {
        $(".display-play").css("display", "flex");

        return;
      }

      settings.compteur++;

      /* Le dernier tour est forcément gagnant, on change la valeur d'actuaDeg pour qu'elle soit égale à winValue  */
      if (settings.compteur === settings.nbTours) {
        const degFinal = getDegFinal(winDeg);

        gsap.to(settings.wheel, {
          duration: 5,
          rotation: degFinal,
          ease: "ease",
        });

        handleWin(true);

        return;
      }

      const looseDeg = looseDegs[Math.floor(Math.random() * looseDegs.length)];
      const degFinal = getDegFinal(looseDeg);

      /* Définition de l'animation de la roue */
      gsap.to(settings.wheel, {
        duration: 5,
        rotation: degFinal,
        ease: "ease",
      });

      handleWin(false);

      /* Calcul de l'angle de la roue (valeur aléatoire) / permet de récupérer la valeur du ou des quarts gagnants*/
      //   let deg = Math.floor(1080 + Math.random() * 3600) / 2;
      //   deg = Math.ceil(deg / (360 / settings.parts)) * (360 / settings.parts);
      //   let actualDeg = deg % 360;
    }

    function getDegFinal(deg) {
      const randomTour = Math.floor(Math.random() * 10); // chiffre entre 0 et 9 entier.
      const randomRotation = 1080 + randomTour * 360; // Entre 3 et 12 tours.

      return randomRotation + deg;
    }

    /* Fonction de calcul de l'angle pour récupérer le segment du haut */
    function handleWin(isWin) {
      /* Tant que l'animation n'est pas finie, on ne peut pas la relancer */
      button.prop("disabled", true);

      setTimeout(function () {
        button.prop("disabled", false);

        if (!isWin) {
          $(".display-lose").css("display", "flex");

          return;
        }

        $(".display-win").css("display", "flex");
      }, 5000);
    }
  };
})(jQuery);
