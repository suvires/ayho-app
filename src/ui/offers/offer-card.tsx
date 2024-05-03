"use client";

import { Offer, User } from "@/lib/definitions";
import { Like } from "@/ui/components/like";
import { Dislike } from "@/ui/components/dislike";
import { Undo } from "@/ui/components/undo";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { likeOffer, dislikeOffer, undo } from "@/lib/actions";

interface OfferItemProps {
  offer: Offer;
  user: User;
}

export default function OfferCard({ offer, user }: OfferItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const DECISION_THRESHOLD = 75;

  const handleLikeOffer = async () => {
    if (!cardRef.current) return;
    cardRef.current.classList.add("swipe-right");

    const likeChoice = cardRef.current.querySelector(".choice.like");
    if (likeChoice) {
      likeChoice.classList.add("visible");
    }

    cardRef.current.addEventListener(
      "transitionend",
      async () => {
        await likeOffer(offer.id);
        cardRef!.current!.remove();
      },
      { once: true }
    ); // Usar { once: true } para que el listener se elimine automáticamente
  };

  const handleDislikeOffer = async () => {
    if (!cardRef.current) return;

    cardRef.current.classList.add("swipe-left");
    const dislikeChoice = cardRef.current.querySelector(".choice.dislike");
    if (dislikeChoice) {
      dislikeChoice.classList.add("visible");
    }
    cardRef.current.addEventListener(
      "transitionend",
      async () => {
        await dislikeOffer(offer.id);
        cardRef!.current!.remove();
      },
      { once: true }
    );
  };

  const handleUndo = async () => {
    await undo();
  };

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current as HTMLElement;
    let isAnimating = false;
    let pullDeltaX = 0;
    function startDrag(
      event: MouseEvent | TouchEvent,
      actualCard: HTMLElement
    ) {
      if (isAnimating) return;

      let startX: number;
      if (event instanceof MouseEvent) {
        startX = event.clientX;
      } else {
        startX = event.touches[0].clientX;
      }

      let dragging = false; // Nuevo estado para controlar cuándo empezar a arrastrar

      const dragThreshold = 50; // Umbral en píxeles para empezar el arrastre

      // listen the mouse and touch movements
      const moveHandler = (event: MouseEvent | TouchEvent) => {
        let currentX;
        if (event instanceof MouseEvent) {
          currentX = event.clientX;
        } else {
          currentX = event.touches[0].clientX;
        }

        const deltaX = currentX - startX;

        if (!dragging && Math.abs(deltaX) > dragThreshold) {
          dragging = true; // Comienza a arrastrar una vez que se supera el umbral
          actualCard.style.cursor = "grabbing";
        }

        if (dragging) {
          pullDeltaX = deltaX;
          const deg = pullDeltaX / 14;
          actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;

          const opacity = Math.abs(pullDeltaX) / 100;
          const isRight = pullDeltaX > 0;
          const choiceEl = isRight
            ? actualCard.querySelector(".choice.like")
            : actualCard.querySelector(".choice.dislike");
          if (choiceEl) {
            const choiceEl2 = choiceEl as HTMLElement;
            choiceEl2.style.opacity = opacity.toString();
          }
        }
      };

      const endHandler = (event: MouseEvent | TouchEvent) => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", endHandler);
        document.removeEventListener("touchmove", moveHandler);
        document.removeEventListener("touchend", endHandler);

        if (!dragging) return; // Si no se comenzó a arrastrar, no hagas nada

        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD;

        if (decisionMade) {
          const goRight = pullDeltaX >= 0;
          actualCard.classList.add(goRight ? "go-right" : "go-left");
          actualCard.addEventListener("transitionend", () => {
            actualCard.remove();
            if (goRight) {
              likeOffer(offer.id);
            } else {
              dislikeOffer(offer.id);
            }
          });
        } else {
          actualCard.classList.add("reset");
          actualCard.classList.remove("go-right", "go-left");
          actualCard.querySelectorAll(".choice").forEach((choice) => {
            if (choice instanceof HTMLElement) choice.style.opacity = "0";
          });
        }

        actualCard.addEventListener("transitionend", () => {
          actualCard.removeAttribute("style");
          actualCard.classList.remove("reset");
          pullDeltaX = 0;
          isAnimating = false;
          actualCard.style.cursor = "";
        });

        actualCard.querySelectorAll(".choice").forEach((el) => {
          const choiceEl = el as HTMLElement;
          choiceEl.style.opacity = "0";
        });
      };

      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", endHandler);
      document.addEventListener("touchmove", moveHandler, { passive: true });
      document.addEventListener("touchend", endHandler, { passive: true });
    }

    card.addEventListener("mousedown", (event) => startDrag(event, card));
    card.addEventListener("touchstart", (event) => startDrag(event, card), {
      passive: true,
    });

    return () => {
      card.removeEventListener("mousedown", (event) => startDrag(event, card));
      card.removeEventListener("touchstart", (event) => startDrag(event, card));
    };
  }, [offer.id]);

  return (
    <div className="card" data-id={offer.id} ref={cardRef}>
      <div className="choice dislike">NOPE</div>
      <div className="choice like">LIKE</div>
      <article className="offer">
        <section className="offer--company-summary">
          <figure>
            <Image
              width={offer.company.image_width}
              height={offer.company.image_height}
              alt={`Logotipo de ${offer.company.name}`}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${offer.company.image_url}`}
              priority={true}
            />
          </figure>
          <div>
            <h3>{offer.company.name}</h3>
            <a href={`#offer--company-profile-${offer.id}`}>
              Ver perfil de la empresa
            </a>
          </div>
        </section>
        <h2>{offer.title}</h2>
        <ul className="tags">
          {offer.positions.map((position) => (
            <li
              key={`tag--position-${position.id}`}
              className={position.id in user.positions ? "active" : "disabled"}
            >
              <span>{position.name}</span>
            </li>
          ))}
          <li
            className={
              offer.salary >= user.profile.salary ? "active" : "disabled"
            }
          >
            <span>{`${Number(offer.salary)
              .toLocaleString("es-ES", { useGrouping: true })
              .replace(/\./g, " ")} €`}</span>
          </li>

          {offer.schedules.map((schedule) => (
            <li
              key={`tag--place-${schedule.id}`}
              className={schedule.id in user.schedules ? "active" : "disabled"}
            >
              <span>{schedule.name}</span>
            </li>
          ))}
          {offer.attendances.map((attendance) => (
            <li
              key={`tag--place-${attendance.id}`}
              className={
                attendance.id in user.attendances ? "active" : "disabled"
              }
            >
              <span>{attendance.name}</span>
            </li>
          ))}
          {offer.places.map((place) => (
            <li
              key={`tag--place-${place.id}`}
              className={place.id in user.places ? "active" : "disabled"}
            >
              <span>{place.name}</span>
            </li>
          ))}
        </ul>
        <h4>Habilidades</h4>
        <ul className="tags">
          {offer.skills.map((skill) => (
            <li
              key={`tag--skills-${skill.id}`}
              className={skill.id in user.skills ? "active" : "disabled"}
            >
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
        <h4>Descripción</h4>
        <section
          className="offer--description"
          dangerouslySetInnerHTML={{ __html: offer.description }}
        ></section>
        <section
          className="offer--company-profile"
          id={`offer--company-profile-${offer.id}`}
        >
          <figure>
            <Image
              width={offer.company.image_width}
              height={offer.company.image_height}
              alt={`Logotipo de ${offer.company.name}`}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${offer.company.image_url}`}
              loading="lazy"
            />
          </figure>
          <h3>{offer.company.name}</h3>
          <div
            className="offer--company-description"
            dangerouslySetInnerHTML={{ __html: offer.company.description }}
          ></div>
        </section>
        <aside>
          <Undo handleUndo={handleUndo} />
          <Dislike handleDislikeOffer={handleDislikeOffer} />
          <Like handleLikeOffer={handleLikeOffer} />
        </aside>
      </article>
    </div>
  );
}
